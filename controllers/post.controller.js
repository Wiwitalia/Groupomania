const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { Readable } = require('stream');

// Récuperation de tous les posts
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs); // Si il n'y a pas d'erreur on affiche les posts
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });  // Affichage des post du plus récent au plus ancien
};

module.exports.createPost = async (req, res) => {
  let fileName;
  console.log(req.file);
  if (req.file !== null && req.file !== undefined ) {  // Si req.file n'est pas null et qu'il n'est pas undifined alors tu verifie
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 5000000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + ".jpg";  // On determine que fileName aura un nom unique terminant par jpg

    await pipeline(
      Readable.from(req.file.buffer),
      fs.createWriteStream(  // Creation du fichier via filesystem
        `${__dirname}/../client/public/uploads/posts/${fileName}`  // On lui passe le chemin de ou stocker les choses
      )
    );
  }

  const newPost = new postModel({  //  Nouveau post
    posterId: req.body.posterId,
    message: req.body.message,
    picture: ( req.file !== null && req.file !== undefined ) ? process.env.CLIENT_URL + "/uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.updatePost = (req, res) => {
  
  if (req.body.post.posterId !== req.body.userData._id && req.body.userData.admin === false) { // On verifie si c'est bien la personne qui a postée et si l'utilisateur est admin
    return res.status(400).send("User is not admin : " );
  }
  if (!ObjectID.isValid(req.params.id))
   return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (req.body.post.posterId !== req.body.userData._id && req.body.userData.admin === false) {
    return res.status(400).send("User is not admin : " );
  } 
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))  // On controle si l'ID est correct
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate( // Dans notre postmodel quand un post est aimé, on recupere l'id en params
      req.params.id,
      {
        $addToSet: { likers: req.body.id },   /* On prend le tableau likers et on ajoute une donnée en plus  */ 
      },
      { new: true })
      .then((data) => res.send(data))  // Si il n'y a pas d'erreur on envoie la docs
      .catch((err) => res.status(500).send({ message: err })); // Sinon mesage d'erreur

    
    } catch (err) {
        return res.status(400).send(err);
        
    }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))    // On controle si l'ID est correct
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },   /* On prend le tableau likers et on enleve une donnée en plus  */ 
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {  // On export commentPost
  if (!ObjectID.isValid(req.params.id))  // On verifie si le parametre est connus
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,  // On recupere l'id
      {
        $push: { // On push le tableau comments
          comments: {
            commenterId: req.body.commenterId,  // On recupere l'id de la personne qui a fait le commentaire
            commenterPseudo: req.body.commenterPseudo, // On recupere le pseudo de la personne qui a fait le commentaire
            text: req.body.text, // On recupere le texte de la personne qui a fait le commentaire
            timestamp: new Date().getTime(), // On recupere la date de la personne qui a fait le commentaire
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = (req, res) => {  // On export ediCommentPost
  if (!ObjectID.isValid(req.params.id))  // On verifie si le parametre est connus
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => { // On identifie l'article dans lequel on veut mettre un commentaire
      const theComment = docs.comments.find((comment) =>  // Trouve moi comment
        comment._id.equals(req.body.commentId) // comment._id doit etre egal req.body.commentId
      );

      if (!theComment) return res.status(404).send("Comment not found"); // Si on ne trouve pas le comment
      theComment.text = req.body.text;

      return docs.save((err) => { // On sauvegarde la mise a jour du post
        if (!err) return res.status(200).send(docs); // Si pas d'erreur on envoi docs
        return res.status(500).send(err); // Sinon erreur
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {  // On export deleteCommentPost
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId, // On retire le commentaire qui a l'id correspondant
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};



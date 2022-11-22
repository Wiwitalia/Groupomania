const UserModel = require("../models/user.model");
const fs = require("fs");  // Pour incrementer des elements dans des fichiers
const { promisify } = require("util"); 
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const { Readable } = require('stream');

module.exports.uploadProfil = async (req, res) => {  // On appelle la fonction uploadProfil
  console.log(req.file);
  try {
    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&  // On controle le format de l'image
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file"); // Si le format n'est pas bon: erreur

    if (req.file.size > 5000000000) throw Error("max size");  // On controle la taille de l'image
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.originalname + ".jpg";

  await pipeline(  // pipeline nous permet de creer via filesystem le fichier
    Readable.from(req.file.buffer),
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}` // On lui passe le chemin de ou stocker les choses
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId, // On passe l'userId dans le body de la requete
        { $set: { picture: "./uploads/profil/" + fileName } },  
        { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
        
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
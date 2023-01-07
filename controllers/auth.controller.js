const UserModel = require('../models/user.model'); // On appel notre userModel
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

//Creation du token
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

// Inscription
module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body  

  try {
    const user = await UserModel.create({pseudo, email, password });  // Requete pour créer un utilisateur
    res.status(201).json({ user: user._id}); // Reponse a la création de l'utilisateur
  }
  catch(err) { // Erreur
    const errors = signUpErrors(err);  // fonction signupErrors dans errors.utils
    res.status(200).send({ errors })
  }
}

// Connection
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body // On recupre le mail et le mot de passe dans le corp de la requete

  try {
    const user = await UserModel.login(email, password);  // On verifie si l'utilisateur existe dans notre bdd
    const token = createToken(user._id); // On creer un token a user
    res.cookie('jwt', token, { httpOnly: true, maxAge}); // On creer un cookie qui s'appel jwt ,avec un token qu'on a creer
    res.status(200).json({ user: user._id})  // Requete reussi
  } catch (err){
    const errors = signInErrors(err);
    res.status(401).json({ errors });
  }
}

//Deconnexion
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // Suppresion du cookie 
  res.redirect('/'); // Redirection a l'acceuil
}
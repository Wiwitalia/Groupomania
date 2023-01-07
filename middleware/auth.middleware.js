const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");


// Middleware pour verifier le token de l'utilisateur pour savoir si l'utilisateur est connecté 
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;  
  if (token) {// Si on a un cookie jwt alors on le verifie
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null; // Si jamais il y une erreur on le met sur null
        
        next();
      } else {  // Si jamais il n'y a pas d'erreur on dis que l'id que l'on a trouvé correspond a decodedtoken
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {  // Si jamais il n'y a pas de token
    res.locals.user = null;
    next();
  }
};


// Middleware pour verifier si le token correspond a quelqu'un qu'on a deja dans notre base de donnée
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) { // Si on a un cookie jwt alors on le verifie
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(401).json('no token')  // Si jamais il y a une erreur 
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
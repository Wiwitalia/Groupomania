const express = require('express');
const bodyParser = require('body-parser'); // BodyParser sert a traiter les requetes
const cookieParser = require('cookie-parser'); // Pour decoder le cookie
const userRoutes = require('./routes/user.routes');  // Chemin pour nos users
const postRoutes = require('./routes/post.routes');  // Chemin pour nos posts
require('dotenv').config({path: './config/.env'}); // Chemin pour les variables d'environement
require('./config/db'); // Chemin pour la connexion a MongoDB
const {checkUser, requireAuth} = require('./middleware/auth.middleware');  // Middleware d'autentification
const cors = require('cors');

const app = express();  // Framwork express

const corsOptions = { //  Autorisation des requetes
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions)); 

app.use(bodyParser.json());  // Capable de lire le body
app.use(bodyParser.urlencoded({extended: true}));  // Capable de lire l'url'
app.use(cookieParser());  // Capable de lire le cookie

// jwt
app.get('*', checkUser);  // Pour n'importe quelle route on declanche cette middleware pour cheker si l'utilisateur a bien le token correspond a l'id
app.get('/jwtid', requireAuth, (req, res) => {  // Quand on dira /jwtid alors on controle dans le middleware requireAuth
  res.status(200).send(res.locals.user._id) // On renvoi l'id de l'utilisateur
});

// routes
app.use('/api/user', userRoutes); // Toutes les routes qui auront un lien avec l'utilisateur
app.use('/api/post', postRoutes); // Toutes les routes qui auront un lien avec les posts

// server
app.listen(process.env.PORT, () => { // Connexion au port 5000
  console.log(`Listening on port ${process.env.PORT}`);
})
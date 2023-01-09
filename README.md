# Groupomania

Placez vous a la racine du projet et lancez votre terminal:
Tapez dans votre terminal la commande "npm install"

Configuration du backend:
Mettez vos informations de cluster dans /config/db.js
Créez le fichier .env dans /config/ avec les données suivantes
PORT=5000 votre port localhost
CLIENT_URL=http://localhost:3000 votre URL client
DB_USER_PASS= Votre identifiant et mot de passe
TOKEN_SECRET= Votre clé secrète aléatoire

Configuration du frontend:
Créez un fichier .env dans l'URL du serveur :
REACT_APP_API_URL=http://localhost:5000/ l'url de votre serveur

Pour lancer l'application:
Backend:
Placez vous dans votre dossier a la racine de votre projet et lancez le terminal
Tapez la commande "npm start"

Frontend:
Placez vous sur le dossier client et lancez votre terminal
Tapez la commande "npm start"

Votre application est prete

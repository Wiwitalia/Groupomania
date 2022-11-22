import React from "react";
import axios from "axios";
import cookie from "js-cookie";  // Biblioteque pour gerer les cookies

const Logout = () => {
  const removeCookie = (key) => { // On lui passe la clé du cookie
    if (window !== "undefined") { // Si window n'est pas undifined
      cookie.remove(key, { expires: 1 }); // 1er parametre: la clé du cookie, 2ieme parametre: expire en 1 mili seconde
    }
  };

  const logout = async () => { // On retire coté back l'info du cookie
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt")) // On enleve le cookie coté front
      .catch((err) => console.log(err)); // Sinon une erreur dans la console
    
    window.location = "/"; // Retour a l'acceuil
  };

  return ( // Au click on envoi la fonction logout
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;

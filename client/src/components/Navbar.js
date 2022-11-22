import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext); // On recupere ce qui est stocker dans le uidContext
  const userData = useSelector((state) => state.userReducer); // En disant ca notre component sait qu'il doit aller dans le userReducer

  return ( // Ligne 27 on ajoute le nom de l'utilisateur a coté de Bienvenue
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact="true" to="/">
            <div className="logo">
              <img src="./img/icons/favicon.ico" alt="icon" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact="true" to="/profil">
                <h5>Bienvenue {userData.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact="true" to="/profil">
                <img src="./img/icons/login.svg" alt="login"/>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

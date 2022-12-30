import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);  // uid aura l'id de l'utilisateur connecté

  return (
    <div className="profil-page">
      {uid ? (  // Si uid est true
        <UpdateProfil /> // On va dans updateProfil
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/reseau-sociaux.jpg" alt="Différents réseau sociaux" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;

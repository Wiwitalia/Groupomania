import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = ( props ) => { // import des props qui ont été données dans Profil.js
  const [signUpModal, setSignUpModal] = useState(props.signup); // La props de signIn
  const [signInModal, setSignInModal] = useState(props.signin); // La props de signUp

  const handleModals = (e) => {// On recupere l'evenenement qui a été clické
    if (e.target.id === "register") { // Si e.target.id est register
      setSignInModal(false); // Alors SignInModal passe a false
      setSignUpModal(true); // Alors SignUpModal passe a true
    } else if (e.target.id === "login") { // Si e.target.id est login
      setSignUpModal(false);  // Alors SignUpModal passe a false
      setSignInModal(true); // Alors SignInModal passe a true
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals} // Au click tu me lance la fonction handleModals
            id="register"
            className={signUpModal ? "active-btn" : null}  // React: Si signUpModals est sur true alors tu met la class active-btn, sinon tu ne met pas la classe
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals} // Au click tu me lance la fonction handleModals
            id="login"
            className={signInModal ? "active-btn" : null}  // React: Si signInModals est sur true alors tu met la class active-btn, sinon tu ne met pas la classe
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />} 
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;

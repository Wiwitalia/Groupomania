import React, { useState } from "react";
import axios from "axios"; // Axios permet de faire des requetes a notre api (fetch)

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Au click tu ne recharge pas la page
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({ 
      method: "post",  // On fait une methode post
      url: `${process.env.REACT_APP_API_URL}api/user/login`, // On fait appel a la route login
      withCredentials: true,
      data: {  // Et on passe cette data
        email,
        password,
      },
    })
      .then((res) => {  // Reponse de la requete
        console.log(res);
        if (res.data.errors) { // Si le back nous renvoie une erreur
          emailError.innerHTML = res.data.errors.email; // Alors tu envoie l'erreur
          passwordError.innerHTML = res.data.errors.password; // Alors tu envoie l'erreur
        } else { // Si jamais il n'y a pas de fichier d'erreur de la part de la reponse de notre back
          window.location = "/"; // Acceuil
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password" // Pour que le mot de passe n'apparaisse pas
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;

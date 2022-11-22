//Erreur d'autentification
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))  //  Si includes contient pseudo
      errors.pseudo = "Pseudo incorrect ou déjà pris";  // Alors tu renvois l'erreur
  
    if (err.message.includes("email")) errors.email = "Email incorrect";  // Alors tu renvois l'erreur
  
    if (err.message.includes("password"))  //  Si includes contient password
      errors.password = "Le mot de passe doit faire 6 caractères minimum";  // Alors tu renvois l'erreur
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))  //  Si includes contient pseudo
      errors.pseudo = "Ce pseudo est déjà pris";  // Alors tu renvois l'erreur
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))  //  Si includes contient email
      errors.email = "Cet email est déjà enregistré";   // Alors tu renvois l'erreur
  
    return errors;
  };
  

  // Erreur de connection
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) //  Si includes contient email
      errors.email = "Email inconnu";  // Alors tu renvois l'erreur
    
    if (err.message.includes('password'))   //  Si includes contient password
      errors.password = "Le mot de passe ne correspond pas"  // Alors tu renvois l'erreur
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))  //  Si includes contient invalid file
      errors.format = "Format incompatible";  // Alors tu renvois l'erreur
  
    if (err.message.includes('max size'))  //  Si includes contient max size
      errors.maxSize = "Le fichier dépasse 500ko";  // Alors tu renvois l'erreur
  
    return errors
  }
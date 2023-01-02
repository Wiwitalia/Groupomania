import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => { 
  return (dispatch) => {  // Le dispatch c'est ce qu'on va envoyer au reducer
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`) // Get pour avoir les données de l'utilisateur
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data }); // Toute la data qu'on aura recupere, on la passe au reducer
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => { // Mise a jour de la photo de profil
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data) // On envoi au back ces informations
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

// Mise a jour de la bio
export const updateBio = (userId, bio) => { // On recupere l'id de l'utilisateur et ca bio
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio }); // On prend la reponse et on fait un dispatch
      })
      .catch((err) => console.log(err));
  };
};


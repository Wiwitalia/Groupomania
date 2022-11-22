import axios from "axios";

export const GET_USERS = "GET_USERS";  // Recupere tous les utilisateurs

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data }); // Dispatch les données dans le store
      })
      .catch((err) => console.log(err));
  };
};
import {
  
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state, // Pour ne pas ecraser les données, on les recupères
        picture: action.payload, // On met a jour la photo
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload, // On met a jours les données dans la bio
      };
    
    default:
      return state;
  }
}

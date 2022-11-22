import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
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
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}

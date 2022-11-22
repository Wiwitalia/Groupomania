import {
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: // Si jamais l'action c'est get posts
      return action.payload; // Alors le store return action.paiload(le res.data)
    case LIKE_POST:
      return state.map((post) => { // Avec ce map on va identifier le post en question
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers], // On rajoute l'userID dans le tableau likers, et on met a la suite les likers deja present
          };
        }
        return post; // Si le if precedent n'est pas bon alors return ce qui a deja été traité
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),  // On retire l'id du tableau likers
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => { // On va chercher le post en question
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}

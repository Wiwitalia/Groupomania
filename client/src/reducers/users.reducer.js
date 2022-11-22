import { GET_USERS } from "../actions/users.actions";

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS: // Si on fait un get users 
      return action.payload;  // dans le payload(res.data) on le met dans le store
    default:
      return state;
  }
}

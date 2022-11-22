import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"; // Middleware qui permet de faire des requetes asyncrone avec redux
import rootReducer from "./reducers";
import { BrowserRouter } from 'react-router-dom';
import { getUsers } from "./actions/users.actions";
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./actions/post.actions";

const store = createStore(  // On crée notre store
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) 
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
  
);
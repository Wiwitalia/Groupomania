import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();


// Controle du token de l'utilisateur
  useEffect(() => {  // A chaques fois qu'on relancera useEffect, tu me lance la fonction asyncrone fetchToken
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => { // Si l'id est renvoyé
          setUid(res.data); 
        })
        .catch((err) => console.log("No token")); // Sinon no token
    };
    fetchToken();

    if (uid) dispatch(getUser(uid)); // Si jamais uid existe, on modifie les valeurs de uid
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App;
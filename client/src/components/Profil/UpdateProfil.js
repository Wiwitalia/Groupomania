import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => { // Mise a jour de la bio
    dispatch(updateBio(userData._id, bio)); // On declanche la fonction updateBio et on lui passe les parametres ( l'id de notre utilisateur et la bio)
    setUpdateForm(false); // On cache le formulaire
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && ( // Si updateForm est sur false et qu'on click dessus on le passe a true
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && ( 
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer); // Toutes nos data utilisateurs
  const userData = useSelector((state) => state.userReducer); // Toutes nos data utilisateur
  const dispatch = useDispatch();
  
  const updateItem = () => {
    console.log(post)
    if (textUpdate) { // Si jamais le post a été modifier
      dispatch(updatePost(post, textUpdate, userData )); // Alors tu me dispatch le post, la modif et les données utilisateur
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false); // Si userData n'est pas empty alors setIsLoading passe en false
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) && // Si jamais isempty de userdata au niveau 0 n'est pas vide
                usersData
                  .map((user) => { // On map toutes les données utilisateur pour trouver la photo de l'utilisateur
                    if (user._id === post.posterId) return user.picture; // Si l'userId correspond au poster.id alors tu return le chemin vers ca photo
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                {post.posterId !== userData._id && ( // Si jamais posterId n'est pas egal a userData alors tu peux afficher la suite
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message} // Au click on retrouve le message initial
                  onChange={(e) => setTextUpdate(e.target.value)} // Modification du message
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && ( // Si post.picture existe alors tu m'affiche le chemin de la photo
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && ( // Si post.picture existe alors tu m'affiche le chemin de la video
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {(userData._id === post.posterId || userData.admin === true) && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard post={post} userData={userData} />
              </div>
            )}
            <div className="card-footer">
              <LikeButton post={post} />
            </div>
            
          </div>
        </>
      )}
    </li>
  );
};

export default Card;

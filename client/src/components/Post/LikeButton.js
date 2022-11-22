import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => { // On recupere post
  const [liked, setLiked] = useState(false); // On met de base les likes sur false
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid)) // On declanche l'action
    setLiked(true); // Coeur plein
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false); // Coeur vide
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true); // Si jamais post.likers inclus le uid alors on passe setLiked sur true
    else setLiked(false);
  }, [uid, post.likers, liked]); // On relance le useEffect quand on a le uid, post.likers, liked

  return (
    <div className="like-container">
      {uid === null && ( // Si jamais l'utilisateur n'est pas connecté alors on envoi le popup
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {uid && liked === false && ( // Si l'utilisateur est connecté et que liked est sur false alors on peut liker
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && ( // Si l'utilisateur est connecté et qu'il a deja liker le post alors il peut unliker
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;

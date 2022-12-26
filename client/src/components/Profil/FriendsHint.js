import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";


const FriendsHint = () => {
  
  const [playOnce, setPlayOnce] = useState(true);

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id);
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  ;
};

export default FriendsHint;

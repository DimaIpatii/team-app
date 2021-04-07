import React, { useState, useEffect } from "react";
/* Components */
import { PrimaryButton } from "@fluentui/react";
import Post from "./Post";
import InfoMessage from "./InfoMessage";

const Popup = ({ userData, imgSrc, postsErrorMsg }) => {
  const [viewport, setViewport] = useState(window.innerWidth);
  const { user } = userData;
  const { address, company } = user;

  /* ************************************************** */
  useEffect(() => {
    const viewPort = () => {
      let time;
      return () => {
        clearTimeout(time);
        time = setTimeout(() => {
          time = null;
          setViewport(window.innerWidth);
        }, 100);
      };
    };
    const resize = viewPort();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });

  return (
    <div className="userWrapper">
      <div className="popupUser">
        <img src={imgSrc} alt="user" />
        <div className="popupUserInfo">
          <h3>
            {user.name} {user.username}
          </h3>
          <a href={`mailto:${user.email}`}>{user.email}</a>
          <PrimaryButton text="visit website" />
        </div>
      </div>
      <div className="popupUserAddress">
        <h3>Address:</h3>
        <p>
          {address.street}, {address.suite}
        </p>
        <p>
          {address.city} - {address.zipcode}
        </p>

        <h3>Phone:</h3>
        <p>{user.phone}</p>

        <h3>Company:</h3>
        <p>{company.name}</p>
        <p>{company.catchPhrase}</p>
        <p>{company.bs}</p>
      </div>
      {viewport < 400 && userData.posts.length > 0 && (
        <Post userPost={userData} viewport={viewport} />
      )}
      {viewport < 400 && postsErrorMsg.length === 0 && (
        <InfoMessage msg={postsErrorMsg} />
      )}
    </div>
  );
};

export default Popup;

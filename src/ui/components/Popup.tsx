import React, { useState, useEffect } from "react";
/* Components */
import { PrimaryButton } from "@fluentui/react";
import Post from "./Post";
import InfoMessage from "./InfoMessage";
/* Typescript */
import { IPopupComponentProps } from "../../types";

const Popup: React.FunctionComponent<IPopupComponentProps> = ({
  userData,
  imgSrc,
  postsErrorMsg,
}): JSX.Element => {
  const [viewport, setViewport] = useState(window.innerWidth);
  const { user } = userData;
  const { address, company } = user;

  /* ************************************************** */
  useEffect(() => {
    const viewPort = () => {
      let time: any;
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
          <h3>{user.name}</h3>
          <p>
            USERNAME: <span>{String(user.username)}</span>
          </p>
          <a href={`mailto:${String(user.email)}`}>{String(user.email)}</a>
          <PrimaryButton text="visit website" />
        </div>
      </div>
      <div className="popupUserAddress">
        <h3>Address:</h3>
        <p>
          {address.street}, {String(address.suite)}
        </p>
        <p>
          {String(address.city)} - {String(address.zipcode)}
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

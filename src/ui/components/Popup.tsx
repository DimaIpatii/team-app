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
        <img src={imgSrc} alt="user" className="popupUserImage" />

        <div className="popupUserInfoContainer">
          <div className="popupUserInfo">
            <h3 className="popupUserFullName">{user.name}</h3>
            <p className="popupUserName">
              username: <span>{String(user.username)}</span>
            </p>
            <a href={`mailto:${String(user.email)}`} className="popupUserEmail">
              {String(user.email)}
            </a>
          </div>
          <PrimaryButton
            href="https://www.google.com/"
            target="_blank"
            text="visit website"
            styles={{
              root: { borderRadius: "none", backgroundColor: "#006ba1" },
            }}
          />
        </div>
      </div>
      <div>
        <div className="popupUserContact">
          <h3 className="popupUserContactLabel">Address:</h3>
          <p>
            {address.street}, {String(address.suite)}
          </p>
          <p>
            {String(address.city)} - {String(address.zipcode)}
          </p>
        </div>

        <div className="popupUserContact">
          <h3 className="popupUserContactLabel">Phone:</h3>
          <p>{user.phone}</p>
        </div>

        <div className="popupUserContact">
          <h3 className="popupUserContactLabel">Company:</h3>
          <p>{company.name}</p>
          <p>{company.catchPhrase}</p>
          <p>{company.bs}</p>
        </div>
      </div>
      {viewport <= 768 && userData.posts.length > 0 && (
        <Post userPost={userData} viewport={viewport} />
      )}
      {viewport <= 768 && postsErrorMsg.length !== 0 && (
        <InfoMessage msg={postsErrorMsg} />
      )}
    </div>
  );
};

export default Popup;

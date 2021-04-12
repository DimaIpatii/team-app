/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from "react";

/* Components */
import { PrimaryButton, Image, ImageFit } from "@fluentui/react";

/* Types */
import { IUserComponentProps } from "../../types";

/* Styles  */
import { imageStyles, primaryButtonStyle } from "../../styles/fluent_ui/styles";

const User: React.FunctionComponent<IUserComponentProps> = ({
  user,
  userSrc,
  viewPort,
  getPosts,
  setShowInfo,
}) => {
  const [open, setOpen] = useState(false);
  const elRef = useRef(null);

  return (
    <div key={user.id} ref={elRef} data-userid={user.id} className={`user`}>
      <div className="userInner">
        <div className="userImageWrapper">
          <Image
            src={userSrc}
            imageFit={ImageFit.cover}
            alt="userImage"
            styles={imageStyles}
            onClick={() => setShowInfo(user.id)}
          />
        </div>
        <h2 className="userName">{user.name}</h2>
        <p className="userMail">
          <a href={`mailto:${String(user.email)}`}>{user.email}</a>
        </p>
        {viewPort > 768 && (
          <PrimaryButton
            onClick={() => {
              getPosts(user.id);
              setOpen(!open);
            }}
            styles={primaryButtonStyle()}
            text="READ POST"
          />
        )}
      </div>
    </div>
  );
};

export default User;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from "react";

/* Components */
import { PrimaryButton, Image, ImageFit } from "@fluentui/react";

/* Types */
import { IUserComponentProps } from "../../types";

const User: React.FunctionComponent<IUserComponentProps> = ({
  user,
  userSrc,
  viewPort,
  getPosts,
  setShowInfo,
}) => {
  const [open, setOpen] = useState(false);
  const elRef = useRef(null);

  const imageProps = {
    src: userSrc,
    imageFit: ImageFit.cover,
    height: "100%",
    width: "100%",
  };

  return (
    <div key={user.id} ref={elRef} data-userid={user.id} className={`user`}>
      <div className="userInner">
        <div className="userImageWrapper">
          <Image
            {...imageProps}
            height={"100%"}
            width={"100%"}
            alt="userImage"
            onClick={() => setShowInfo(user.id)}
            styles={{
              root: {
                cursor: "pointer",
              },
            }}
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
            styles={{
              root: {
                borderRadius: "none",
                backgroundColor: "#006BA1",
                width: 150,
                height: 40,
                fontSize: 18,
              },
            }}
            text="READ POST"
          />
        )}
      </div>
    </div>
  );
};

export default User;

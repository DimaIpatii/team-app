/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";

/* Components */
import { PrimaryButton } from "@fluentui/react";

const User = ({ user, userSrc, viewPort, getPosts, setShowInfo }) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={user.id} data-userid={user.id} className={`user`}>
      <img src={userSrc} alt="user" onClick={() => setShowInfo(user.id)} />
      <h2>
        {user.name} {user.username}
      </h2>
      <p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
      {viewPort > 400 && (
        <PrimaryButton
          onClick={() => {
            getPosts(user.id);
            setOpen(!open);
          }}
          text="Read Post"
        />
      )}
    </div>
  );
};

export default User;

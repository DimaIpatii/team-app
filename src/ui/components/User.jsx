import React, { useState } from "react";

/* Components */
import { PrimaryButton } from "@fluentui/react";

const User = ({ user, userSrc, getPosts }) => {
  const [open, setOpen] = useState(false);
  return (
    <div key={user.id} data-userid={user.id} className={`user`}>
      <img src={userSrc} alt="user" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <PrimaryButton
        onClick={() => {
          getPosts(user.id);
          setOpen(!open);
        }}
        text="Read Post"
      />
      <div className="info"></div>
      <div className="posts"></div>
    </div>
  );
};

export default User;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef, useEffect } from "react";

/* Components */
import {
  PrimaryButton,
  Image,
  ImageFit,
  Shimmer,
  ShimmerElementType,
} from "@fluentui/react";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageProps, setImageProps] = useState({});
  const elRef = useRef(null);

  useEffect(() => {
    setImageProps({
      src: userSrc,
      imageFit: ImageFit.cover,
      height: "100%",
      width: "100%",
    });
    setIsLoaded(true);
  }, []);

  /*  const imageProps = {
    src: userSrc,
    imageFit: ImageFit.cover,
    height: "100%",
    width: "100%",
  }; */

  return (
    <div key={user.id} ref={elRef} data-userid={user.id} className={`user`}>
      <div className="userInner">
        <div className="userImageWrapper">
          <Shimmer
            shimmerElements={[
              { type: ShimmerElementType.circle, width: 150, height: 150 },
            ]}
            height={150}
            width={150}
            isDataLoaded={isLoaded}
          >
            <Image
              {...imageProps}
              height={"100%"}
              width={"100%"}
              alt="userImage"
              onClick={() => setShowInfo(user.id)}
              styles={{
                root: {
                  animation: "none",
                  transition: "none",
                  cursor: "pointer",
                },
              }}
            />
          </Shimmer>
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
              root: { borderRadius: "none", backgroundColor: "#006BA1" },
            }}
            text="READ POST"
          />
        )}
      </div>
    </div>
  );
};

export default User;

import React, { useState, useEffect } from "react";

/* Components */
import { Spinner, SpinnerSize, IconButton } from "@fluentui/react";
import { initializeIcons } from "@uifabric/icons";
import InfoMessage from "./InfoMessage";
initializeIcons();

/* Types */
import { IPostComponentProps } from "../../types";

const Post: React.FunctionComponent<IPostComponentProps> = ({
  userPost,
  viewport,
  spinner = false,
  postsErrorMsg,
  clousePost,
}): JSX.Element => {
  const { user, posts } = userPost;
  const [hide, setHide] = useState(false);
  const [hideWrapper, setHideWrapper] = useState(false);

  useEffect(() => {
    if (!hide) return;
    setHideWrapper(true);
  }, [hide]);

  return (
    <div
      className={`postWrapper ${
        hideWrapper === true ? "postWrapperHide" : "postWrapperShow"
      }`}
    >
      {spinner && (
        <Spinner
          size={SpinnerSize.large}
          styles={{
            root: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            },
          }}
        />
      )}

      {!spinner && (
        <div className={`post ${hide === true ? "postHide" : "postShow"}`}>
          {viewport > 768 && (
            <IconButton
              iconProps={{ iconName: "ErrorBadge" }}
              title="ErrorBadge"
              onClick={() => {
                setTimeout(() => {
                  if (clousePost) {
                    clousePost();
                  }
                }, 1000);
                setHide(true);
              }}
              styles={{
                root: {
                  position: "absolute",
                  top: 25,
                  right: 25,
                  backgroundColor: "transparent",
                  zIndex: 100,
                },
                rootHovered: {
                  backgroundColor: "transparent",
                },
                icon: {
                  width: 30,
                  height: 30,
                  fontSize: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            />
          )}
          <h3 className="postAuthorName">
            {user.name} {user.username}&apos;s Posts
          </h3>
          <div className="postContent">
            {posts &&
              posts.length > 0 &&
              posts.map((post, index) => {
                const title =
                  post.title.charAt(0).toUpperCase() + post.title.slice(1);
                const paragraph =
                  post.body.charAt(0).toUpperCase() + post.body.slice(1);
                return (
                  <React.Fragment key={post.title}>
                    <h3 className="postCaption">
                      {index + 1}. {title}.
                    </h3>
                    <p className="postParagraph">{paragraph}.</p>
                  </React.Fragment>
                );
              })}
          </div>
          {postsErrorMsg && postsErrorMsg.length > 1 ? (
            <InfoMessage msg={postsErrorMsg} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Post;

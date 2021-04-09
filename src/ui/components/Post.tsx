import React from "react";

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
  return (
    <div className="postWrapper">
      <div className="post">
        {viewport > 768 && (
          <IconButton
            iconProps={{ iconName: "ErrorBadge" }}
            title="ErrorBadge"
            onClick={clousePost}
            styles={{
              root: {
                position: "absolute",
                top: 25,
                right: 25,
                backgroundColor: "transparent",
              },
              rootHovered: {
                backgroundColor: "transparent",
              },
              icon: {
                fontSize: 20,
              },
            }}
          />
        )}
        <h3 className="postAuthorName">
          {user.name} {user.username}&apos;s Posts
        </h3>

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

        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => {
            const title =
              post.title.charAt(0).toUpperCase() + post.title.slice(1);
            const paragraph =
              post.body.charAt(0).toUpperCase() + post.body.slice(1);
            return (
              <div key={post.title}>
                <h3 className="postCaption">
                  {index + 1}. {title}.
                </h3>
                <p className="postParagraph">{paragraph}.</p>
              </div>
            );
          })}
        {postsErrorMsg && postsErrorMsg.length > 1 ? (
          <InfoMessage msg={postsErrorMsg} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Post;

import React from "react";

/* Components */
import { Spinner, SpinnerSize, IconButton } from "@fluentui/react";
import { initializeIcons } from "@uifabric/icons";
import InfoMessage from "./InfoMessage";
initializeIcons();

const Post = ({
  userPost,
  viewport,
  spinner = false,
  postsErrorMsg = false,
  clousePost,
}) => {
  const { user, posts } = userPost;
  return (
    <div className="post postDescktop">
      {viewport > 400 && (
        <IconButton
          iconProps={{ iconName: "ErrorBadge" }}
          title="ErrorBadge"
          onClick={clousePost}
        />
      )}
      <h3>
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
              <h3>
                {index + 1}. {title}.
              </h3>
              <p>{paragraph}.</p>
            </div>
          );
        })}
      {postsErrorMsg && <InfoMessage msg={postsErrorMsg} />}
    </div>
  );
};

export default Post;

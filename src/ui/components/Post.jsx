import React from "react";

/* Components */
import { Spinner, SpinnerSize } from "@fluentui/react";

const Post = ({ userPost, spinner }) => {
  return (
    <div className="postDescktop">
      <h3>{userPost.userName}&apos;s Posts</h3>

      {spinner || !userPost.posts ? (
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
      ) : (
        userPost.posts &&
        userPost.posts.map((post, index) => {
          return (
            <div key={post.title}>
              <h3>
                {index + 1}. {post.title}.
              </h3>
              <p>{post.body}.</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Post;

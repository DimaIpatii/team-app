import React, { useState, useRef, useEffect } from "react";

/* Styles */
import "./App.scss";
/* Assets */
import logo from "../assets/logo.svg";
import userImage from "../assets/user.svg";

/* Components */
import { Stack, Spinner, SpinnerSize } from "@fluentui/react";
import User from "./components/User";
import Post from "./components/Post";
/* Endpoints */
import usersEndpoint from "../data/usersEndpoint";
import postsEndpoint from "../data/postsEndpoint";

/* Helpers */
import useFetch from "../helpers/useFetch";
import useFetchPosts from "../helpers/useFetchPosts";
import { getLastElId } from "../helpers/getLastElId";

function App() {
  const [users, error, spinner] = useFetch(usersEndpoint);
  const [posts, getPost, postSpinner] = useFetchPosts(postsEndpoint);
  const [userPost, setUserPost] = useState({});

  const lastUserId = useRef(null);
  const currId = useRef(null);
  const usersContainer = useRef(null);

  const getPosts = (userId) => {
    currId.current = userId;
    lastUserId.current = getLastElId(userId, usersContainer.current);

    console.log("Last ID", lastUserId.current);
    getPost(userId);

    setUserPost({
      userName: users[userId - 1].name,
    });
  };

  /* ********************************************************* */

  useEffect(() => {
    if (posts.length === 0) return;

    setUserPost({ ...userPost, posts: posts });
  }, [posts]);

  useEffect(() => {
    if (!currId.current) return;

    const fun = (fn, mls) => {
      let timer;

      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          fn(currId.current);
        }, mls);
      };
    };

    /* const handleResize = () => {
      console.log("resize");
      getPosts(currId.current);
    }; */

    const debounce = fun(getPosts, 100);

    window.addEventListener("resize", debounce);

    return () => {
      window.removeEventListener("resize", debounce);
    };
  });

  return (
    <div className="wrapper">
      <Stack
        horizontal={false}
        horizontalAlign="center"
        styles={{ root: { backgroundColor: "#006BA1" } }}
      >
        <Stack.Item>
          <img src={logo} alt="Logo" className="logo" />
        </Stack.Item>

        <Stack styles={{ root: { backgroundColor: "white", width: "100%" } }}>
          <ul>
            <li>
              <button>Teams</button>
            </li>
          </ul>
        </Stack>
      </Stack>
      <main>
        <div className="users" ref={usersContainer}>
          {users &&
            error === false &&
            spinner === false &&
            users.map((user) => {
              /* Shows User + Post */
              if (lastUserId.current === user.id) {
                return (
                  <React.Fragment key={user.id}>
                    <User
                      key={user.id}
                      user={user}
                      userSrc={userImage}
                      getPosts={getPosts}
                    />
                    <Post userPost={userPost} spinner={postSpinner} />
                  </React.Fragment>
                );
              } else {
                /* Show User */
                return (
                  <User
                    key={user.id}
                    user={user}
                    userSrc={userImage}
                    getPosts={getPosts}
                  />
                );
              }
            })}
          {spinner === true && error === false && (
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
          {error === true && <h1>Error!</h1>}
        </div>
      </main>
      <footer className="footer">
        <Stack
          horizontal={true}
          horizontalAlign="space-between"
          verticalAlign="center"
          styles={{ root: { backgroundColor: "#006BA1" } }}
        >
          <div>
            <img src={logo} alt="Logo" className="logoSmall" />
          </div>
          <p>© All rights reserved</p>
        </Stack>
      </footer>
    </div>
  );
}

export default App;

import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/* Styles */
import "./App.scss";
/* Assets */
import logo from "../assets/logo.svg";
import userImage from "../assets/user.svg";
import ClousePopup from "../assets/ClousePopup";

/* Components */
import { Stack, Spinner, SpinnerSize } from "@fluentui/react";
import User from "./components/User";
import Post from "./components/Post";
import ErrorMessage from "./components/ErrorMessage";

import Popup from "./components/Popup";
/* Endpoints */
import usersEndpoint from "../data/usersEndpoint";
import postsEndpoint from "../data/postsEndpoint";

/* Helpers */
import useFetch from "../helpers/useFetch";
import useFetchPosts from "../helpers/useFetchPosts";
import { getLastElId } from "../helpers/getLastElId";

function App() {
  const MySwal = withReactContent(Swal);
  const [users, usersErrorMsg, spinner] = useFetch(usersEndpoint);
  const [posts, fetchPost, postSpinner, postsErrorMsg] = useFetchPosts(
    postsEndpoint
  );
  const [userPost, setUserPost] = useState({});
  const [popupData, setPopupData] = useState({});
  const [viewPort, setViewPort] = useState(window.innerWidth);
  const [showInfo, setShowInfo] = useState(false);

  const lastUserId = useRef(null);
  const currId = useRef(null);
  const currIconId = useRef(null);
  const usersContainer = useRef(null);

  const getPosts = (userId) => {
    currId.current = userId;
    lastUserId.current = getLastElId(userId, usersContainer.current);

    fetchPost(userId);

    setUserPost({
      user: users[userId - 1],
    });
  };

  const clousePost = () => {
    lastUserId.current = null;
    currId.current = null;
    setUserPost({});
  };

  const showPopup = (userId) => {
    currIconId.current = userId;
    setShowInfo(true);

    fetchPost(userId);
  };

  /* ********************************************************* */

  /* Posts Handler */
  useEffect(() => {
    if (showInfo) {
      setPopupData({
        user: users[currIconId.current - 1],
        posts: posts,
      });
    }

    if (posts.length === 0) return;
    if (viewPort > 400 && !showInfo) {
      setUserPost({ user: users[currId.current - 1], posts: posts });
    }
  }, [posts]); // eslint-disable-line

  /* Resize Handler */
  useEffect(() => {
    const timeOutPost = (mls) => {
      let timer;

      if (!lastUserId.current) {
        return () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            setViewPort(window.innerWidth);
          }, mls);
        };
      } else {
        return () => {
          lastUserId.current = getLastElId(
            currId.current,
            usersContainer.current
          );
          clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            setViewPort(window.innerWidth);
          }, mls);
        };
      }
    };
    const handleOnResize = timeOutPost(100);

    window.addEventListener("resize", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
    };
  }); // eslint-disable-line

  /* Display Popup */
  useEffect(() => {
    if (showInfo === false) return;
    MySwal.fire({
      customClass: {
        popup: "popup",
        closeButton: "popupCloseBtn",
      },
      html: (
        <Popup
          userData={popupData}
          imgSrc={userImage}
          postsErrorMsg={postsErrorMsg}
        />
      ),
      showConfirmButton: false,
      showCloseButton: true,
      closeButtonHtml: <ClousePopup />,
      buttonsStyling: false,
    }).then((popup) => {
      if (popup.isDismissed) {
        setShowInfo(false);
      }
    });
  }, [popupData]); // eslint-disable-line

  //console.log(popupData, viewPort);
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
            <li>Teams</li>
          </ul>
        </Stack>
      </Stack>
      <main>
        <div className="users" ref={usersContainer}>
          {users &&
            usersErrorMsg.length === 0 &&
            spinner === false &&
            users.map((user) => {
              /* Shows User + Post */
              if (
                lastUserId.current === user.id &&
                userPost &&
                viewPort > 400
              ) {
                return (
                  <React.Fragment key={user.id}>
                    <User
                      key={user.id}
                      user={user}
                      userSrc={userImage}
                      viewPort={viewPort}
                      getPosts={getPosts}
                      setShowInfo={showPopup}
                    />
                    <Post
                      userPost={userPost}
                      viewport={viewPort}
                      spinner={postSpinner}
                      postsErrorMsg={postsErrorMsg}
                      clousePost={clousePost}
                    />
                  </React.Fragment>
                );
              } else {
                /* Show User */
                return (
                  <User
                    key={user.id}
                    user={user}
                    userSrc={userImage}
                    viewPort={viewPort}
                    getPosts={getPosts}
                    setShowInfo={showPopup}
                  />
                );
              }
            })}
          {spinner === true && usersErrorMsg.length === 0 && (
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
          {usersErrorMsg.length > 0 && <ErrorMessage msg={usersErrorMsg} />}
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

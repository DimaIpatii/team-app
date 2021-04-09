import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/* Styles */
import "../index.scss";
/* Types */
import { IUserData } from "../types";
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

function App(): JSX.Element {
  const MySwal = withReactContent(Swal);
  const [users, usersErrorMsg, spinner] = useFetch(usersEndpoint);
  const [posts, fetchPost, postSpinner, postsErrorMsg] = useFetchPosts(
    postsEndpoint
  );

  const [viewPort, setViewPort] = useState(window.innerWidth);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const lastUserId = useRef<number | null>(null);
  const currId = useRef<number | null>(null);
  const currIconId = useRef<number | null>(null);
  const usersContainer = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<IUserData>({ user: {}, posts: [] });

  const getPosts = (userId: number) => {
    currId.current = userId;

    let id;
    if (usersContainer.current)
      id = getLastElId(userId, usersContainer.current);
    if (id) lastUserId.current = id;

    fetchPost(userId).catch((err) => {
      console.error(err.message);
    });
  };

  const clousePost = () => {
    lastUserId.current = null;
    currId.current = null;
    setData({ user: {}, posts: [] });
  };

  const showPopup = (userId: number) => {
    currIconId.current = userId;
    setShowInfo(true);

    if (currId.current !== userId) {
      lastUserId.current = null;
    }
    fetchPost(userId).catch((err) => {
      console.error(err.message);
    });
  };

  const scrollToChild = () => {
    if (usersContainer.current && currId.current !== null) {
      const parrent = usersContainer.current;
      const parrentsChildren: any[] = Array.from(
        usersContainer.current.children
      );

      const children: HTMLElement = parrentsChildren[currId.current - 1];

      parrent.scrollTo({
        top: children.offsetTop - parrent.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  /* ********************************************************* */

  /* Posts Handler */
  useEffect(() => {
    if (showInfo && currIconId.current !== null) {
      setData({
        user: users[currIconId.current - 1],
        posts: posts,
      });
    }

    if (posts.length === 0) return;
    if (viewPort > 400 && !showInfo && currId.current !== null) {
      scrollToChild();
      setData({
        user: users[currId.current - 1],
        posts: posts,
      });
    }
  }, [posts]); // eslint-disable-line

  /* Resize Handler */
  useEffect(() => {
    const timeOutPost = (mls: number) => {
      let timer: any;

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
          if (currId.current && usersContainer.current) {
            lastUserId.current = getLastElId(
              currId.current,
              usersContainer.current
            );

            clearTimeout(timer);
            timer = setTimeout(() => {
              timer = null;
              setViewPort(window.innerWidth);
            }, mls);
          }
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
        content: "popupContent",
        closeButton: "popupCloseBtn",
      },
      html: (
        <Popup
          userData={data}
          imgSrc={userImage}
          postsErrorMsg={postsErrorMsg}
        />
      ),
      showConfirmButton: false,
      showCloseButton: true,
      closeButtonHtml: <ClousePopup />,
      buttonsStyling: false,
    })
      .then((popup) => {
        if (popup.isDismissed) {
          setShowInfo(false);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [data]); // eslint-disable-line

  console.log(data);
  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>

      <main className="main">
        <div>
          <h1 className="mainCaption">Team</h1>
        </div>

        <div className="usersWrapper" ref={usersContainer}>
          {users &&
            usersErrorMsg.length === 0 &&
            spinner === false &&
            users.map((user) => {
              /* Shows User + Post */
              if (
                lastUserId.current === user.id &&
                data.user &&
                viewPort > 768
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
                      userPost={data}
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
          styles={{
            root: {
              maxWidth: 1600,
              margin: "0 auto",
            },
          }}
          tokens={{ padding: "30px 0" }}
          className="footerContentWrapper"
        >
          <img src={logo} alt="Logo" className="logo logoSmall" />
          <p className="footerCoopyright">© All rights reserved</p>
        </Stack>
      </footer>
    </>
  );
}

export default App;

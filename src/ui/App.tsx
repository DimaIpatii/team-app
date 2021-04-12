import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/* Styles */
import "../index.scss";
import { spinnerStyles } from "../styles/fluent_ui/styles";
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
import { scrollToChild } from "../helpers/scrollToChild";

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

  /* ******************************************************************* */

  const getPosts = (userId: number) => {
    currId.current = userId;

    let id;
    if (usersContainer.current)
      id = getLastElId(userId, usersContainer.current);
    if (id) lastUserId.current = id;

    fetchPost(userId).catch((err) => {
      console.error(err.message);
    });

    setData({
      user: users[userId - 1],
      posts: [],
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
    if (
      viewPort > 400 &&
      !showInfo &&
      currId.current !== null &&
      usersContainer.current !== null
    ) {
      scrollToChild(usersContainer.current, currId.current);
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

  //console.log(data);
  return (
    <>
      <header className="header">
        <a href="https://aalto.it/" target="_blanc">
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </header>

      <main className="main">
        <div className="mainGridWrapper">
          <div>
            <h1 className="mainCaption">Team</h1>
          </div>

          <div className="usersWrapper" ref={usersContainer}>
            {users &&
              usersErrorMsg.length === 0 &&
              spinner === false &&
              users.map((user) => {
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
                    {/* Show Post */}
                    {lastUserId.current === user.id &&
                      data.user &&
                      viewPort > 768 && (
                        <Post
                          userPost={data}
                          viewport={viewPort}
                          spinner={postSpinner}
                          postsErrorMsg={postsErrorMsg}
                          clousePost={clousePost}
                        />
                      )}
                  </React.Fragment>
                );
              })}
            {spinner === true && usersErrorMsg.length === 0 && (
              <Spinner size={SpinnerSize.large} styles={spinnerStyles} />
            )}
            {usersErrorMsg.length > 0 && <ErrorMessage msg={usersErrorMsg} />}
          </div>
        </div>
      </main>
      <footer className="footer">
        <Stack
          horizontal={true}
          horizontalAlign="space-between"
          verticalAlign="center"
          styles={{
            root: {},
          }}
          tokens={{ padding: "30px 0" }}
          className="footerContentWrapper"
        >
          <a href="https://aalto.it/" target="_blanc">
            <img src={logo} alt="Logo" className="logo logoSmall" />
          </a>
          <p className="footerCoopyright">© All rights reserved</p>
        </Stack>
      </footer>
    </>
  );
}

export default App;

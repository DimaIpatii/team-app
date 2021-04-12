import * as React from "react";
import * as ReactDOM from "react-dom";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require("autoprefixer");
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
autoprefixer();

/* Components */
import App from "./ui/App";
import reportWebVitals from "./reportWebVitals";

const render = () => {
  const html = document.getElementById("root");
  if (!html) throw new Error("No such root element found!");
  if (html) {
    ReactDOM.render(React.createElement(App), html);
  }
};
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./index.scss";

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("New content has been added, please update");
  },
  onOfflineReady() {
    console.log("App is ready for offline");
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App updateSW={updateSW} />
  </React.StrictMode>,
  document.getElementById("root")
);

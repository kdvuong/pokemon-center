import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./icons.css";
import App from "./App";
import { Config, register } from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

const createUpdatePrompt = (onAccept: () => void) => {
  console.log("rendering update prompt");
  const container = document.createElement("div");
  const acceptButton = document.createElement("button");
  const dismissButton = document.createElement("button");
  const text = document.createElement("span");
  acceptButton.addEventListener("click", onAccept);
  acceptButton.textContent = "Update";
  dismissButton.addEventListener("click", () => document.body.removeChild(container));
  dismissButton.textContent = "Dismiss";
  text.textContent = "New version available";
  container.id = "update-prompt";

  container.appendChild(text);
  container.appendChild(acceptButton);
  container.appendChild(dismissButton);
  document.body.appendChild(container);
};

const config: Config = {
  onUpdate: (registration) => {
    console.log("updating service worker");
    createUpdatePrompt(() => {
      registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    });
  },
};

register(config);

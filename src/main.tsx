import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";

import "@fontsource-variable/inter";

import "./index.css";

interface Props {
  botId: string;
  rootSelector: string;
}

// Turn to class in order to support other functionalities
export default function initChatbot({ rootSelector, botId }: Props) {
  const root = ReactDOM.createRoot(document.querySelector(rootSelector)!);

  root.render(
    <React.StrictMode>
      <App botId={botId} />
    </React.StrictMode>
  );
}

declare global {
  interface Window {
    Chatbot: any;
  }
}

window.Chatbot = initChatbot;

initChatbot({
  rootSelector: "body",
  botId: "9db57911-7301-4997-910f-640700858956",
});

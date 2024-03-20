import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import type { AppProps } from "./interfaces";

import "./index.css";

const root = ReactDOM.createRoot(document.body);

export default function initChatbot({ botId }: AppProps) {
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

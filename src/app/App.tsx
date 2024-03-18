import { ChatBubble } from "./components";
import { usePrepareHook } from "./helpers";

import type { AppProps } from "../interfaces";

function App({ botId }: AppProps) {
  const { clientId, messages, onInput, onKeydown, sendMessage } =
    usePrepareHook(botId);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <i className="fa-solid fa-ellipsis-vertical more-icon"></i>
          <i className="fa-solid fa-angle-down angle-down-icon"></i>
        </div>
      </div>
      <div className="chatbot-body">
        <div className="chatbot-content">
          {messages.map(({ id, sender, value }) => (
            <ChatBubble
              key={id}
              className="bubble"
              $perspective={sender === clientId ? "user" : "bot"}
            >
              {value}
            </ChatBubble>
          ))}
        </div>
        <div className="chatbot-field">
          <input
            className="input"
            onChange={onInput}
            onKeyDown={onKeydown}
            placeholder="Enter your message"
          />
          <i
            onClick={sendMessage}
            className="fa-solid fa-paper-plane send-icon"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default App;

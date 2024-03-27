import { MessageCircle, SendHorizontal, SquareMinus } from "lucide-react";

import {
  Input,
  ChatBody,
  ChatField,
  ChatBubble,
  ChatHeader,
  ChatContent,
  ChatbotName,
  ChatContainer,
  ChatbotAvatar,
  HeaderContent,
  ExpandChatButton,
  ChatBubbleWrapper,
  MinimizeChatButton,
} from "./components";
import { usePrepareHook } from "./helpers";

import { robotSrc } from "../assets";
import type { AppProps } from "../interfaces";

function App({ botId }: AppProps) {
  const {
    input,
    expand,
    clientId,
    messages,
    lastMessageRef,
    chatContentRef,
    onInput,
    onKeydown,
    sendMessage,
    toggleExpand,
  } = usePrepareHook(botId);

  return expand ? (
    <ChatContainer>
      <ChatHeader>
        <HeaderContent>
          <ChatbotAvatar>
            <img className="chatbot-avatar-img" src={robotSrc} alt="Chatbot" />
          </ChatbotAvatar>
          <ChatbotName>
            <span className="chat-with">Chat with</span>
            <span className="chatbot-name">GO Chatbot</span>
          </ChatbotName>
          <MinimizeChatButton onClick={toggleExpand}>
            <SquareMinus className="angle-down-icon" />
          </MinimizeChatButton>
        </HeaderContent>
      </ChatHeader>
      <ChatBody>
        <ChatContent ref={chatContentRef}>
          {messages.map(({ id, sender, value }, index) => {
            const perspective = sender === clientId ? "user" : "bot";

            return (
              <ChatBubbleWrapper
                ref={(ref) => {
                  if (index === messages.length - 1) {
                    lastMessageRef.current = ref;
                  }
                }}
              >
                <ChatbotAvatar $bubble $perspective={perspective}>
                  <img
                    alt="Chatbot"
                    src={robotSrc}
                    className="chatbot-avatar-img bubble-bot-avatar"
                  />
                </ChatbotAvatar>
                <ChatBubble key={id} $perspective={perspective}>
                  {value}
                </ChatBubble>
              </ChatBubbleWrapper>
            );
          })}
        </ChatContent>
        <ChatField>
          <Input
            value={input}
            onChange={onInput}
            onKeyDown={onKeydown}
            placeholder="Write your message..."
          />
          <SendHorizontal onClick={sendMessage} className="send-icon" />
        </ChatField>
      </ChatBody>
    </ChatContainer>
  ) : (
    <ExpandChatButton onClick={toggleExpand}>
      <MessageCircle className="chat-icon" fill="white" />
    </ExpandChatButton>
  );
}

export default App;

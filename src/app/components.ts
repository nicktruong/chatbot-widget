import styled, { css } from "styled-components";

export const ChatContainer = styled.div`
  right: 1rem;
  width: 400px;
  bottom: 1rem;
  height: 600px;
  display: flex;
  position: fixed;
  overflow: hidden;
  border-radius: 1rem;
  flex-direction: column;
  max-width: calc(100% - 2rem);
  max-height: calc(100% - 2rem);
  font-family: "Inter", sans-serif;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const ChatHeader = styled.div`
  padding: 1rem;
  position: relative;
  border-radius: 1rem 1rem 0 0;
  background: linear-gradient(to right, #2b9ddb, #20cab9);
`;

export const HeaderContent = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
`;

export const ChatbotAvatar = styled.div<{
  $bubble?: boolean;
  $perspective?: "user" | "bot";
}>`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  display: ${(props) => (props.$perspective === "bot" ? "block" : "none")};

  ${(props) =>
    props.$bubble
      ? css`
          padding: 0.25rem;
          background: #b4d2e4;
        `
      : css`
          padding: 0.5rem;
          background: #1675e6;
        `};
`;

export const ChatbotName = styled.div`
  color: white;
  margin-left: 0.25rem;
`;

export const MinimizeChatButton = styled.div`
  top: 4px;
  right: 4px;
  display: flex;
  cursor: pointer;
  padding: 0.5rem;
  aspect-ratio: 1/1;
  margin-left: auto;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  transition: all 0.2s;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ChatBody = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  padding: 0 1rem 4.2rem;
  flex-direction: column;
`;

export const ChatContent = styled.div`
  display: flex;
  overflow: auto;
  padding-bottom: 1rem;
  flex-direction: column;
`;

export const ChatField = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: white;
  border-top: 1px solid #f3f4f6;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const Input = styled.input`
  border: none;
  flex-grow: 1;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;

  &::placeholder {
    color: #a9adb4;
  }
`;

export const ChatBubbleWrapper = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
`;

export const ChatBubble = styled.div<{ $perspective: "user" | "bot" }>`
  --radius: 2rem;
  padding: 1rem;
  max-width: 280px;
  margin-top: 1rem;
  display: inline-block;

  ${(props) =>
    props.$perspective === "user"
      ? css`
          color: white;
          margin-left: auto;
          background-color: #1675e6;
          border-radius: var(--radius);
          border-bottom-right-radius: 0;
        `
      : css`
          background: #dbdcde;
          border-radius: var(--radius);
          border-top-left-radius: 0;
        `}
`;

export const ExpandChatButton = styled.div`
  right: 1rem;
  bottom: 1rem;
  display: flex;
  padding: 0.5rem;
  position: fixed;
  cursor: pointer;
  aspect-ratio: 1/1;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: #0070f0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

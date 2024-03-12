import styled, { css } from "styled-components";

const Bubble = styled.div<{ perspective: "user" | "bot" }>`
  ${(props) =>
    props.perspective === "user"
      ? css`
          margin-left: auto;
          color: white;
          background: radial-gradient(
            circle at 10% 20%,
            rgb(7, 121, 222) 0%,
            rgb(20, 72, 140) 90%
          );
        `
      : css`
          background: #f0f2f8;
        `}
`;

function App() {
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
          <Bubble perspective="user" className="bubble">
            Example chat message. Example chat message. Example chat message.
            Example chat message.
          </Bubble>
          <Bubble perspective="bot" className="bubble">
            Example chat message. Example chat message. Example chat message.
            Example chat message.
          </Bubble>
        </div>
      </div>
    </div>
  );
}

export default App;

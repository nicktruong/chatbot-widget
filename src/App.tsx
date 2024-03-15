import {
  useState,
  useEffect,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { socket } from "./socket";
import { Bubble } from "./components";
import { Message } from "./interfaces";

const ID = "ID";

function App() {
  const [input, setInput] = useState("");
  const [clientId, setClientId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [step, setStep] = useState("0-0");

  useEffect(() => {
    const id = localStorage.getItem(ID) ?? "";
    if (id) {
      setClientId(id);
      return;
    }

    setClientId(ID);
    localStorage.setItem(ID, uuidv4());
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value: string) {
      console.log("onMessageEvent", { value });
      setMessages((msgs) => [
        ...msgs,
        {
          createdAt: "",
          id: "",
          receiver: "",
          sender: "",
          updatedAt: "",
          value,
        },
      ]);
    }

    function onStepEvent(step: string) {
      setStep(step);
    }

    socket.on("step", onStepEvent);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessageEvent);

    return () => {
      socket.off("step", onStepEvent);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessageEvent);
    };
  }, [clientId]);

  const sendMessage = (currentStep = "0-0") => {
    socket.emit(
      "message",
      {
        value: input,
        sender: clientId,
        receiver: "Mr bot",
        currentStep,
        answer: false,
        clientId,
        botId: "86df0c2e-85fd-4731-b7e3-44e645a9ecf2",
      },
      (value: unknown) => {
        console.log(value);
      }
    );
  };

  const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const onKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      sendMessage(step);
    }
  };

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
            <Bubble
              key={id}
              className="bubble"
              $perspective={sender === clientId ? "user" : "bot"}
            >
              {value}
            </Bubble>
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
            className="fa-solid fa-paper-plane send-icon"
            onClick={() => sendMessage(step)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default App;

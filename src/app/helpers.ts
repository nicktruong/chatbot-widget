import {
  useState,
  useEffect,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";

import { socket } from "./socket";
import { useClientId } from "./hooks";
import type { Message, Step } from "./interfaces";

export const usePrepareHook = (botId: string) => {
  const clientId = useClientId();
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(false);
  const [step, setStep] = useState<Step>("0-0");
  const [messages, setMessages] = useState<Message[]>([]);

  function addMessage(message: Message) {
    setMessages((msgs) => [...msgs, message]);
  }

  useEffect(() => {
    // Server will set step
    function onStepEvent(step: Step) {
      setStep(step);
    }

    function onErrorEvent(error: any) {
      console.error(error);
    }

    function onRequireAnswerEvent(require: boolean) {
      setAnswer(require);
    }

    socket.on("step", onStepEvent);
    socket.on("error", onErrorEvent);
    socket.on("message", addMessage);
    socket.on("requireAnswer", onRequireAnswerEvent);

    return () => {
      socket.off("step", onStepEvent);
      socket.off("error", onStepEvent);
      socket.off("message", addMessage);
      socket.off("requireAnswer", onRequireAnswerEvent);
    };
  }, [clientId]);

  // TODO: 1. Change answer prop based on step
  const sendMessage = () => {
    const message = {
      botId,
      answer,
      clientId,
      value: input,
      receiver: botId,
      sender: clientId,
      currentStep: step,
    };

    setInput("");

    addMessage(message);

    socket.emit("message", message);
  };

  const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const onKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return {
    input,
    clientId,
    messages,
    onInput,
    onKeydown,
    sendMessage,
  };
};

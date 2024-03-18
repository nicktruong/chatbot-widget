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

  useEffect(() => {
    function onMessageEvent(message: Message) {
      setMessages((msgs) => [...msgs, message]);
    }

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
    socket.on("message", onMessageEvent);
    socket.on("requireAnswer", onRequireAnswerEvent);

    return () => {
      socket.off("step", onStepEvent);
      socket.off("error", onStepEvent);
      socket.off("message", onMessageEvent);
      socket.off("requireAnswer", onRequireAnswerEvent);
    };
  }, [clientId]);

  // TODO: 1. Change answer prop based on step
  const sendMessage = () => {
    socket.emit("message", {
      botId,
      answer,
      clientId,
      value: input,
      receiver: botId,
      sender: clientId,
      currentStep: step,
    });
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
    clientId,
    messages,
    onInput,
    onKeydown,
    sendMessage,
  };
};

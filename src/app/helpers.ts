import {
  useRef,
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
  const atBottomRef = useRef<boolean>(true);
  const chatContentRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const scrollFnc = useRef<null | (() => void)>(null);

  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(false);
  const [step, setStep] = useState<Step>("0-0");
  const [expand, setExpand] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [firstVisit, setFirstVisit] = useState<boolean>(false);

  function scrollToBottomMessages() {
    const top = lastMessageRef.current?.offsetTop ?? 0;

    chatContentRef.current?.scrollTo({ top });
  }

  function attachChatContentRef(element: HTMLDivElement | null) {
    if (!element) return;
    chatContentRef.current = element;
    scrollFnc.current = () => {
      const scrollableHeight = element.scrollHeight - element.clientHeight;
      if (Math.abs(element.scrollTop - scrollableHeight) <= 1)
        atBottomRef.current = true;
      else atBottomRef.current = false;
    };
    element.addEventListener("scroll", scrollFnc.current);
  }

  useEffect(() => {
    chatContentRef.current?.removeEventListener("scroll", scrollFnc.current!);
  }, []);

  useEffect(() => {
    if (atBottomRef.current) scrollToBottomMessages();
  }, [messages]);

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
  }, []);

  useEffect(() => {
    if (!firstVisit || !botId || !clientId) return;

    const message = {
      botId,
      clientId,
      value: "",
      answer: false,
      receiver: botId,
      sender: clientId,
      currentStep: "0-0" as `${number}-${number}`,
    };

    socket.emit("start-message", message);
  }, [firstVisit, botId, clientId]);

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

  const toggleExpand = () => {
    setFirstVisit(true);
    setExpand((prevExpand) => !prevExpand);
  };

  return {
    input,
    expand,
    clientId,
    messages,
    lastMessageRef,
    chatContentRef: attachChatContentRef,
    onInput,
    onKeydown,
    sendMessage,
    toggleExpand,
  };
};

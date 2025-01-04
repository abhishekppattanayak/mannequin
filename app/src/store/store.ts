import { createStore } from "solid-js/store";

interface ChatInterface {
  chatId: string;
}

const [chatStore, setChatStore] = createStore<ChatInterface[]>([]);

export { chatStore, setChatStore };
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message { id: string; text: string; sender: 'user' | 'bot'; time: string; }

interface ChatbotState { isOpen: boolean; messages: Message[]; }

const initialState: ChatbotState = {
  isOpen: false,
  messages: [
    { id: '1', text: "Hi! I'm your AI assistant. How can I help you today?", sender: 'bot', time: 'Now' },
  ],
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    toggleChatbot(state) { state.isOpen = !state.isOpen; },
    closeChatbot(state) { state.isOpen = false; },
    addMessage(state, action: PayloadAction<{ text: string; sender: 'user' | 'bot' }>) {
      state.messages.push({ id: Date.now().toString(), ...action.payload, time: 'Now' });
    },
  },
});

export const { toggleChatbot, closeChatbot, addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../services/chat";

const initialState = {
  messages: [],
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(chatApi.endpoints.chat.matchPending, (state, action: any) => {
        state.loading = true;
      })
      .addMatcher(
        chatApi.endpoints.chat.matchFulfilled,
        (state, action: any) => {
          console.log({ action });

          const message = {
            content: action.payload.data,
            sender: "assistant",
            time: new Date().toLocaleTimeString(),
          };
          console.log({ message });

          state.messages = [...state.messages, message];
        }
      )
      .addMatcher(
        chatApi.endpoints.chat.matchRejected,
        (state, action: any) => {
          state.loading = false;
        }
      );
  },
});

export const { setMessages, addMessage } = chatSlice.actions;

export default chatSlice.reducer;

export const selectMessages = (state: any) => state.chat.messages;

import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/store/services/api";

import chatReducer from "@/store/slices/chatSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

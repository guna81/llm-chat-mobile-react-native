import { api } from "./api";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    chat: builder.mutation({
      query: (body) => ({
        url: "/chat",
        method: "POST",
        body: body,
      }),
    }),
    uploadFile: builder.mutation({
      query: (body) => ({
        url: "/file-upload",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useChatMutation, useUploadFileMutation } = chatApi;

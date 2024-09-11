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

// chat streaming

export const chatStreamingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    chatStreaming: builder.query({
      query: (body) => ({
        url: "/chat-streaming",
        method: "GET",
        body: body,
        responseHandler: (res: any) => {
          return res.body;
        },
      }),
    }),
  }),
});

export const { useChatStreamingQuery } = chatStreamingApi;

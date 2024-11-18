import React from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getNoteData: builder.query({
      query: ({ accessToken }) => ({
        url: 'note/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getNoteSharedByMeData: builder.query({
      query: ({ accessToken }) => ({
        url: 'get-share-note/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    createNote: builder.mutation({
      query: ({accessToken, data}) => ({
        url: 'note/',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    getSharedNoteData: builder.query({
      query: ({ accessToken }) => ({
        url: 'get-shared-note/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    manageShare: builder.query({
      query: ({ accessToken, id }) => ({
        url: `manage-share/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateNote: builder.mutation({
      query: ({ accessToken, data, noteId }) => ({
        url: `update-note/${noteId}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    deleteNote: builder.mutation({
      query: ({ accessToken, id }) => ({
        url: `delete-note/${id}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    shareNote: builder.mutation({
      query: ({accessToken, data, noteId}) => ({
        url: `share-note/${noteId}/`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetNoteDataQuery,
  useGetSharedNoteDataQuery,
  useUpdateNoteMutation,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useShareNoteMutation,
  useGetNoteSharedByMeDataQuery,
  useManageShareQuery
} = noteApi;

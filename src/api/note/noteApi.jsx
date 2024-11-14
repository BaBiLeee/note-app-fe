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
    updateNote: builder.mutation({
      query: ({ accessToken, userData }) => ({
        url: 'note/',
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetNoteDataQuery,
  useUpdateNoteMutation,
} = noteApi;

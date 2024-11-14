import React from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT, 
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'register/',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'login/',
        method: 'POST',
        body: data,
      }),
    }),
    getAuthData: builder.query({
      query: ({ accessToken }) => ({
        url: '/users/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the accessToken is being passed correctly
        },
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ accessToken, userData }) => ({
        url: '/users/profile',
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the accessToken is being passed correctly
        },
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAuthDataQuery,
  useUpdateUserProfileMutation,
} = authApi;

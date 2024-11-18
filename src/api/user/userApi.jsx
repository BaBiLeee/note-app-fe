import React from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
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
        url: 'user/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the accessToken is being passed correctly
        },
      }),
    }),
    updateUserProfile: builder.mutation({
      query: ({ accessToken, data, id }) => ({
        url: `update-user/${id}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the accessToken is being passed correctly
        },
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ accessToken, id }) => ({
        url: `/delete-user/${id}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the accessToken is being passed correctly
        },
      }),
    }),
    getUserList: builder.query({
      query: () => ({
        url: 'userList/',
        method: 'GET',
      }),
    }),
    updateStatus: builder.mutation({
      query:({ accessToken, id}) => ({
        url: `/user-status/${id}/`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the accessToken is being passed correctly
        },
      })
    })
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAuthDataQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useGetUserListQuery,
  useUpdateStatusMutation
} = userApi;

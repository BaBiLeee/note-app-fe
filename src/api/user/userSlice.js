import { createSlice } from '@reduxjs/toolkit';

import { userApi } from './userApi';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.access;
        state.loading = false;
      })
      .addMatcher(userApi.endpoints.login.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(userApi.endpoints.login.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { user } = userSlice.actions;
export default userSlice.reducer;

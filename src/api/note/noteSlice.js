import { createSlice } from '@reduxjs/toolkit';
import { getToken, setToken } from '../feature/token';
import { noteApi } from './noteApi';

const initialState = {
  general: null,
  lessons: [],
  exercises: [],
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.user = null;
      state.accessToken = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        noteApi.endpoints.getNoteData.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.data.accessToken);

          state.user = payload.data.user;
          state.accessToken = payload.data.accessToken;
        },
      )
      .addMatcher(
        noteApi.endpoints.getNoteData.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data;
          state.accessToken = getToken();
        },
      );
  },
});

export const { logout } = noteSlice.actions;
export default noteSlice.reducer;

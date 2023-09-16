import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  post: {},
};

const postSlice = createSlice({
  name: 'postSingle',
  initialState,
  reducers: {
    getByPost: (state) => {
      state.loading = true;
    },
    getByPostSuccess: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getByPostFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});
export const { getByPost, getByPostSuccess, getByPostFailure } = postSlice.actions;

export default postSlice.reducer;

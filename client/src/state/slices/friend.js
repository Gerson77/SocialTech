import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  friends: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    getFriends: (state) => {
      state.loading = true;
    },
    getFriendsSuccess: (state, { payload }) => {
      state.friends = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getFriendsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});
export const { getFriends, getFriendsSuccess, getFriendsFailure } = friendsSlice.actions;

export default friendsSlice.reducer;

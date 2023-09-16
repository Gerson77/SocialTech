import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  notification: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification: (state) => {
      state.loading = true;
    },
    getNotificationSuccess: (state, { payload }) => {
      state.notification = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getNotificationFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});
export const {
  getNotification,
  getNotificationSuccess,
  getNotificationFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;

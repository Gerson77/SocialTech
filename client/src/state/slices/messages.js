import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  messagesChatCurrent: [],
  messages: [],
};

const messagesChatCurrentSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state) => {
      state.loading = true;
    },
    getMessagesSuccess: (state, { payload }) => {
      state.messagesChatCurrent = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getMessagesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    getAllMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
});
export const {
  getMessages,
  getMessagesSuccess,
  getMessagesFailure,
  getAllMessages,
} = messagesChatCurrentSlice.actions;

export default messagesChatCurrentSlice.reducer;

import { combineReducers } from '@reduxjs/toolkit';

import postReducer from './slices/posts';
import postSingleReducer from './slices/postSingle';
import authReducer from './slices/auth';
import friendReducer from './slices/friend';
import notificationReducer from './slices/notification';
import messagesChatCurrentSlice from './slices/messages';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  postSingle: postSingleReducer,
  friends: friendReducer,
  notification: notificationReducer,
  messages: messagesChatCurrentSlice,
});

export default rootReducer;

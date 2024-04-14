
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersReducer';
import itemsReducer from './itemsReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});

import {configureStore} from '@reduxjs/toolkit';
import users from '../features/users/usersSlice';
const store = configureStore({
  reducer: {
    users
  },
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/utils/store/login-reducer';

export const reduxStore = configureStore({
  reducer: {
    login: loginReducer
  }
})

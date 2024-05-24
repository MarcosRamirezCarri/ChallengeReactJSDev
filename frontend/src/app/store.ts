import { configureStore } from '@reduxjs/toolkit';
import botSlice from '../features/botSlice';
import autchSlice from '../features/autchSlice';
import casesSlice from '../features/casesSlice';

const store = configureStore({
  reducer: {
    bots: botSlice,
    auth: autchSlice,
    cases: casesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
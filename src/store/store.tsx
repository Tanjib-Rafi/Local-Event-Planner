import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventSearchSlice';
import eventAddReducer from './eventAddSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    eventAdd: eventAddReducer,
    auth: authReducer,
  },
});

export default store;

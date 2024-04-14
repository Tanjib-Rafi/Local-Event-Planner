import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormValues {
  title: string;
  date: Date;
  time: [moment.Moment, moment.Moment];
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
}

interface EventsState {
  events: FormValues[];
}

const initialState: EventsState = {
  events: [],
};

const eventCreateSlice = createSlice({
  name: 'eventCreate',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<FormValues>) => {
      state.events.push(action.payload);
    },
  },
});

export const { addEvent } = eventCreateSlice.actions;

export default eventCreateSlice.reducer;

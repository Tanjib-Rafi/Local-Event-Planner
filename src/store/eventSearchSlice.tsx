import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export interface EventsState {
  events: any[];
  filteredEvents?: any[] | null;
  displayCount: number;
  isLoading: boolean;
  error: Error | null;
  searchQuery?: string;
  locationQuery?: string;
  startDate?: moment.Moment | undefined;
  endDate?: moment.Moment | undefined;
}

const initialState: EventsState = {
  events: [],
  filteredEvents: null,
  displayCount: 8,
  isLoading: true,
  error: null,
  searchQuery: '',
  locationQuery: '',
  startDate: undefined,
  endDate: undefined,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    updateSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredEvents = applyFilters(state.events, state);
    },
    updateLocationQuery(state, action: PayloadAction<string>) {
      state.locationQuery = action.payload;
      state.filteredEvents = applyFilters(state.events, state);
    },
    updateDateRange(state, action: PayloadAction<[moment.Moment | undefined, moment.Moment | undefined]>) {
      state.startDate = action.payload[0];
      state.endDate = action.payload[1];
      state.filteredEvents = applyFilters(state.events, state);
    },
    updateEvents(state, action: PayloadAction<any[]>) {
      state.events = action.payload;
      state.filteredEvents = applyFilters(action.payload, state);
    },
    updateFilteredEvents(state, action: PayloadAction<{
      searchQuery: string;
      locationQuery: string;
      startDate: moment.Moment | undefined;
      endDate: moment.Moment | undefined;
      events: any[];
    }>) {
      const { searchQuery, locationQuery, startDate, endDate, events } = action.payload;
      state.filteredEvents = applyFilters(events, { ...state, searchQuery, locationQuery, startDate, endDate });
    },
    updateDisplayCount(state, action: PayloadAction<number>) {
      state.displayCount += action.payload;
    },
  },
});

const applyFilters = (filteredEvents: any[] | null | undefined, state: EventsState) => {
  if (filteredEvents === undefined || filteredEvents === null) {
    return null;
  }

  return filteredEvents.filter(event => {
    const titleMatch = !state.searchQuery || event.title.toLowerCase().includes(state.searchQuery!.toLowerCase());
    const locationMatch = !state.locationQuery || event.location.toLowerCase().includes(state.locationQuery!.toLowerCase());
    const startDateMatch = !state.startDate || !state.endDate || (new Date(event.date) >= state.startDate!.toDate() && new Date(event.date) <= state.endDate!.toDate());

    return titleMatch && locationMatch && startDateMatch;
  });
};

export const { updateSearchQuery, updateLocationQuery, updateDateRange, updateEvents, updateFilteredEvents, updateDisplayCount } = eventsSlice.actions;

export default eventsSlice.reducer;

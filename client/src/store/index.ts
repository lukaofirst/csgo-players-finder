import { configureStore } from '@reduxjs/toolkit';
import { playersSlice } from './stateSlices/playersSlice';
import { teamsSlice } from './stateSlices/teamsSlice';
import { trophiesSlice } from './stateSlices/trophiesSlice';

export const store = configureStore({
    reducer: {
        players: playersSlice.reducer,
        teams: teamsSlice.reducer,
        trophies: trophiesSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

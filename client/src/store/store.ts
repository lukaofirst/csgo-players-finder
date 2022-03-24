import { configureStore } from '@reduxjs/toolkit';
import { playersSlice } from './playersSlice';
import { teamsSlice } from './teamsSlice';
import { trophiesSlice } from './trophiesSlice';

export const store = configureStore({
    reducer: {
        players: playersSlice.reducer,
        teams: teamsSlice.reducer,
        trophies: trophiesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

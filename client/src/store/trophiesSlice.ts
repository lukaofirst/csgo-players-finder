import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { Trophy } from '../models/Trophy';

export const fetchTrophiesAsync = createAsyncThunk(
    'trophies/fetchTrophiesAsync',
    async (_, thunkAPI) => {
        try {
            return agent.Trophies.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

interface TrophyState {
    trophiesLoaded: boolean;
    trophiesList: Trophy[];
    status: string;
}

const initialState: TrophyState = {
    trophiesLoaded: false,
    trophiesList: [],
    status: 'started',
};

const trophiesAdapter = createEntityAdapter<Trophy>();

export const trophiesSlice = createSlice({
    name: 'trophies',
    initialState: trophiesAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTrophiesAsync.pending, (state) => {
            state.status = 'pendingFetchTrophies';
        });

        builder.addCase(fetchTrophiesAsync.fulfilled, (state, action) => {
            state.trophiesList = action.payload;
            state.trophiesLoaded = true;
            state.status = 'done';
        });

        builder.addCase(fetchTrophiesAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

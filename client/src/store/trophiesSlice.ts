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

export const addTrophyAsync = createAsyncThunk(
    'trophies/addTrophyAsync',
    async (trophy: any, thunkAPI) => {
        try {
            return await agent.Trophies.add(trophy);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteTrophyAsync = createAsyncThunk<
    void,
    { id: number; name?: string }
>('trophies/deleteTrophyAsync', async ({ id }, thunkAPI) => {
    try {
        await agent.Trophies.delete(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

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
    reducers: {
        setTrophyList(state, action) {
            state.trophiesList = state.trophiesList.filter(
                (t) => t.id !== action.payload
            );
        },
    },
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

        builder.addCase(addTrophyAsync.pending, (state) => {
            state.status = 'pendingAddTrophy';
        });

        builder.addCase(addTrophyAsync.fulfilled, (state, action) => {
            trophiesAdapter.upsertOne(state, action.payload);
            state.status = 'done';
        });

        builder.addCase(addTrophyAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(deleteTrophyAsync.pending, (state, action) => {
            state.status = `pendingDeleteTrophy_${action.meta.arg.id}_${action.meta.arg.name}`;
        });

        builder.addCase(deleteTrophyAsync.fulfilled, (state) => {
            state.status = 'done';
        });

        builder.addCase(deleteTrophyAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const { setTrophyList } = trophiesSlice.actions;

import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { Player } from '../models/Player';
import { RootState } from './store';

export const fetchPlayersAsync = createAsyncThunk<Player[]>(
    'players/fetchPlayersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Players.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addPlayerAsync = createAsyncThunk(
    'players/addPlayerAsync',
    async (player: Player, thunkAPI) => {
        try {
            return await agent.Players.add(player);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deletePlayerAsync = createAsyncThunk(
    'players/removePlayerAsync',
    async (id: number, thunkAPI) => {
        try {
            return await agent.Players.delete(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

interface PlayerState {
    playersLoaded: boolean;
    playersList: Player[];
    status: string;
}

const initialState: PlayerState = {
    playersLoaded: false,
    playersList: [],
    status: 'started',
};

const playersAdapter = createEntityAdapter<Player>();

export const playersSlice = createSlice({
    name: 'players',
    initialState: playersAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlayersAsync.pending, (state) => {
            state.status = 'pendingFetchPlayers';
        });

        builder.addCase(fetchPlayersAsync.fulfilled, (state, action) => {
            state.playersList = action.payload;
            state.status = 'done';
            state.playersLoaded = true;
        });

        builder.addCase(fetchPlayersAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'failed';
        });

        builder.addCase(addPlayerAsync.pending, (state) => {
            state.status = 'pendingAddPlayer';
        });

        builder.addCase(addPlayerAsync.fulfilled, (state, action) => {
            playersAdapter.upsertOne(state, action.payload);
            state.status = 'done';
        });

        builder.addCase(addPlayerAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const playersSelectors = playersAdapter.getSelectors(
    (state: RootState) => state.players
);

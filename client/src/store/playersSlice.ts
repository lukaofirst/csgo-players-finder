import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
    async (player: any, thunkAPI) => {
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
    player: Player | undefined;
    status: string;
}

const initialState: PlayerState = {
    playersLoaded: false,
    playersList: [],
    player: {
        id: 0,
        nickname: '',
        name: '',
        age: 0,
        isActive: false,
        nationality: '',
        teamId: 0,
        playerTrophies: [],
    },
    status: 'started',
};

const playersAdapter = createEntityAdapter<Player>();

export const playersSlice = createSlice({
    name: 'players',
    initialState: playersAdapter.getInitialState(initialState),
    reducers: {
        setPlayer(state, action: PayloadAction<number>) {
            const player = state.playersList.find(
                (player) => player.id === action.payload
            );

            state.player = player;
        },
    },
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
            toast.success('Player added successfully!');
        });

        builder.addCase(addPlayerAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(deletePlayerAsync.pending, (state) => {
            state.status = 'pendingDeletePlayer';
        });

        builder.addCase(deletePlayerAsync.fulfilled, (state, action) => {
            playersAdapter.removeOne(state, action.payload);
            state.status = 'done';
        });

        builder.addCase(deletePlayerAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const { setPlayer } = playersSlice.actions;

export const playersSelectors = playersAdapter.getSelectors(
    (state: RootState) => state.players
);

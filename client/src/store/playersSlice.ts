import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { PlayerDTO } from '../models/DTO/PlayerDTO';
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

export const fetchPlayerAsync = createAsyncThunk(
    'players/fetchPlayerAsync',
    async (id: number, thunkAPI) => {
        try {
            return await agent.Players.getById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addPlayerAsync = createAsyncThunk(
    'players/addPlayerAsync',
    async (player: PlayerDTO, thunkAPI) => {
        try {
            return await agent.Players.add(player);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const editPlayerAsync = createAsyncThunk(
    'players/editPlayerAsync',
    async (player: PlayerDTO, thunkAPI) => {
        try {
            return await agent.Players.edit(player);
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
    editMode: boolean;
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
    editMode: false,
};

const playersAdapter = createEntityAdapter<Player>();

export const playersSlice = createSlice({
    name: 'players',
    initialState: playersAdapter.getInitialState(initialState),
    reducers: {
        setEditMode(state, action: PayloadAction<boolean>) {
            state.editMode = action.payload;
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

        builder.addCase(fetchPlayersAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(fetchPlayerAsync.pending, (state) => {
            state.playersLoaded = false;
            state.status = 'pendingFetchPlayer';
        });

        builder.addCase(fetchPlayerAsync.fulfilled, (state, action) => {
            state.player = action.payload;
            state.status = 'done';
            state.playersLoaded = true;
        });

        builder.addCase(fetchPlayerAsync.rejected, (state) => {
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

        builder.addCase(editPlayerAsync.pending, (state) => {
            state.status = 'pendingEditPlayer';
        });

        builder.addCase(editPlayerAsync.fulfilled, (state, action) => {
            playersAdapter.updateOne(state, action.payload);
            state.status = 'done';
            toast.success('Player updated successfully!');
            state.editMode = false;
        });

        builder.addCase(deletePlayerAsync.pending, (state) => {
            state.status = 'pendingDeletePlayer';
        });

        builder.addCase(deletePlayerAsync.fulfilled, (state, action) => {
            playersAdapter.removeOne(state, action.payload);
            state.status = 'done';
            toast.success('Player deleted successfully!');
        });

        builder.addCase(deletePlayerAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const playersSelectors = playersAdapter.getSelectors(
    (state: RootState) => state.players
);

export const { setEditMode } = playersSlice.actions;

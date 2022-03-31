import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { Team } from '../models/Team';

export const fetchTeamsAsync = createAsyncThunk<Team[]>(
    'teams/fetchTeamsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Teams.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addTeamAsync = createAsyncThunk(
    'teams/addTeamAsync',
    async (team: any, thunkAPI) => {
        try {
            return await agent.Teams.add(team);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteTeamAsync = createAsyncThunk(
    'teams/deleteTeamAsync',
    async (id: number, thunkAPI) => {
        try {
            return await agent.Teams.delete(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

interface TeamState {
    teamsLoaded: boolean;
    teamsList: Team[];
    status: string;
}

const initialState: TeamState = {
    teamsLoaded: false,
    teamsList: [],
    status: 'started',
};

const teamsAdapter = createEntityAdapter<Team>();

export const teamsSlice = createSlice({
    name: 'teams',
    initialState: teamsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTeamsAsync.pending, (state) => {
            state.status = 'pendingFetchTeams';
        });

        builder.addCase(fetchTeamsAsync.fulfilled, (state, action) => {
            state.teamsList = action.payload;
            state.status = 'done';
            state.teamsLoaded = true;
        });

        builder.addCase(fetchTeamsAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(addTeamAsync.pending, (state) => {
            state.status = 'pendingAddTeam';
        });

        builder.addCase(addTeamAsync.fulfilled, (state, action) => {
            teamsAdapter.upsertOne(state, action.payload);
            state.status = 'done';
            toast.success('Team added successfully');
        });

        builder.addCase(addTeamAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(deleteTeamAsync.pending, (state) => {
            state.status = 'pendingDeleteTeam';
        });

        builder.addCase(deleteTeamAsync.fulfilled, (state, action) => {
            teamsAdapter.removeOne(state, action.payload);
            state.status = 'done';
            toast.success('Team deleted successfully');
        });

        builder.addCase(deleteTeamAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

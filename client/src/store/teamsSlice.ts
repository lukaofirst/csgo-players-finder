import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    PayloadAction,
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

export const fetchTeamAsync = createAsyncThunk(
    'teams/fetchTeamAsync',
    async (id: number, thunkAPI) => {
        try {
            return await agent.Teams.getById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addTeamAsync = createAsyncThunk(
    'teams/addTeamAsync',
    async (team: Team, thunkAPI) => {
        try {
            return await agent.Teams.add(team);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const editTeamAsync = createAsyncThunk(
    'teams/editTeamAsync',
    async (team: Team, thunkAPI) => {
        try {
            return await agent.Teams.edit(team);
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
    team: Team | undefined;
    status: string;
    editMode: boolean;
}

const initialState: TeamState = {
    teamsLoaded: false,
    teamsList: [],
    team: {
        id: 0,
        name: '',
        location: '',
        region: '',
        foundedYear: 0,
        players: [],
    },
    status: 'started',
    editMode: false,
};

const teamsAdapter = createEntityAdapter<Team>();

export const teamsSlice = createSlice({
    name: 'teams',
    initialState: teamsAdapter.getInitialState(initialState),
    reducers: {
        setEditMode(state, action: PayloadAction<boolean>) {
            state.editMode = action.payload;
        },
    },
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

        builder.addCase(fetchTeamAsync.pending, (state) => {
            state.teamsLoaded = false;
            state.status = 'pendingFetchTeam';
        });

        builder.addCase(fetchTeamAsync.fulfilled, (state, action) => {
            state.team = action.payload;
            state.status = 'done';
            state.teamsLoaded = true;
        });

        builder.addCase(fetchTeamAsync.rejected, (state) => {
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

        builder.addCase(editTeamAsync.pending, (state) => {
            state.status = 'pendingEditTeam';
        });

        builder.addCase(editTeamAsync.fulfilled, (state, action) => {
            teamsAdapter.updateOne(state, action.payload);
            state.status = 'done';
            toast.success('Team updated successfully!');
            state.editMode = false;
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

export const { setEditMode } = teamsSlice.actions;

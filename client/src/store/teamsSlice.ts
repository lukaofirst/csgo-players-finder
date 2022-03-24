import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
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
    },
});

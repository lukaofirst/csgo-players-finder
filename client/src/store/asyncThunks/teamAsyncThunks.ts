import { createAsyncThunk } from '@reduxjs/toolkit';
import globalController from '../../api/globalController';
import { SuccessResponse } from '../../models/Responses/SuccessResponse';
import { Team } from '../../models/Team';

export const fetchTeamsAsync = createAsyncThunk<SuccessResponse<Team[]>>(
    'teams/fetchTeamsAsync',
    async (_, thunkAPI) => {
        try {
            return await globalController.Team.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchTeamAsync = createAsyncThunk<SuccessResponse<Team>, string>(
    'teams/fetchTeamAsync',
    async (id: string, thunkAPI) => {
        try {
            return await globalController.Team.getById(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const addTeamAsync = createAsyncThunk<SuccessResponse<Team>, Team>(
    'teams/addTeamAsync',
    async (team: Team, thunkAPI) => {
        try {
            return await globalController.Team.add(team);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const editTeamAsync = createAsyncThunk<SuccessResponse<Team>, Team>(
    'teams/editTeamAsync',
    async (team: Team, thunkAPI) => {
        try {
            return await globalController.Team.edit(team);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteTeamAsync = createAsyncThunk<
    SuccessResponse<string>,
    string
>('teams/deleteTeamAsync', async (id: string, thunkAPI) => {
    try {
        return await globalController.Team.delete(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

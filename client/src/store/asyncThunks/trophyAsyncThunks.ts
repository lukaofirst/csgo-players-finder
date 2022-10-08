import { createAsyncThunk } from '@reduxjs/toolkit';
import globalController from '../../api/globalController';
import { SuccessResponse } from '../../models/Responses/SuccessResponse';
import { Trophy } from '../../models/Trophy';

export const fetchTrophiesAsync = createAsyncThunk<SuccessResponse<Trophy[]>>(
    'trophies/fetchTrophiesAsync',
    async (_, thunkAPI) => {
        try {
            return globalController.Trophy.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchTrophyAsync = createAsyncThunk<
    SuccessResponse<Trophy>,
    string
>('trophies/fetchTrophyAsync', async (id: string, thunkAPI) => {
    try {
        return globalController.Trophy.getById(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const addTrophyAsync = createAsyncThunk<SuccessResponse<Trophy>, Trophy>(
    'trophies/addTrophyAsync',
    async (trophy: Trophy, thunkAPI) => {
        try {
            return await globalController.Trophy.add(trophy);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const editTrophyAsync = createAsyncThunk<
    SuccessResponse<Trophy>,
    Trophy
>('trophies/editTrophyAsync', async (trophy: Trophy, thunkAPI) => {
    try {
        return await globalController.Trophy.edit(trophy);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const deleteTrophyAsync = createAsyncThunk<string, string>(
    'trophies/deleteTrophyAsync',
    async (id: string, thunkAPI) => {
        try {
            return await globalController.Trophy.delete(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

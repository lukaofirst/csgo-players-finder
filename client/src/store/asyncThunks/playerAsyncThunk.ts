import { createAsyncThunk } from '@reduxjs/toolkit';
import globalController from '../../api/globalController';
import { Player } from '../../models/Player';
import { SuccessResponse } from '../../models/Responses/SuccessResponse';

export const fetchPlayersAsync = createAsyncThunk<SuccessResponse<Player[]>>(
    'players/fetchPlayersAsync',
    async (_, thunkAPI) => {
        try {
            return await globalController.Player.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchPlayerAsync = createAsyncThunk<
    SuccessResponse<Player>,
    string
>('players/fetchPlayerAsync', async (id: string, thunkAPI) => {
    try {
        return await globalController.Player.getById(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const addPlayerAsync = createAsyncThunk<SuccessResponse<Player>, Player>(
    'players/addPlayerAsync',
    async (player: Player, thunkAPI) => {
        try {
            return await globalController.Player.add(player);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const editPlayerAsync = createAsyncThunk<
    SuccessResponse<Player>,
    Player
>('players/editPlayerAsync', async (player: Player, thunkAPI) => {
    try {
        return await globalController.Player.edit(player);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const deletePlayerAsync = createAsyncThunk<
    SuccessResponse<string>,
    string
>('players/removePlayerAsync', async (id: string, thunkAPI) => {
    try {
        return await globalController.Player.delete(id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

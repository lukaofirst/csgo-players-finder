import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Trophy } from '../../models/Trophy';
import {
    fetchTrophiesAsync,
    fetchTrophyAsync,
    addTrophyAsync,
    editTrophyAsync,
    deleteTrophyAsync,
} from '../asyncThunks/trophyAsyncThunks';

interface TrophyState {
    trophiesLoaded: boolean;
    trophiesList: Trophy[];
    trophy: Trophy | undefined;
    status: string;
}

const initialState: TrophyState = {
    trophiesLoaded: false,
    trophiesList: [],
    trophy: {
        id: '',
        name: '',
        isMajor: false,
        year: 0,
    },
    status: 'started',
};

const trophiesAdapter = createEntityAdapter<Trophy>();

export const trophiesSlice = createSlice({
    name: 'trophies',
    initialState: trophiesAdapter.getInitialState(initialState),
    reducers: {
        setUpdatedTrophyList(state, action) {
            state.trophiesList = state.trophiesList.filter(
                (t) => t.id !== action.payload
            );
        },
        setTrophy(state, action: PayloadAction<string>) {
            const trophy = state.trophiesList.find(
                (trophy) => trophy.id === action.payload
            );

            state.trophy = trophy;
        },
        resetTrophyState(state) {
            state.trophy = initialState.trophy;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrophiesAsync.pending, (state) => {
            state.status = 'pendingFetchTrophies';
        });

        builder.addCase(fetchTrophiesAsync.fulfilled, (state, action) => {
            state.trophiesList = action.payload.body;
            state.trophiesLoaded = true;
            state.status = 'done';
        });

        builder.addCase(fetchTrophiesAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(fetchTrophyAsync.pending, (state) => {
            state.status = 'pendingFetchTrophy';
        });

        builder.addCase(fetchTrophyAsync.fulfilled, (state, action) => {
            state.trophy = action.payload.body;
            state.status = 'done';
        });

        builder.addCase(fetchTrophyAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(addTrophyAsync.pending, (state) => {
            state.status = 'pendingAddTrophy';
        });

        builder.addCase(addTrophyAsync.fulfilled, (state, action) => {
            trophiesAdapter.upsertOne(state, action.payload.body);
            state.status = 'done';
            toast.success('Trophy added successfully!');
        });

        builder.addCase(addTrophyAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(editTrophyAsync.pending, (state) => {
            state.status = 'pendingEditTrophy';
        });

        builder.addCase(editTrophyAsync.fulfilled, (state, action) => {
            trophiesAdapter.upsertOne(state, action.payload.body);
            state.status = 'done';
            toast.success('Trophy updated successfully!');
        });

        builder.addCase(editTrophyAsync.rejected, (state) => {
            state.status = 'failed';
        });

        builder.addCase(deleteTrophyAsync.pending, (state, action) => {
            state.status = `pendingDeleteTrophy_${action.meta.arg}`;
        });

        builder.addCase(deleteTrophyAsync.fulfilled, (state) => {
            state.status = 'done';
            toast.success('Trophy deleted successfully!');
        });

        builder.addCase(deleteTrophyAsync.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const { setUpdatedTrophyList, setTrophy, resetTrophyState } =
    trophiesSlice.actions;

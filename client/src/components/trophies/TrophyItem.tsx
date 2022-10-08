import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { TableRow, TableCell, Grid, Button } from '@mui/material';
import { Trophy } from '../../models/Trophy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ReactDOM from 'react-dom';
import {
    setTrophy,
    setUpdatedTrophyList,
} from '../../store/stateSlices/trophiesSlice';
import ModalDelete from '../shared/ModalDelete';
import { deleteTrophyAsync } from '../../store/asyncThunks/trophyAsyncThunks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ITrophyItem {
    item: Trophy;
}

const TrophyItem = ({ item }: ITrophyItem) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const { status, trophy } = useAppSelector((state) => state.trophies);

    const openDeleteModal = (id: string) => {
        dispatch(setTrophy(id));
        setOpen(true);
    };

    const editTrophy = (id: string) => {
        dispatch(setTrophy(id));
        navigate(`${id}/edit`);
    };

    const deleteTrophy = async (id: string) => {
        handleClose();

        try {
            await dispatch(deleteTrophyAsync(id));
            dispatch(setUpdatedTrophyList(id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {ReactDOM.createPortal(
                <ModalDelete
                    open={open}
                    type='trophy'
                    itemName={trophy!.name}
                    handleDelete={() => deleteTrophy(trophy!.id!)}
                    handleClose={handleClose}
                />,
                document.getElementById('overlay-root')!
            )}
            <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.isMajor.toString()}</TableCell>
                <TableCell align='center'>
                    <Grid
                        display='flex'
                        justifyContent='center'
                        container
                        spacing={1}
                    >
                        <Grid item>
                            <Button
                                variant='outlined'
                                color='warning'
                                size='small'
                                onClick={() => editTrophy(item.id!)}
                            >
                                <Edit />
                            </Button>
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                loading={
                                    status === `pendingDeleteTrophy_${item.id}`
                                }
                                variant='outlined'
                                color='error'
                                size='small'
                                onClick={() => openDeleteModal(item.id!)}
                            >
                                <DeleteIcon />
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TrophyItem;

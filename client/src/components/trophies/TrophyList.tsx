import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Trophy } from '../../models/Trophy';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
    deleteTrophyAsync,
    setTrophy,
    setTrophyList,
} from '../../store/trophiesSlice';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import ModalDelete from '../utils/ModalDelete';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface Props {
    items: Trophy[];
}

const TrophyList = ({ items }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status, trophy } = useAppSelector((state) => state.trophies);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const openDeleteModal = (id: number) => {
        dispatch(setTrophy(id));
        setOpen(true);
    };

    const editTrophy = (id: number) => {
        navigate(`${id}/edit`);
    };

    const deleteTrophy = async (id: number, name: string) => {
        handleClose();

        try {
            await dispatch(deleteTrophyAsync({ id, name }));
            dispatch(setTrophyList(id));
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
                    handleDelete={() => deleteTrophy(trophy!.id!, trophy!.name)}
                    handleClose={handleClose}
                />,
                document.getElementById('overlay-root')!
            )}
            <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#383838' }}>
                            <TableCell sx={{ color: 'white' }}>Id</TableCell>
                            <TableCell sx={{ color: 'white' }}>Year</TableCell>
                            <TableCell width={500} sx={{ color: 'white' }}>
                                Title Name
                            </TableCell>
                            <TableCell width={100} sx={{ color: 'white' }}>
                                Is Major?
                            </TableCell>
                            <TableCell sx={{ color: 'white' }} align='center'>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.id!.toString().padStart(4, '0')}
                                </TableCell>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.isMajor.toString()}</TableCell>
                                <TableCell align='center'>
                                    <Button
                                        variant='outlined'
                                        color='warning'
                                        size='small'
                                        sx={{ mr: 1 }}
                                        onClick={() => editTrophy(item.id!)}
                                    >
                                        <Edit />
                                    </Button>
                                    <LoadingButton
                                        loading={
                                            status ===
                                            `pendingDeleteTrophy_${item.id}_${item.name}`
                                        }
                                        variant='outlined'
                                        color='error'
                                        size='small'
                                        onClick={() =>
                                            openDeleteModal(item.id!)
                                        }
                                    >
                                        <DeleteIcon />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TrophyList;

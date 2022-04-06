import {
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
import { setTrophy } from '../../store/trophiesSlice';
import { LoadingButton } from '@mui/lab';
import TrophyModalDelete from './TrophyModalDelete';
import { useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    items: Trophy[];
}

const TrophyList = ({ items }: Props) => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.trophies);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const openDeleteModal = (id: number) => {
        dispatch(setTrophy(id));
        setOpen(true);
    };

    return (
        <>
            {ReactDOM.createPortal(
                <TrophyModalDelete open={open} handleClose={handleClose} />,
                document.getElementById('overlay-root')!
            )}
            <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#383838' }}>
                            <TableCell sx={{ color: 'white' }}>Id</TableCell>
                            <TableCell sx={{ color: 'white' }}>Year</TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                Title Name
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
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
                                    {item.id.toString().padStart(4, '0')}
                                </TableCell>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.isMajor.toString()}</TableCell>
                                <TableCell align='center'>
                                    <LoadingButton
                                        loading={
                                            status ===
                                            `pendingDeleteTrophy_${item.id}_${item.name}`
                                        }
                                        variant='outlined'
                                        color='error'
                                        size='small'
                                        onClick={() => openDeleteModal(item.id)}
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

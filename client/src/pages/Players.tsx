import { Box, Container, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/players/PlayerList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchPlayersAsync } from '../store/playersSlice';

const Players = () => {
    const playersList = useAppSelector((state) => state.players.playersList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPlayersAsync());
    }, [dispatch]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddPlayer = () => {
        navigate('add-player');
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 5, pb: 20 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
                <ActionBtn name='player' onClick={NavigateToAddPlayer} />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label='Search by name or nickname'
                    autoFocus
                />
            </Box>
            <PlayerList items={playersList} />
        </Container>
    );
};

export default Players;

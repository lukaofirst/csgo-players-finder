import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/players/PlayerList';
import ActionButton from '../components/shared/ActionButton';
import BackButton from '../components/shared/BackButton';
import LoadingComponent from '../components/shared/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Player } from '../models/Player';
import { fetchPlayersAsync } from '../store/asyncThunks/playerAsyncThunk';

const PlayersPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { playersList, playersLoaded } = useAppSelector(
        (state) => state.players
    );

    const [searchPlayer, setSearchPlayer] = useState<string>('');
    const [playersListResult, setPlayersListResult] = useState<Player[]>([]);

    useEffect(() => {
        dispatch(fetchPlayersAsync());
    }, [dispatch]);

    useEffect(() => {
        setPlayersListResult(playersList);
    }, [playersList]);

    const NavigateToAddPlayer = () => {
        navigate('add');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
            const filteredPlayers = playersList.filter(
                (player) =>
                    player.nickname
                        .toLowerCase()
                        .startsWith(e.target.value.trim().toLowerCase()) ||
                    player.name
                        .toLowerCase()
                        .startsWith(e.target.value.trim().toLowerCase())
            );

            setPlayersListResult(filteredPlayers);
            setSearchPlayer(e.target.value);
        }
    };

    if (!playersLoaded)
        return <LoadingComponent message='Loading Players...' />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2, pb: 8 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackButton />
                <ActionButton
                    variant='contained'
                    name='player'
                    color='success'
                    icon='add'
                    onClick={NavigateToAddPlayer}
                />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label='Search by name or nickname'
                    autoFocus
                    onChange={onChangeHandler}
                    value={searchPlayer}
                />
            </Box>
            {playersListResult.length > 0 ? (
                <PlayerList items={playersListResult} />
            ) : (
                <Typography
                    variant='h4'
                    color='red'
                    textAlign='center'
                    marginY={5}
                >
                    No Players Registered
                </Typography>
            )}
        </Container>
    );
};

export default PlayersPage;

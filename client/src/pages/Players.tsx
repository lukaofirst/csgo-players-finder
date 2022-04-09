import { Box, Container, Stack, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/players/PlayerList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import LoadingComponent from '../components/utils/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchPlayersAsync } from '../store/playersSlice';

const Players = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { playersList, playersLoaded } = useAppSelector(
        (state) => state.players
    );

    const [playerNickname, setPlayerNickname] = useState<string>('');
    const [playerName, setPlayerName] = useState<string>('');

    useEffect(() => {
        dispatch(fetchPlayersAsync());
    }, [dispatch]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddPlayer = () => {
        navigate('add-player');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
            setPlayerNickname(e.target.value.trim());
            setPlayerName(e.target.value.trim());
        }
    };

    const filteredPlayers = playersList.filter(
        (player) =>
            player.nickname.toLowerCase().startsWith(playerNickname) ||
            player.name.toLowerCase().startsWith(playerName)
    );

    if (!playersLoaded)
        return <LoadingComponent message='Loading Players...' />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2, pb: 8 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
                <ActionBtn
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
                />
            </Box>
            <PlayerList
                items={
                    filteredPlayers.length === 0 ? playersList : filteredPlayers
                }
            />
        </Container>
    );
};

export default Players;

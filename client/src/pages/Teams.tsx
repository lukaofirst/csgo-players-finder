import { Box, Container, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamList from '../components/teams/TeamList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchTeamsAsync } from '../store/teamsSlice';

const Teams = () => {
    const teamsList = useAppSelector((state) => state.teams.teamsList);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTeamsAsync());
    }, [dispatch]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddTeam = () => {
        navigate('add-team');
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 5, pb: 20 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
                <ActionBtn name='team' onClick={NavigateToAddTeam} />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Search by team's name"
                    autoFocus
                />
            </Box>
            <TeamList items={teamsList} />
        </Container>
    );
};

export default Teams;

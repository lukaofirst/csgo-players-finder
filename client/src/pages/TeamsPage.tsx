import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamList from '../components/teams/TeamList';
import ActionButton from '../components/shared/ActionButton';
import BackButton from '../components/shared/BackButton';
import LoadingComponent from '../components/shared/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Team } from '../models/Team';
import { fetchTeamsAsync } from '../store/asyncThunks/teamAsyncThunks';

const TeamsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { teamsList, teamsLoaded } = useAppSelector((state) => state.teams);

    const [searchTeam, setSearchTeam] = useState<string>('');
    const [teamsListResult, setTeamsListResult] = useState<Team[]>([]);

    useEffect(() => {
        dispatch(fetchTeamsAsync());
    }, [dispatch]);

    useEffect(() => {
        setTeamsListResult(teamsList);
    }, [teamsList]);

    const NavigateToAddTeam = () => {
        navigate('add');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
            const filteredTeams = teamsList.filter(
                (team) =>
                    team.name
                        .toLowerCase()
                        .includes(e.target.value.trim().toLowerCase()) ||
                    team.location
                        .toLowerCase()
                        .includes(e.target.value.trim().toLowerCase())
            );

            setTeamsListResult(filteredTeams);
            setSearchTeam(e.target.value);
        }
    };

    if (!teamsLoaded) return <LoadingComponent message='Loading Teams...' />;

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
                    name='team'
                    color='success'
                    icon='add'
                    onClick={NavigateToAddTeam}
                />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Search by team's name or location"
                    autoFocus
                    onChange={onChangeHandler}
                    value={searchTeam}
                />
            </Box>

            {teamsListResult.length > 0 ? (
                <TeamList items={teamsListResult} />
            ) : (
                <Typography
                    variant='h4'
                    color='red'
                    textAlign='center'
                    marginY={5}
                >
                    No Teams Registered
                </Typography>
            )}
        </Container>
    );
};

export default TeamsPage;

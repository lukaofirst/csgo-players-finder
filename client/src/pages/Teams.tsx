import { Box, Container, Stack, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamList from '../components/teams/TeamList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import LoadingComponent from '../components/utils/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchTeamsAsync } from '../store/teamsSlice';

const Teams = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { teamsList, teamsLoaded } = useAppSelector((state) => state.teams);

    const [teamName, setTeamName] = useState<string>('');
    const [teamLocation, setTeamLocation] = useState<string>('');

    useEffect(() => {
        dispatch(fetchTeamsAsync());
    }, [dispatch]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddTeam = () => {
        navigate('add-team');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
            setTeamName(e.target.value.trim());
            setTeamLocation(e.target.value.trim());
        }
    };

    const filteredTeams = teamsList.filter(
        (team) =>
            team.name.toLowerCase().includes(teamName) ||
            team.location.toLowerCase().includes(teamLocation)
    );

    if (!teamsLoaded) return <LoadingComponent message='Loading Teams...' />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2, pb: 8 }}>
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
                    label="Search by team's name or location"
                    autoFocus
                    onChange={onChangeHandler}
                />
            </Box>
            <TeamList
                items={filteredTeams.length === 0 ? teamsList : filteredTeams}
            />
        </Container>
    );
};

export default Teams;

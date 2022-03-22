import { Box, Container, Stack, TextField } from '@mui/material';
import TeamList from '../components/teams/TeamList';
import { teamsArr } from '../components/tempData/data';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';

const Teams = () => {
    return (
        <Container maxWidth='lg' sx={{ mt: 5, pb: 20 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn />
                <ActionBtn name='team' />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Search by team's name"
                    autoFocus
                />
            </Box>
            <TeamList items={teamsArr} />
        </Container>
    );
};

export default Teams;

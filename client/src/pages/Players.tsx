import { Box, Container, Stack, TextField } from '@mui/material';
import PlayerList from '../components/players/PlayerList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';

export interface Player {
    id: number;
    nickname: string;
    name: string;
    age: number;
    nationality: string;
    team: string;
}

const playersArr: Player[] = [
    {
        id: 1,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 2,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 3,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 4,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 5,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 6,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 7,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 8,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
    {
        id: 9,
        nickname: 'lorem',
        name: 'ipsum',
        age: 23,
        nationality: 'Brazil',
        team: 'CSGO Team',
    },
];

const Players = () => {
    return (
        <Container maxWidth='lg' sx={{ mt: 5, pb: 20 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn />
                <ActionBtn name='player' />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label='Search by name or nickname'
                    autoFocus
                />
            </Box>
            <PlayerList items={playersArr} />
        </Container>
    );
};

export default Players;

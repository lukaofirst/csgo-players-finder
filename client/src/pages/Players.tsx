import { Box, Container, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayerList from '../components/players/PlayerList';
import { playersArr } from '../components/tempData/data';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';

const Players = () => {
    const navigate = useNavigate();

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
            <PlayerList items={playersArr} />
        </Container>
    );
};

export default Players;

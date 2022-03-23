import { Add } from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    FormControl,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../utils/BackBtn';

const PlayerForm = () => {
    const navigate = useNavigate();

    const NavigateBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 5 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
            </Stack>
            <Box
                sx={{
                    my: 5,
                    display: 'block',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h5' sx={{ mb: 2, color: '#299cdd' }}>
                    Add a player
                </Typography>
                <FormControl sx={{ width: '500px', margin: '0 auto' }}>
                    <TextField
                        variant='outlined'
                        label='Nickname'
                        sx={{ my: 1 }}
                    />
                    <TextField variant='outlined' label='Name' sx={{ my: 1 }} />
                    <TextField
                        type='number'
                        variant='outlined'
                        label='Age'
                        sx={{ my: 1 }}
                    />
                    <TextField
                        variant='outlined'
                        label='Nationality'
                        sx={{ my: 1 }}
                    />
                    <TextField variant='outlined' label='Team' sx={{ my: 1 }} />
                    <Button variant='contained' size='large' sx={{ my: 2 }}>
                        <Add />
                        Player
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PlayerForm;

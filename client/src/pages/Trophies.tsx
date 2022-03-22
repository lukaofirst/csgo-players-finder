import { Box, Container, Stack, TextField } from '@mui/material';
import { trophiesArr } from '../components/tempData/data';
import TrophyList from '../components/trophies/TrophyList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';

const Trophies = () => {
    return (
        <Container maxWidth='lg' sx={{ mt: 5, pb: 20 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn />
                <ActionBtn name='trophy' />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label='Search by year'
                    autoFocus
                />
            </Box>
            <TrophyList items={trophiesArr} />
        </Container>
    );
};

export default Trophies;

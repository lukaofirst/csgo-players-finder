import { Box, Container, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrophyList from '../components/trophies/TrophyList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchTrophiesAsync } from '../store/trophiesSlice';

const Trophies = () => {
    const trophiesList = useAppSelector((state) => state.trophies.trophiesList);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTrophiesAsync());
    }, [dispatch]);

    const navigate = useNavigate();

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddTrophy = () => {
        navigate('add-trophy');
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 5, pb: 20 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
                <ActionBtn name='trophy' onClick={NavigateToAddTrophy} />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label='Search by year'
                    autoFocus
                />
            </Box>
            <TrophyList items={trophiesList} />
        </Container>
    );
};

export default Trophies;

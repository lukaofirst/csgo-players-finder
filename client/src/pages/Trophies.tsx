import { Box, Container, Stack, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrophyList from '../components/trophies/TrophyList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import LoadingComponent from '../components/utils/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchTrophiesAsync } from '../store/trophiesSlice';

const Trophies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { trophiesList, trophiesLoaded } = useAppSelector(
        (state) => state.trophies
    );

    const [trophyName, setTrophyName] = useState<string>('');
    const [trophyYear, setTrophyYear] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchTrophiesAsync());
    }, [dispatch]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddTrophy = () => {
        navigate('add');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
            setTrophyName(e.target.value.trim());
            setTrophyYear(+e.target.value.trim());
        }
    };

    if (!trophiesLoaded)
        return <LoadingComponent message='Loading Trophies...' />;

    const filteredTrophies = trophiesList.filter(
        (trophy) =>
            trophy.name.toLowerCase().includes(trophyName) ||
            trophy.year === trophyYear
    );

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
                    name='trophy'
                    color='success'
                    icon='add'
                    onClick={NavigateToAddTrophy}
                />
            </Stack>
            <Box sx={{ my: 3 }}>
                <TextField
                    fullWidth
                    variant='standard'
                    label="Search by title's name or year"
                    autoFocus
                    onChange={onChangeHandler}
                />
            </Box>
            <TrophyList
                items={
                    filteredTrophies.length === 0
                        ? trophiesList
                        : filteredTrophies
                }
            />
        </Container>
    );
};

export default Trophies;

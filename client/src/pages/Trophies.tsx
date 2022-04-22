import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrophyList from '../components/trophies/TrophyList';
import ActionBtn from '../components/utils/ActionBtn';
import BackBtn from '../components/utils/BackBtn';
import LoadingComponent from '../components/utils/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Trophy } from '../models/Trophy';
import { fetchTrophiesAsync } from '../store/trophiesSlice';

const Trophies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { trophiesList, trophiesLoaded } = useAppSelector(
        (state) => state.trophies
    );

    const [searchTrophy, setSearchTrophy] = useState<string>('');
    const [trophiesListResult, setTrophiesListResult] = useState<Trophy[]>([]);

    useEffect(() => {
        dispatch(fetchTrophiesAsync());
    }, [dispatch]);

    useEffect(() => {
        setTrophiesListResult(trophiesList);
    }, [trophiesList]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const NavigateToAddTrophy = () => {
        navigate('add');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== null) {
            const filteredTrophies = trophiesList.filter(
                (trophy) =>
                    trophy.name
                        .toLowerCase()
                        .includes(e.target.value.trim().toLowerCase()) ||
                    trophy.year === +e.target.value.trim()
            );

            setTrophiesListResult(filteredTrophies);
            setSearchTrophy(e.target.value);
        }
    };

    if (!trophiesLoaded)
        return <LoadingComponent message='Loading Trophies...' />;

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
                    value={searchTrophy}
                />
            </Box>
            {trophiesListResult.length > 0 ? (
                <TrophyList items={trophiesListResult} />
            ) : (
                <Typography
                    variant='h4'
                    color='red'
                    textAlign='center'
                    marginY={5}
                >
                    No Trophies Registered
                </Typography>
            )}
        </Container>
    );
};

export default Trophies;

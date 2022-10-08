import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import BackButton from '../shared/BackButton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Fragment, useEffect, useState } from 'react';
import { setEditMode } from '../../store/stateSlices/playersSlice';
import LoadingComponent from '../shared/LoadingComponent';
import ActionButton from '../shared/ActionButton';
import ModalDelete from '../shared/ModalDelete';
import ReactDOM from 'react-dom';
import {
    deletePlayerAsync,
    fetchPlayerAsync,
} from '../../store/asyncThunks/playerAsyncThunk';
import { StatusCode } from '../../models/Enums/StatusCode';

const PlayerDetailed = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { player, playersLoaded } = useAppSelector((state) => state.players);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(fetchPlayerAsync(id!));
    }, [dispatch, id]);

    const openDeleteModal = () => {
        setOpen(true);
    };

    const editPlayer = () => {
        dispatch(setEditMode(true));
        navigate('edit');
    };

    const deletePlayer = async (id: string) => {
        handleClose();

        try {
            const result = await dispatch(deletePlayerAsync(id)).unwrap();

            if (result.statusCode === StatusCode.Success) {
                navigate('/players');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!playersLoaded)
        return <LoadingComponent message="Loading Player's Info..." />;

    return (
        <>
            {ReactDOM.createPortal(
                <ModalDelete
                    open={open}
                    type='player'
                    itemName={`${player!.name.split(' ')[0]} "${
                        player!.nickname
                    }" ${player!.name.split(' ')[1]}`}
                    handleDelete={() => deletePlayer(player?.id!)}
                    handleClose={handleClose}
                />,
                document.getElementById('overlay-root')!
            )}
            <Container maxWidth='lg' sx={{ mt: 2 }}>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <BackButton />
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <ActionButton
                            variant='outlined'
                            name='Player'
                            color='warning'
                            icon='edit'
                            onClick={editPlayer}
                        />
                        <ActionButton
                            variant='outlined'
                            name='Player'
                            color='error'
                            icon='remove'
                            onClick={openDeleteModal}
                        />
                    </Stack>
                </Stack>
                <Stack
                    direction='row'
                    justifyContent='space-evenly'
                    alignItems='flex-start'
                    flexWrap='wrap'
                    my={5}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            width: '400px',
                            padding: '30px',
                            marginBottom: '20px',
                        }}
                    >
                        <Typography
                            variant='h5'
                            color='#299cdd'
                            pb={5}
                            textAlign='center'
                        >
                            Player's Info
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                Nickname:
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6' gutterBottom>
                                    {player?.nickname}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                Name:
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6' gutterBottom>
                                    {player?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                Age:
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6' gutterBottom>
                                    {player?.age} years
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                Nationality:
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6' gutterBottom>
                                    {player?.nationality}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                Team:
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6' gutterBottom>
                                    {player?.isActive.toString() === 'true'
                                        ? player?.team?.name
                                        : 'No Team'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '450px',
                            padding: '30px',
                            marginBottom: '20px',
                        }}
                    >
                        {player?.trophies?.length! > 0 ? (
                            <>
                                <Typography
                                    variant='h5'
                                    color='#299cdd'
                                    pb={5}
                                    textAlign='center'
                                >
                                    Achievements
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        Title's Name
                                    </Grid>
                                    <Grid item xs={2} textAlign='center'>
                                        Year
                                    </Grid>
                                    <Grid item xs={2} textAlign='center'>
                                        Is Major
                                    </Grid>
                                    {player?.trophies?.map((trophy) => (
                                        <Fragment key={trophy.id}>
                                            <Grid item xs={8}>
                                                <Typography
                                                    variant='subtitle1'
                                                    fontWeight='bold'
                                                    gutterBottom
                                                >
                                                    {trophy.name}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                textAlign='center'
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    gutterBottom
                                                >
                                                    {trophy.year}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                textAlign='center'
                                            >
                                                {trophy.isMajor && (
                                                    <EmojiEventsIcon
                                                        sx={{
                                                            color: '#299cdd',
                                                        }}
                                                    />
                                                )}
                                            </Grid>
                                        </Fragment>
                                    ))}
                                </Grid>
                            </>
                        ) : (
                            <Typography
                                variant='h6'
                                textAlign='center'
                                color='red'
                            >
                                There's no Achievements
                            </Typography>
                        )}
                    </Paper>
                </Stack>
            </Container>
        </>
    );
};

export default PlayerDetailed;

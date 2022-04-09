import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import BackBtn from '../utils/BackBtn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Fragment, useEffect, useState } from 'react';
import { deletePlayerAsync, fetchPlayerAsync } from '../../store/playersSlice';
import LoadingComponent from '../utils/LoadingComponent';
import ActionBtn from '../utils/ActionBtn';
import ModalDelete from '../utils/ModalDelete';
import ReactDOM from 'react-dom';

const PlayerDetailed = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { player, playersLoaded } = useAppSelector((state) => state.players);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(fetchPlayerAsync(+id!));
    }, [dispatch, id]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const openDeleteModal = () => {
        setOpen(true);
    };

    const deletePlayer = async (id: number) => {
        handleClose();

        try {
            await dispatch(deletePlayerAsync(id));

            setTimeout(() => {
                navigate('/players');
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    if (!playersLoaded)
        return <LoadingComponent message="Loading Player's Info..." />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2 }}>
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
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
                <ActionBtn
                    variant='outlined'
                    name='Player'
                    color='error'
                    icon='remove'
                    onClick={openDeleteModal}
                />
            </Stack>
            <Stack
                direction='row'
                justifyContent='space-evenly'
                alignItems='flex-start'
                my={5}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '400px',
                        padding: '30px',
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
                    }}
                >
                    {player?.playerTrophies?.length! > 0 ? (
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
                                    IsMajor
                                </Grid>
                                {player?.playerTrophies?.map(({ trophy }) => (
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
                                        <Grid item xs={2} textAlign='center'>
                                            <Typography
                                                variant='subtitle1'
                                                gutterBottom
                                            >
                                                {trophy.year}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} textAlign='center'>
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
                        <Typography variant='h6' textAlign='center' color='red'>
                            There's no Achievements
                        </Typography>
                    )}
                </Paper>
            </Stack>
        </Container>
    );
};

export default PlayerDetailed;

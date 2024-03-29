import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
    deleteTeamAsync,
    fetchTeamAsync,
} from '../../store/asyncThunks/teamAsyncThunks';
import { setEditMode } from '../../store/stateSlices/teamsSlice';
import NavigateActionButtons from '../shared/NavigateActionButtons';
import ActionButton from '../shared/ActionButton';
import LoadingComponent from '../shared/LoadingComponent';
import ModalDelete from '../shared/ModalDelete';
import { StatusCode } from '../../models/Enums/StatusCode';

const TeamDetailed = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { team, teamsLoaded } = useAppSelector((state) => state.teams);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(fetchTeamAsync(id!));
    }, [dispatch, id]);

    const openDeleteModal = () => {
        setOpen(true);
    };

    const editTeam = () => {
        dispatch(setEditMode(true));
        navigate('edit');
    };

    const deleteTeam = async (id: string) => {
        handleClose();

        try {
            const result = await dispatch(deleteTeamAsync(id)).unwrap();

            if (result.statusCode === StatusCode.Success) {
                navigate('/teams');
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!teamsLoaded)
        return <LoadingComponent message="Loading Team's Info..." />;

    return (
        <>
            {ReactDOM.createPortal(
                <ModalDelete
                    open={open}
                    type='team'
                    itemName={team!.name}
                    handleDelete={() => deleteTeam(team?.id!)}
                    handleClose={handleClose}
                />,
                document.getElementById('overlay-root')!
            )}
            <Container maxWidth='lg' sx={{ mt: 2 }}>
                <NavigateActionButtons
                    children={
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <ActionButton
                                variant='outlined'
                                name='Team'
                                color='warning'
                                icon='edit'
                                onClick={editTeam}
                            />
                            <ActionButton
                                variant='outlined'
                                name='Team'
                                color='error'
                                icon='remove'
                                onClick={openDeleteModal}
                            />
                        </Stack>
                    }
                />
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
                            width: '450px',
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
                            Team's Info
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                Name:
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h6' gutterBottom>
                                    {team?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                Location:
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h6' gutterBottom>
                                    {team?.location}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                Region:
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h6' gutterBottom>
                                    {team?.region}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                Founded Year:
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='h6' gutterBottom>
                                    {team?.foundedYear}
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
                        {team?.players?.length! > 0 ? (
                            <>
                                <Typography
                                    variant='h5'
                                    color='#299cdd'
                                    pb={5}
                                    textAlign='center'
                                >
                                    Players
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        Nickname
                                    </Grid>
                                    <Grid item xs={5} textAlign='center'>
                                        Nationality
                                    </Grid>
                                    <Grid item xs={2} textAlign='center'>
                                        Age
                                    </Grid>
                                    {team?.players?.map((player) => (
                                        <Fragment key={player.id}>
                                            <Grid item xs={5}>
                                                <Typography
                                                    variant='subtitle1'
                                                    fontWeight='bold'
                                                    gutterBottom
                                                >
                                                    {player.nickname}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={5}
                                                textAlign='center'
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    fontWeight='bold'
                                                    gutterBottom
                                                >
                                                    {player.nationality}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                textAlign='center'
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    fontWeight='bold'
                                                    gutterBottom
                                                >
                                                    {player.age}
                                                </Typography>
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
                                There's no Players
                            </Typography>
                        )}
                    </Paper>
                </Stack>
            </Container>
        </>
    );
};

export default TeamDetailed;

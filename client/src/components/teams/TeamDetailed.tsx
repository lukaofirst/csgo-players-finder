import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import BackBtn from '../utils/BackBtn';

const TeamDetailed = () => {
    const navigate = useNavigate();
    const { team } = useAppSelector((state) => state.teams);

    const NavigateBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 2 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
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
                        width: '450px',
                        padding: '30px',
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
                                        <Grid item xs={5} textAlign='center'>
                                            <Typography
                                                variant='subtitle1'
                                                fontWeight='bold'
                                                gutterBottom
                                            >
                                                {player.nationality}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} textAlign='center'>
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
                        <Typography variant='h6' textAlign='center' color='red'>
                            There's no Players
                        </Typography>
                    )}
                </Paper>
            </Stack>
        </Container>
    );
};

export default TeamDetailed;

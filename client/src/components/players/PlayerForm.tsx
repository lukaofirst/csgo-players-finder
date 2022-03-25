import { Add } from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addPlayerAsync } from '../../store/playersSlice';
import { fetchTeamsAsync } from '../../store/teamsSlice';
import { fetchTrophiesAsync } from '../../store/trophiesSlice';
import BackBtn from '../utils/BackBtn';
import LoadingComponent from '../utils/LoadingComponent';

const PlayerForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const { teamsList, teamsLoaded } = useAppSelector((state) => state.teams);
    const { trophiesList, trophiesLoaded } = useAppSelector(
        (state) => state.trophies
    );

    useEffect(() => {
        dispatch(fetchTeamsAsync());
        dispatch(fetchTrophiesAsync());
    }, [dispatch]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const onSubmitHandler = (data: any) => {
        const filteredTrophiesList = data.trophies.map((item: any) => ({
            trophyId: item,
        }));

        const sendData = {
            nickname: data.nickname,
            name: data.name,
            age: data.age,
            nationality: data.nationality,
            isActive: data.isActive,
            teamId: data.teamId,
            trophies: filteredTrophiesList,
        };

        dispatch(addPlayerAsync(JSON.stringify(sendData)));
    };

    if (!teamsLoaded || !trophiesLoaded)
        return <LoadingComponent message='Loading all the info needed...' />;

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
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '500px', margin: '0 auto' }}
                >
                    <TextField
                        variant='outlined'
                        label='Nickname'
                        sx={{ my: 1 }}
                        {...register('nickname')}
                    />
                    <TextField
                        variant='outlined'
                        label='Name'
                        sx={{ my: 1 }}
                        {...register('name')}
                    />
                    <TextField
                        type='number'
                        variant='outlined'
                        label='Age'
                        sx={{ my: 1 }}
                        {...register('age')}
                    />
                    <TextField
                        variant='outlined'
                        label='Nationality'
                        sx={{ my: 1 }}
                        {...register('nationality')}
                    />
                    <FormGroup sx={{ mt: 1 }}>
                        <FormLabel component='legend'>Is Active?</FormLabel>
                        <RadioGroup
                            {...register('isActive')}
                            sx={{ display: 'inline-block' }}
                        >
                            <FormControlLabel
                                value='true'
                                control={<Radio />}
                                label='True'
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio />}
                                label='False'
                            />
                        </RadioGroup>
                    </FormGroup>
                    <Select
                        native
                        sx={{ my: 1, textAlign: 'left' }}
                        {...register('teamId')}
                        defaultValue=''
                    >
                        <option value='' disabled>
                            Team
                        </option>
                        {teamsList.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </Select>
                    <FormGroup sx={{ my: 2 }}>
                        <FormLabel sx={{ textAlign: 'left', mb: 1 }}>
                            Trophies
                        </FormLabel>
                        {trophiesList.map((trophy) => (
                            <FormControlLabel
                                key={trophy.id}
                                {...register('trophies')}
                                control={<Checkbox value={trophy.id} />}
                                label={trophy.name}
                            />
                        ))}
                    </FormGroup>
                    <Button type='submit' variant='contained' size='large'>
                        <Add />
                        Player
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PlayerForm;

import { Add } from '@mui/icons-material';
import { Box, Container, FormControl, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addPlayerAsync } from '../../store/playersSlice';
import { fetchTeamsAsync } from '../../store/teamsSlice';
import { fetchTrophiesAsync } from '../../store/trophiesSlice';
import { playerValidatorSchema } from '../../validators/playerValidatorSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import BackBtn from '../utils/BackBtn';
import LoadingComponent from '../utils/LoadingComponent';
import AppTextInput from '../utils/AppTextInput';
import AppRadioInput from '../utils/AppRadioInput';
import AppSelectInput from '../utils/AppSelectInput';
import AppCheckboxInput from '../utils/AppCheckboxInput';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { PlayerDTO } from '../../models/DTO/PlayerDTO';
import { Trophy } from '../../models/Trophy';

const PlayerForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver<any>(playerValidatorSchema),
    });

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

    const onSubmitHandler = async (data: FieldValues) => {
        const filteredTrophiesList: Trophy[] = data.trophies?.map(
            (item: Trophy) => ({
                trophyId: item,
            })
        );

        const sendData: PlayerDTO = {
            nickname: data.nickname,
            name: data.name,
            age: data.age,
            nationality: data.nationality,
            isActive: data.isActive,
            teamId: data.teamId,
            trophies: filteredTrophiesList,
        };

        try {
            await dispatch(addPlayerAsync(JSON.stringify(sendData)));
            reset();
            toast.success('Player added successfully!');
        } catch (err) {
            console.log(err);
        }
    };

    if (!teamsLoaded || !trophiesLoaded)
        return <LoadingComponent message='Loading all the info needed...' />;

    return (
        <Container maxWidth='lg' sx={{ mt: 2 }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <BackBtn onClick={NavigateBack} />
            </Stack>
            <Box
                sx={{
                    mt: 2,
                    mb: 5,
                    display: 'block',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h5' sx={{ mb: 1, color: '#299cdd' }}>
                    Add a player
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '500px', margin: '0 auto' }}
                >
                    <AppTextInput
                        label='Nickname'
                        name='nickname'
                        control={control}
                    />
                    <AppTextInput label='Name' name='name' control={control} />
                    <AppTextInput
                        label='Age'
                        name='age'
                        type='number'
                        control={control}
                    />
                    <AppTextInput
                        label='Nationality'
                        name='nationality'
                        control={control}
                    />
                    <>
                        <AppRadioInput
                            label='Is Active'
                            name='isActive'
                            control={control}
                            textposition='center'
                        />
                    </>
                    <AppSelectInput
                        teams={teamsList}
                        name='teamId'
                        control={control}
                    />
                    <AppCheckboxInput
                        label='Trophies'
                        trophies={trophiesList}
                        name='trophies'
                        control={control}
                    />
                    <LoadingButton
                        loading={isSubmitting}
                        type='submit'
                        variant='contained'
                        size='large'
                    >
                        <Add />
                        Player
                    </LoadingButton>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PlayerForm;

import { Add } from '@mui/icons-material';
import { Box, Container, FormControl, Stack, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { playerValidatorSchema } from '../../validators/playerValidatorSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import BackButton from '../shared/BackButton';
import LoadingComponent from '../shared/LoadingComponent';
import AppTextInput from '../shared/AppTextInput';
import AppRadioInput from '../shared/AppRadioInput';
import AppSelectInput from '../shared/AppSelectInput';
import AppCheckboxInput from '../shared/AppCheckboxInput';
import { LoadingButton } from '@mui/lab';
import { Player } from '../../models/Player';
import { fetchTeamsAsync } from '../../store/asyncThunks/teamAsyncThunks';
import { fetchTrophiesAsync } from '../../store/asyncThunks/trophyAsyncThunks';
import { addPlayerAsync } from '../../store/asyncThunks/playerAsyncThunk';
import { StatusCode } from '../../models/Enums/StatusCode';
import { useNavigate } from 'react-router-dom';

const PlayerFormAdd = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset: resetForm,
    } = useForm<FieldValues>({
        mode: 'all',
        shouldUnregister: true,
        resolver: yupResolver<any>(playerValidatorSchema),
    });

    const [showSelectList, setShowSelectList] = useState('true');

    const { teamsList, teamsLoaded } = useAppSelector((state) => state.teams);
    const { trophiesList, trophiesLoaded } = useAppSelector(
        (state) => state.trophies
    );

    useEffect(() => {
        dispatch(fetchTeamsAsync());
        dispatch(fetchTrophiesAsync());
    }, [dispatch]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setShowSelectList(e.target.value);
    };

    const onSubmitHandler = async (data: FieldValues) => {
        const player: Player = {
            nickname: data.nickname,
            name: data.name,
            age: data.age,
            nationality: data.nationality,
            isActive: data.isActive,
            trophyIds: data.trophyIds,
            ...(data.isActive && { teamId: data.teamId }),
        };

        try {
            const result = await dispatch(addPlayerAsync(player)).unwrap();

            if (result.statusCode === StatusCode.Created) {
                resetForm({});

                navigate('/players');
            }
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
                <BackButton />
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
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '20px',
                    }}
                >
                    <>
                        <AppTextInput
                            label='Nickname'
                            name='nickname'
                            control={control}
                        />
                        <AppTextInput
                            label='Name'
                            name='name'
                            control={control}
                        />
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
                                onClick={onChangeHandler}
                            />
                        </>
                        {showSelectList === 'true' && (
                            <AppSelectInput
                                teams={teamsList}
                                name='teamId'
                                control={control}
                            />
                        )}
                        <AppCheckboxInput
                            label='Trophies'
                            trophies={trophiesList}
                            name='trophyIds'
                            control={control}
                        />
                    </>
                    <LoadingButton
                        loading={isSubmitting}
                        type='submit'
                        variant='contained'
                        size='large'
                    >
                        <Add /> Player
                    </LoadingButton>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PlayerFormAdd;

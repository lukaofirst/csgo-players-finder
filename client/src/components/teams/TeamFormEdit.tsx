import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Box, Typography, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Team } from '../../models/Team';
import { editTeamAsync, fetchTeamAsync } from '../../store/teamsSlice';
import { teamValidatorSchema } from '../../validators/teamValidatorSchema';
import AppTextInput from '../utils/AppTextInput';
import BackBtn from '../utils/BackBtn';

const TeamFormEdit = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver<any>(teamValidatorSchema),
    });

    const { team } = useAppSelector((state) => state.teams);

    useEffect(() => {
        dispatch(fetchTeamAsync(+id!));
    }, [dispatch, id]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const onSubmitHandler = async (data: FieldValues) => {
        const team: Team = {
            id: data.id,
            name: data.name,
            location: data.location,
            region: data.region,
            foundedYear: data.foundedYear,
        };

        try {
            await dispatch(editTeamAsync(team));
            reset({
                id: '',
                name: '',
                location: '',
                region: '',
                foundedYear: '',
            });
        } catch (error) {
            console.log(error);
        }
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
            <Box
                sx={{
                    mt: 2,
                    mb: 5,
                    display: 'block',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h5' sx={{ mb: 1, color: '#299cdd' }}>
                    Edit a Team
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '500px', margin: '0 auto' }}
                >
                    {team?.id! > 0 && (
                        <>
                            <AppTextInput
                                label='Id'
                                name='id'
                                control={control}
                                val={team?.id}
                                disabled={true}
                            />
                            <AppTextInput
                                label='Name'
                                name='name'
                                control={control}
                                val={team?.name}
                            />
                            <AppTextInput
                                label='Location'
                                name='location'
                                control={control}
                                val={team?.location}
                            />
                            <AppTextInput
                                label='Region'
                                name='region'
                                control={control}
                                val={team?.region}
                            />
                            <AppTextInput
                                type='number'
                                label='Founded Year'
                                name='foundedYear'
                                control={control}
                                val={team?.foundedYear}
                            />
                            <LoadingButton
                                loading={isSubmitting}
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{ my: 2 }}
                            >
                                Update Team
                            </LoadingButton>
                        </>
                    )}
                </FormControl>
            </Box>
        </Container>
    );
};

export default TeamFormEdit;

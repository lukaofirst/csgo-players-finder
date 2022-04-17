import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Box, Typography, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Trophy } from '../../models/Trophy';
import { editTrophyAsync, fetchTrophyAsync } from '../../store/trophiesSlice';
import { trophyValidatorSchema } from '../../validators/trophyValidatorSchema';
import AppRadioInput from '../utils/AppRadioInput';
import AppTextInput from '../utils/AppTextInput';
import BackBtn from '../utils/BackBtn';

const TrophyFormEdit = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm({
        mode: 'all',
        resolver: yupResolver<any>(trophyValidatorSchema),
    });

    const { trophy } = useAppSelector((state) => state.trophies);

    useEffect(() => {
        dispatch(fetchTrophyAsync(+id!));
    }, [dispatch, id]);

    const NavigateBack = () => {
        navigate(-1);
    };

    const onSubmitHandler = async (data: FieldValues) => {
        const trophy: Trophy = {
            id: data.id,
            name: data.name,
            year: data.year,
            isMajor: data.isMajor,
        };

        try {
            await dispatch(editTrophyAsync(trophy));

            reset({
                id: '',
                name: '',
                year: '',
                isMajor: '',
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
                    Edit a Trophy
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '500px', margin: '0 auto' }}
                >
                    {trophy?.id! > 0 && (
                        <>
                            <AppTextInput
                                label='Id'
                                name='id'
                                control={control}
                                val={trophy?.id}
                                disabled={true}
                            />
                            <AppTextInput
                                label='Name'
                                name='name'
                                control={control}
                                val={trophy?.name}
                            />
                            <AppTextInput
                                type='number'
                                label="Title's Year"
                                name='year'
                                control={control}
                                val={trophy?.year}
                            />
                            <AppRadioInput
                                label='Is Major?'
                                name='isMajor'
                                control={control}
                                textposition='center'
                            />
                            <LoadingButton
                                loading={isSubmitting}
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{ my: 2 }}
                            >
                                Update Trophy
                            </LoadingButton>
                        </>
                    )}
                </FormControl>
            </Box>
        </Container>
    );
};

export default TrophyFormEdit;

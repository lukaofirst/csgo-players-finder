import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Container, Box, Typography, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { StatusCode } from '../../models/Enums/StatusCode';
import { Trophy } from '../../models/Trophy';
import {
    fetchTrophyAsync,
    editTrophyAsync,
} from '../../store/asyncThunks/trophyAsyncThunks';
import { resetTrophyState } from '../../store/stateSlices/trophiesSlice';
import { trophyValidatorSchema } from '../../validators/trophyValidatorSchema';
import NavigateActionButtons from '../shared/NavigateActionButtons';
import AppRadioInput from '../shared/AppRadioInput';
import AppTextInput from '../shared/AppTextInput';

const TrophyFormEdit = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset: resetForm,
    } = useForm({
        mode: 'all',
        resolver: yupResolver<any>(trophyValidatorSchema),
    });

    const { trophy } = useAppSelector((state) => state.trophies);

    useEffect(() => {
        dispatch(fetchTrophyAsync(id!));
    }, [dispatch, id]);

    const onSubmitHandler = async (data: FieldValues) => {
        const trophy: Trophy = {
            id: data.id,
            name: data.name,
            year: data.year,
            isMajor: data.isMajor,
        };

        try {
            const result = await dispatch(editTrophyAsync(trophy)).unwrap();

            if (result.statusCode === StatusCode.Success) {
                resetForm({
                    id: '',
                    name: '',
                    year: '',
                    isMajor: '',
                });

                navigate('/trophies');
            }

            dispatch(resetTrophyState());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 2 }}>
            <NavigateActionButtons />
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
                    sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
                >
                    {trophy?.id !== '' && (
                        <>
                            <AppTextInput
                                label='Id'
                                name='id'
                                control={control}
                                val={trophy?.id!}
                                disabled
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

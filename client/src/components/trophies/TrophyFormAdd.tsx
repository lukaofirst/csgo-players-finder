import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import { Container, Box, Typography, FormControl } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/hooks';
import { trophyValidatorSchema } from '../../validators/trophyValidatorSchema';
import AppTextInput from '../shared/AppTextInput';
import AppRadioInput from '../shared/AppRadioInput';
import { LoadingButton } from '@mui/lab';
import { Trophy } from '../../models/Trophy';
import { addTrophyAsync } from '../../store/asyncThunks/trophyAsyncThunks';
import NavigateActionButtons from '../shared/NavigateActionButtons';
import { StatusCode } from '../../models/Enums/StatusCode';
import { useNavigate } from 'react-router-dom';

const TrophyFormAdd = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset: resetForm,
    } = useForm({
        mode: 'all',
        resolver: yupResolver<any>(trophyValidatorSchema),
    });

    const onSubmitHandler = async (data: FieldValues) => {
        const trophy: Trophy = {
            id: null,
            name: data.name,
            year: data.year,
            isMajor: data.isMajor,
        };

        try {
            const result = await dispatch(addTrophyAsync(trophy)).unwrap();

            if (result.statusCode === StatusCode.Created) {
                resetForm();

                navigate('/trophies');
            }
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
                    Add a Trophy
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
                >
                    <AppTextInput label='Name' name='name' control={control} />
                    <AppTextInput
                        type='number'
                        label="Title's Year"
                        name='year'
                        control={control}
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
                        <Add />
                        Trophy
                    </LoadingButton>
                </FormControl>
            </Box>
        </Container>
    );
};

export default TrophyFormAdd;

import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import { Container, Stack, Box, Typography, FormControl } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { trophyValidatorSchema } from '../../validators/trophyValidatorSchema';
import AppTextInput from '../utils/AppTextInput';
import AppRadioInput from '../utils/AppRadioInput';
import BackBtn from '../utils/BackBtn';
import { addTrophyAsync } from '../../store/trophiesSlice';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

const TrophyForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm({
        mode: 'all',
        resolver: yupResolver<any>(trophyValidatorSchema),
    });

    const NavigateBack = () => {
        navigate(-1);
    };

    const onSubmitHandler = async (data: FieldValues) => {
        try {
            await dispatch(addTrophyAsync(JSON.stringify(data)));
            reset();
            toast.success('Trophy added successfully!');
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
                    Add a Trophy
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '500px', margin: '0 auto' }}
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

export default TrophyForm;

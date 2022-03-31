import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Box, Typography, FormControl } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { addTeamAsync } from '../../store/teamsSlice';
import { teamValidatorSchema } from '../../validators/teamValidatorSchema';
import AppTextInput from '../utils/AppTextInput';
import BackBtn from '../utils/BackBtn';

const TeamForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver<any>(teamValidatorSchema),
    });

    const NavigateBack = () => {
        navigate(-1);
    };

    const onSubmitHandler = async (data: FieldValues) => {
        try {
            await dispatch(addTeamAsync(JSON.stringify(data)));
            reset();
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
                    Add a Team
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '500px', margin: '0 auto' }}
                >
                    <AppTextInput label='Name' name='name' control={control} />
                    <AppTextInput
                        label='Location'
                        name='location'
                        control={control}
                    />
                    <AppTextInput
                        label='Region'
                        name='region'
                        control={control}
                    />
                    <AppTextInput
                        type='number'
                        label='Founded Year'
                        name='foundedYear'
                        control={control}
                    />
                    <LoadingButton
                        loading={isSubmitting}
                        type='submit'
                        variant='contained'
                        size='large'
                        sx={{ my: 2 }}
                    >
                        <Add />
                        Team
                    </LoadingButton>
                </FormControl>
            </Box>
        </Container>
    );
};

export default TeamForm;

import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Box, Typography, FormControl } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { StatusCode } from '../../models/Enums/StatusCode';
import { Team } from '../../models/Team';
import { addTeamAsync } from '../../store/asyncThunks/teamAsyncThunks';
import { teamValidatorSchema } from '../../validators/teamValidatorSchema';
import AppTextInput from '../shared/AppTextInput';
import BackButton from '../shared/BackButton';

const TeamFormAdd = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset: resetForm,
    } = useForm<FieldValues>({
        mode: 'all',
        resolver: yupResolver<any>(teamValidatorSchema),
    });

    const onSubmitHandler = async (data: FieldValues) => {
        const team: Team = {
            id: null,
            name: data.name,
            location: data.location,
            region: data.region,
            foundedYear: data.foundedYear,
        };

        try {
            const result = await dispatch(addTeamAsync(team)).unwrap();

            if (result.statusCode === StatusCode.Created) {
                resetForm({});

                navigate('/teams');
            }
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
                    Add a Team
                </Typography>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmitHandler)}
                    sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
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

export default TeamFormAdd;

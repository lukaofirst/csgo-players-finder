import { Add } from '@mui/icons-material';
import {
    Container,
    Stack,
    Box,
    Typography,
    FormControl,
    TextField,
    FormGroup,
    FormControlLabel,
    Button,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../utils/BackBtn';

const TrophyForm = () => {
    const navigate = useNavigate();

    const NavigateBack = () => {
        navigate(-1);
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
                <FormControl sx={{ width: '500px', margin: '0 auto' }}>
                    <TextField variant='outlined' label='Name' sx={{ my: 1 }} />
                    <TextField
                        type='number'
                        variant='outlined'
                        label='Founded Year'
                        sx={{ my: 1 }}
                    />
                    <FormGroup sx={{ mt: 1 }}>
                        <FormLabel component='legend'>Is Major?</FormLabel>
                        <RadioGroup
                            name='IsMajor'
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
                    <Button variant='contained' size='large' sx={{ my: 2 }}>
                        <Add />
                        Trophy
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};

export default TrophyForm;

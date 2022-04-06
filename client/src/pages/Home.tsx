import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import AnchorTag from '../components/utils/AnchorTag';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

const techFront: string[] = [
    'React',
    'TypeScript',
    'Redux (redux toolkit)',
    'Material UI',
    'react-router-dom (v6)',
    'react-hook-form',
    'react-toastify',
    'Axios',
    'Concurrently',
];

const techBack: string[] = [
    '.NET Core 6',
    'Entity Framework Core',
    'AutoMapper',
    'Swagger',
    'SQLite',
];

const Home = () => {
    const [showFront, setShowFront] = useState(false);
    const [showBack, setShowBack] = useState(false);

    const btnFrontHandler = () => {
        setShowFront((prevState) => !prevState);
    };

    const btnBackHandler = () => {
        setShowBack((prevState) => !prevState);
    };

    return (
        <Container maxWidth='lg' sx={{ mt: 5 }}>
            <Paper elevation={8} sx={{ p: 2.5 }}>
                <Typography variant='h2' textAlign='center'>
                    CSGOPlayersFinder
                </Typography>
                <Typography variant='subtitle1' textAlign='center' mt={2}>
                    This project was made for educational purposes
                </Typography>
                <Typography variant='subtitle1' textAlign='center' mt={2}>
                    All the info was extracted from{' '}
                    <AnchorTag url='https://hltv.org'>HLTV.org</AnchorTag> and{' '}
                    <AnchorTag url='https://liquipedia.net/counterstrike/Main_Page'>
                        Liquipedia.net
                    </AnchorTag>
                </Typography>
                <Typography variant='h6' textAlign='center' sx={{ m: 5 }}>
                    Technologies and Concepts applied to this project
                </Typography>
                <Stack direction='row' justifyContent='center' spacing={10}>
                    <Box textAlign='center'>
                        <Button
                            onClick={btnFrontHandler}
                            variant='outlined'
                            sx={{ color: '#299cdd', mb: 2 }}
                        >
                            <ComputerIcon sx={{ margin: '0 5px 5px 0' }} />
                            Front-end
                        </Button>
                        <Stack direction='column'>
                            {showFront &&
                                techFront.map((item, index) => (
                                    <Typography
                                        variant='subtitle1'
                                        textAlign='center'
                                        paddingY={1}
                                        key={index}
                                    >
                                        {item}
                                    </Typography>
                                ))}
                        </Stack>
                    </Box>
                    <Box textAlign='center'>
                        <Button
                            onClick={btnBackHandler}
                            variant='outlined'
                            sx={{ color: '#299cdd', mb: 2 }}
                        >
                            <SettingsIcon sx={{ margin: '0 5px 5px 0' }} />
                            Back-end
                        </Button>
                        <Stack direction='column'>
                            {showBack &&
                                techBack.map((item, index) => (
                                    <Typography
                                        variant='subtitle1'
                                        textAlign='center'
                                        paddingY={1}
                                        key={index}
                                    >
                                        {item}
                                    </Typography>
                                ))}
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Home;

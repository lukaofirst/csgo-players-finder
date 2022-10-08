import { Typography, Stack, Box, Button } from '@mui/material';
import { useState } from 'react';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingsIcon from '@mui/icons-material/Settings';

interface IUsedTechsAndConcepts {
    isMobile: boolean;
}

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
    'AutoMapper',
    'Swagger',
    'MongoDB',
    'Clean Architecture',
];

const UsedTechsAndConcepts = ({ isMobile }: IUsedTechsAndConcepts) => {
    const [showFront, setShowFront] = useState<boolean>(false);
    const [showBack, setShowBack] = useState<boolean>(false);

    const handleBtnFront = () => {
        setShowFront((prevState) => !prevState);
    };

    const handleBtnBack = () => {
        setShowBack((prevState) => !prevState);
    };

    return (
        <>
            <Typography variant='h6' textAlign='center' sx={{ m: 5 }}>
                Technologies and Concepts applied to this project
            </Typography>
            <Stack
                direction='row'
                justifyContent='center'
                spacing={isMobile ? 2 : 8}
            >
                <Box textAlign='center'>
                    <Button
                        onClick={handleBtnFront}
                        variant='outlined'
                        sx={{
                            color: '#299cdd',
                            mb: 2,
                        }}
                    >
                        {!isMobile && (
                            <ComputerIcon sx={{ margin: '0 5px 5px 0' }} />
                        )}
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
                        onClick={handleBtnBack}
                        variant='outlined'
                        sx={{
                            color: '#299cdd',
                            mb: 2,
                        }}
                    >
                        {!isMobile && (
                            <SettingsIcon sx={{ margin: '0 5px 5px 0' }} />
                        )}
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
        </>
    );
};

export default UsedTechsAndConcepts;

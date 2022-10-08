import { Typography } from '@mui/material';

interface IGreeting {
    isMobile: boolean;
}

const Greeting = ({ isMobile }: IGreeting) => {
    return (
        <>
            <Typography variant={isMobile ? 'h4' : 'h2'} textAlign='center'>
                CSGOPlayersFinder
            </Typography>
            <Typography variant='subtitle1' textAlign='center' mt={2}>
                This project was made for educational purposes
            </Typography>
        </>
    );
};

export default Greeting;

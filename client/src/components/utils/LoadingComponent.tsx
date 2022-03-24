import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

interface Props {
    message: string;
}

const LoadingComponent = ({ message }: Props) => {
    return (
        <Backdrop open={true} invisible={true}>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
                flexDirection='column'
            >
                <CircularProgress size={125} color='primary' />
                <Typography variant='h5' marginTop={10} textAlign='center'>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default LoadingComponent;

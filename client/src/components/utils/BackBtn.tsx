import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackBtn = () => {
    return (
        <Button
            variant='outlined'
            sx={{
                width: '100px',
                height: '40px',
                borderRadius: '5px',
                color: '#299cdd',
            }}
        >
            <ArrowBackIcon />
            Back
        </Button>
    );
};

export default BackBtn;

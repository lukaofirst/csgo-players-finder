import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const NavigateBack = () => {
        navigate(-1);
    };

    return (
        <Button
            variant='outlined'
            sx={{
                width: '100px',
                height: '40px',
                borderRadius: '5px',
                color: '#299cdd',
            }}
            onClick={NavigateBack}
        >
            <ArrowBackIcon />
            Back
        </Button>
    );
};

export default BackButton;

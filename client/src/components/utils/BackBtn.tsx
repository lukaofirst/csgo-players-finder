import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
    onClick?: () => void;
}

const BackBtn = ({ onClick }: Props) => {
    return (
        <Button
            variant='outlined'
            sx={{
                width: '100px',
                height: '40px',
                borderRadius: '5px',
                color: '#299cdd',
            }}
            onClick={onClick}
        >
            <ArrowBackIcon />
            Back
        </Button>
    );
};

export default BackBtn;

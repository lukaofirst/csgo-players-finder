import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

interface Props {
    name: string;
}

const ActionBtn = ({ name }: Props) => {
    return (
        <Button
            variant='contained'
            color='success'
            sx={{
                width: '120px',
                height: '50px',
            }}
        >
            <AddIcon />
            {name}
        </Button>
    );
};

export default ActionBtn;

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

interface Props {
    name: string;
    onClick?: () => void;
}

const ActionBtn = ({ name, onClick: onClickHandler }: Props) => {
    return (
        <Button
            variant='contained'
            color='success'
            size='large'
            onClick={onClickHandler}
        >
            <AddIcon />
            {name}
        </Button>
    );
};

export default ActionBtn;

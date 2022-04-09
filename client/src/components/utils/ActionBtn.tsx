import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

interface Props {
    name: string;
    variant: 'contained' | 'outlined';
    color: 'success' | 'error';
    icon: 'add' | 'remove';
    onClick?: () => void;
}

const ActionBtn = ({
    name,
    color,
    icon,
    variant,
    onClick: onClickHandler,
}: Props) => {
    return (
        <Button
            variant={variant}
            color={color}
            size='large'
            onClick={onClickHandler}
        >
            {icon === 'add' ? <AddIcon /> : <DeleteIcon />}
            {name}
        </Button>
    );
};

export default ActionBtn;

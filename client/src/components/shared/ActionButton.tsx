import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

interface Props {
    name: string;
    variant: 'contained' | 'outlined';
    color: 'success' | 'error' | 'warning';
    icon: 'add' | 'remove' | 'edit';
    onClick?: () => void;
}

const ActionButton = ({
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
            {icon === 'add' && <AddIcon />}
            {icon === 'remove' && <DeleteIcon />}
            {icon === 'edit' && <EditIcon />}
            {name}
        </Button>
    );
};

export default ActionButton;

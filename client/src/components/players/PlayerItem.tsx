import { Button, Paper, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Player } from '../../models/Player';
import { useNavigate } from 'react-router-dom';

interface IPlayerItem {
    item: Player;
}

const PlayerItem = ({ item }: IPlayerItem) => {
    const navigate = useNavigate();

    const { nickname, name, age, nationality, id } = item;

    const onClickHandler = (id: string) => {
        navigate(`${id}`);
    };

    return (
        <Paper
            elevation={2}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '300px',
                padding: '10px',
                margin: '30px',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography variant='h6' my={1} color='#299cdd'>
                {nickname}
            </Typography>
            <Typography variant='body1' my={1}>
                Name: {name}
            </Typography>
            <Typography variant='body1' my={1}>
                Age: {age} years
            </Typography>
            <Typography variant='body1' my={1}>
                Nationality: {nationality}
            </Typography>
            <Button
                variant='outlined'
                sx={{ m: 2, color: '#299cdd' }}
                onClick={() => onClickHandler(id!)}
            >
                <InfoIcon sx={{ marginRight: '5px' }} /> More Info
            </Button>
        </Paper>
    );
};

export default PlayerItem;

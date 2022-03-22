import { Button, Paper, Typography } from '@mui/material';
import { Player } from '../../pages/Players';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
    item: Player;
}

const PlayerItem = ({ item }: Props) => {
    const { nickname, name, age, nationality, team } = item;

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
            <Typography variant='body1' my={1}>
                Team: {team}
            </Typography>
            <Button variant='outlined' sx={{ m: 2, color: '#299cdd' }}>
                <InfoIcon sx={{ marginRight: '5px' }} /> More Info
            </Button>
        </Paper>
    );
};

export default PlayerItem;

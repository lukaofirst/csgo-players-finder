import { Button, Paper, Typography } from '@mui/material';
import { Team } from '../../models/Team';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

interface ITeamItem {
    item: Team;
}

const TeamItem = ({ item }: ITeamItem) => {
    const navigate = useNavigate();

    const { name, location, region, foundedYear, id } = item;

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
                {name}
            </Typography>
            <Typography variant='body1' my={1}>
                Location: {location}
            </Typography>
            <Typography variant='body1' my={1}>
                Region: {region}
            </Typography>
            <Typography variant='body1' my={1}>
                Founded Year: {foundedYear}
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

export default TeamItem;

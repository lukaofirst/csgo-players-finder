import { Paper, Typography } from '@mui/material';
import { Team } from '../../models/Team';

interface Props {
    item: Team;
}

const TeamItem = ({ item }: Props) => {
    const { name, location, region, foundedYear } = item;

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
        </Paper>
    );
};

export default TeamItem;

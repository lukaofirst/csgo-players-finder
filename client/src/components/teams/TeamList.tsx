import { Stack } from '@mui/material';
import { Team } from '../../models/Team';
import TeamItem from './TeamItem';

interface ITeamList {
    items: Team[];
}

const TeamList = ({ items }: ITeamList) => {
    return (
        <Stack
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            flexWrap='wrap'
        >
            {items.map((item) => (
                <TeamItem key={item.id} item={item} />
            ))}
        </Stack>
    );
};

export default TeamList;

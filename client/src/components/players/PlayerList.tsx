import { Stack } from '@mui/material';
import { Player } from '../../pages/Players';
import PlayerItem from './PlayerItem';

interface Props {
    items: Player[];
}

const PlayerList = ({ items }: Props) => {
    return (
        <Stack
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            flexWrap='wrap'
        >
            {items.map((item) => (
                <PlayerItem key={item.id} item={item} />
            ))}
        </Stack>
    );
};

export default PlayerList;

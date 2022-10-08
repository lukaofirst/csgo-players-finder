import { Stack } from '@mui/material';
import { Player } from '../../models/Player';
import PlayerItem from './PlayerItem';

interface IPlayerList {
    items: Player[];
}

const PlayerList = ({ items }: IPlayerList) => {
    return (
        <Stack
            direction='row'
            justifyContent='space-around'
            alignItems='center'
            flexWrap='wrap'
        >
            {items.map((item) => (
                <PlayerItem key={item.id!} item={item} />
            ))}
        </Stack>
    );
};

export default PlayerList;

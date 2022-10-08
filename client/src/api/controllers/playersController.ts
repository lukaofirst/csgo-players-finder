import { Player } from '../../models/Player';
import requests from '../setupRequests';

const PlayersController = {
    list: () => requests.get('players'),
    getById: (id: string) => requests.get(`players/${id}`),
    add: (player: Player) => requests.post('players', player),
    edit: (player: Player) => requests.put('players', player),
    delete: (id: string) => requests.delete(`players/${id}`),
};

export default PlayersController;

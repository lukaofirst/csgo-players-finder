import { Team } from '../../models/Team';
import requests from '../setupRequests';

const PlayersController = {
    list: () => requests.get('teams'),
    getById: (id: string) => requests.get(`teams/${id}`),
    add: (team: Team) => requests.post('teams', team),
    edit: (team: Team) => requests.put('teams', team),
    delete: (id: string) => requests.delete(`teams/${id}`),
};

export default PlayersController;

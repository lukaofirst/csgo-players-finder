import { Trophy } from '../../models/Trophy';
import requests from '../setupRequests';

const trophiesController = {
    list: () => requests.get('trophies'),
    getById: (id: string) => requests.get(`trophies/${id}`),
    add: (trophy: Trophy) => requests.post('trophies', trophy),
    edit: (trophy: Trophy) => requests.put('trophies', trophy),
    delete: (id: string) => requests.delete(`trophies/${id}`),
};

export default trophiesController;

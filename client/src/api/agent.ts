import axios, { AxiosResponse } from 'axios';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { Trophy } from '../models/Trophy';

axios.defaults.baseURL = 'http://localhost:5027/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Players = {
    list: () => requests.get('players'),
    add: (player: Player) => requests.post('players', player),
    delete: (id: number) => requests.delete(`players/${id}`),
};

const Teams = {
    list: () => requests.get('teams'),
    add: (team: Team) => requests.post('teams', team),
    delete: (id: number) => requests.delete(`teams/${id}`),
};

const Trophies = {
    list: () => requests.get('trophies'),
    add: (trophy: Trophy) => requests.post('trophies', trophy),
    delete: (id: number) => requests.delete(`trophies/${id}`),
};

const agent = {
    Players,
    Teams,
    Trophies,
};

export default agent;

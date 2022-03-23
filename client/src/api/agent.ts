import axios, { AxiosResponse } from 'axios';
import { Player } from '../models/Player';

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

const agent = {
    Players,
};

export default agent;

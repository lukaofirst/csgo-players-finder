import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { Trophy } from '../models/Trophy';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1500));

axios.defaults.baseURL = 'http://localhost:5027/api/';

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response!;
        switch (status) {
            case 400:
                toast.error(data.title);
                break;
            case 404:
                toast.error(data.title);
                break;
            case 500:
                toast.error(data.title);
                break;
            default:
                break;
        }
    }
);

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

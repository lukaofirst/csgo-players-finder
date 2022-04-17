import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { PlayerDTO } from '../models/DTO/PlayerDTO';
import { Team } from '../models/Team';
import { Trophy } from '../models/Trophy';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 300));

axios.defaults.baseURL = 'http://localhost:5027/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(
    async (response) => {
        await sleep();
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response!;
        switch (status) {
            case 400:
                console.log(error.response);
                toast.error(data.title);
                break;
            case 404:
                console.log(error.response);
                toast.error(data.title);
                break;
            case 409:
                console.log(error.response);
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
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Players = {
    list: () => requests.get('players'),
    getById: (id: number) => requests.get(`players/${id}`),
    add: (player: PlayerDTO) => requests.post('players', player),
    edit: (player: PlayerDTO) => requests.put('players', player),
    delete: (id: number) => requests.delete(`players/${id}`),
};

const Teams = {
    list: () => requests.get('teams'),
    getById: (id: number) => requests.get(`teams/${id}`),
    add: (team: Team) => requests.post('teams', team),
    edit: (team: Team) => requests.put('teams', team),
    delete: (id: number) => requests.delete(`teams/${id}`),
};

const Trophies = {
    list: () => requests.get('trophies'),
    getById: (id: number) => requests.get(`trophies/${id}`),
    add: (trophy: Trophy) => requests.post('trophies', trophy),
    edit: (trophy: Trophy) => requests.put('trophies', trophy),
    delete: (id: number) => requests.delete(`trophies/${id}`),
};

const agent = {
    Players,
    Teams,
    Trophies,
};

export default agent;

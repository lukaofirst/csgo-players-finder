import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../models/Responses/ErrorResponse';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 300));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(
    async (response) => {
        if (process.env.NODE_ENV === 'development') await sleep();

        return response;
    },
    (error: AxiosError) => {
        const { message, statusCode } = error.response!.data as ErrorResponse;

        switch (statusCode) {
            case 400:
                console.log(error.response!.data);
                toast.error(message);
                break;
            case 404:
                console.log(error.response!.data);
                toast.error(message);
                break;
            case 409:
                console.log(error.response!.data);
                toast.error(message);
                break;
            case 500:
                toast.error(message);
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

export default requests;

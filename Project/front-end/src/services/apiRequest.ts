import axios from 'axios'

const handleError = (error: any ) => {

    const errorMessage = {message: '', fieldError:{}};

    const {response} = error;

    if(response?.status && response?.status === 401) {
        alert("[401] without permission");
        localStorage.removeItem('@afroHome:token')
        localStorage.removeItem('@afroHome:user')

        const {protocol, host } = window.location;
        window.location.replace(`${protocol}//${host}`);
    }

    return Promise.reject({ ...error, errorMessage});
};

const handleResponse = (response: any) => {
    return response
}



export const nuvannApi = axios.create({
    baseURL: 'http://localhost:8080'
});

nuvannApi.interceptors.response.use(handleResponse, handleError);

nuvannApi.interceptors.request.use(
    async (config: any) => {
        const TOKEN = localStorage.getItem('@nuvann:token');
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: TOKEN ? `Bearer ${TOKEN}`: ''
        };

        return config;
    },
    (error:any) => {
        Promise.reject(error);
    },
)
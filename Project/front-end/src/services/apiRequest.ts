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



export const afroHomeApi = axios.create({
    baseURL: 'https://trabalho-de-conclusao-de-curso.vercel.app/api'
});

afroHomeApi.interceptors.response.use(handleResponse, handleError);

afroHomeApi.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (config: any) => {
        const TOKEN = localStorage.getItem('@nuvann:token');
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: TOKEN ? `Bearer ${TOKEN}`: ''
        };

        return config;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error:any) => {
        Promise.reject(error);
    },
)
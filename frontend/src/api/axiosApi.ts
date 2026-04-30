import axios from 'axios';
import { store } from '../app/store';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosApi.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.user.user?.token;

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});

export default axiosApi;
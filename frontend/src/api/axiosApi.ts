import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosApi.interceptors.request.use((config) => {
    return config;
});

export default axiosApi;
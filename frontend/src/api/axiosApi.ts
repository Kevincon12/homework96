import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosApi.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (user?.token) {
        config.headers.Authorization = user.token;
    }

    return config;
});

export default axiosApi;
import axios from 'axios';
import { BASE_URL } from '../shared/contants'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const originalRequest = error.config

        if (error.response.status === 401 && originalRequest._retry) {
            window.location.replace(`${process.env.PUBLIC_URL}/`)
            return Promise.reject(error)
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
           
        }
        return Promise.reject(error)
    }
)


export default instance;

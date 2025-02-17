import axios from 'axios';

import { useAppSelector} from './dispatch';


const axiosInstance = () => {

    const login = useAppSelector((state) => state.login);
    
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.0.105:8085/', // Cambia esto por la URL base de tu API
    });
    
// Interceptor para agregar el token Bearer a cada solicitud

    axiosInstance.interceptors.request.use(
        (config) => {
            // const token = localStorage.getItem('token'); // O de donde estés almacenando el token
            if (login.isLogin && login.token) {
                config.headers['Authorization'] = `Bearer ${login.token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosInstance;
}

export default axiosInstance;
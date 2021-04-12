import axios from 'axios';
import { baseUrl } from './constant';


export const loginAPI = data => axios.post(`${baseUrl}/auth/login/`, data);

export const logoutAPI = () => axios.post(`${baseUrl}/auth/logout/`);
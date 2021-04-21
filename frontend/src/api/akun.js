import axios from 'axios';
import { baseUrl } from './constant';


export const registerAkunAPI = data => 
    axios.post(`${baseUrl}/auth/accounts/registration/`, data);

export const getDivisiAPI = () => axios.get(`${baseUrl}/divisi/`);
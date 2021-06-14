import axios from 'axios';
import { baseUrl } from './constant';

export const getNotifAPI = () => axios.get(`${baseUrl}/notification/`);
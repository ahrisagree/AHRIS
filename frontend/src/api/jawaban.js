import axios from 'axios';
import { baseUrl } from './constant';

export const postJawabanAPI = data => axios.post(`${baseUrl}/evaluation/jawaban/`, data);
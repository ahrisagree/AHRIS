import axios from 'axios';
import { baseUrl } from './constant';


export const getKategoriAPI = () => 
    axios.get(`${baseUrl}/evaluation/pertanyaan/kategori/`);

export const postPaketPertanyaanAPI = data => 
    axios.post(`${baseUrl}/evaluation/pertanyaan/`, data);
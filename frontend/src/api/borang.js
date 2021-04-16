import axios from 'axios';
import { baseUrl } from './constant';


export const getKategoriAPI = () => 
    axios.get(`${baseUrl}/evaluation/pertanyaan/kategori/`);

export const postPaketPertanyaanAPI = data => 
    axios.post(`${baseUrl}/evaluation/pertanyaan/`, data);

export const getListPaketPertanyaan = query => {
    const queryAvailable = ['search', 'jenis', 'kategori', 'disablepagination'];
    let formatedQuery = ""
    queryAvailable.forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/evaluation/pertanyaan/?${formatedQuery}`);
}
import axios from 'axios';
import { baseUrl } from './constant';


export const getKategoriAPI = () => 
    axios.get(`${baseUrl}/evaluation/pertanyaan/kategori/`);

export const postPaketPertanyaanAPI = data => 
    axios.post(`${baseUrl}/evaluation/pertanyaan/`, data);

export const editPaketPertanyaanAPI = (id, data) => 
    axios.put(`${baseUrl}/evaluation/pertanyaan/${id}/`, data);

export const getListPaketPertanyaanAPI = query => {
    // const queryAvailable = ['search', 'jenis', 'kategori', 'disablepagination'];
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/evaluation/pertanyaan/?${formatedQuery}`);
}

export const getPaketPertanyaanAPI = id =>
    axios.get(`${baseUrl}/evaluation/pertanyaan/${id}/`);

export const deletePaketPertanyaanAPI = id =>
    axios.delete(`${baseUrl}/evaluation/pertanyaan/${id}/`);
    
export const getPaketPertanyaan = id =>
    axios.get(`${baseUrl}/evaluation/pertanyaan/${id}/`);

export const getListAssignment = query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/evaluation/assign/?${formatedQuery}`);
}

export const getDetailAssignment = (id, data) => {
    return axios.get(`${baseUrl}/evaluation/assign/${id}/`, data);

}

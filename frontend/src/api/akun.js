import axios from 'axios';
import { baseUrl } from './constant';

export const registerAkunAPI = data => 
    axios.post(`${baseUrl}/auth/accounts/registration/`, data);

export const getDivisiAPI = () => axios.get(`${baseUrl}/divisi/`);

export const getListDaftarKaryawan= query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/user/?${formatedQuery}`);
}

export const getKaryawan = id =>
    axios.get(`${baseUrl}/user/${id}/`);

export const editUser = (id, data) => 
    axios.patch(`${baseUrl}/user/${id}/`, data)

export const deleteKaryawanAPI = id =>
    axios.delete(`${baseUrl}/user/${id}/`);

import axios from 'axios';
import { baseUrl } from './constant';

export const buatLogAPI = data => 
    axios.post(`${baseUrl}/log/`, data);

export const buatPresensiAPI = data => 
    axios.post(`${baseUrl}/log/presensi/`, data);

export const getListLog = query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/log/?${formatedQuery}`);
}

export const getListPresensi = query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/log/presensi/?${formatedQuery}`);
}

export const editLogAPI = (id, data) => 
    axios.patch(`${baseUrl}/log/${id}/`, data);

export const getLog = id =>
    axios.get(`${baseUrl}/log/${id}/`);

export const deleteLogAPI = id =>
    axios.delete(`${baseUrl}/log/${id}/`);



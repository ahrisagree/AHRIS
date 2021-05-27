import axios from 'axios';
import { baseUrl } from './constant';

export const getListGaji= query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/gaji/?${formatedQuery}`);
}

export const editGaji = (id, data) => 
    axios.patch(`${baseUrl}/gaji/${id}/`, data)

export const getGaji = id => 
    axios.get(`${baseUrl}/gaji/${id}/`);
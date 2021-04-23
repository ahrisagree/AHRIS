import axios from 'axios';
import { baseUrl } from './constant';

export const buatLogAPI = data => 
    axios.post(`${baseUrl}/log/`, data);

export const getListLog= query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/log/?${formatedQuery}`);
}


import axios from 'axios';
import { baseUrl } from './constant';

export const getSumScoringAPI = (idDinilai, idPaket, periode) => 
    axios.get(`${baseUrl}/evaluation/assign/score/${idDinilai}/${idPaket}/${periode}`);

export const postHasilPerformaAPI = data => 
    axios.post(`${baseUrl}/evaluation/result/`, data)

export const getListHasilPerforma =  data => {
    return axios.get(`${baseUrl}/evaluation/result/`, data);

}
export const getDetailHasilPerforma = (id, data) => {
    return axios.get(`${baseUrl}/evaluation/result/${id}/`, data);

}
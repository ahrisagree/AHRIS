import axios from 'axios';
import { baseUrl } from './constant';

export const getSumScoringAPI = (idDinilai, idPaket, periode) => 
    axios.get(`${baseUrl}/evaluation/assign/score/${idDinilai}/${idPaket}/${periode}`);

export const postHasilPerformaAPI = data => 
    axios.post(`${baseUrl}/evaluation/result/`, data)

export const getListHasilPerforma =  query => {
    let formatedQuery = ""
    Object.keys(query).forEach(qkey=>formatedQuery+=query[qkey]?`${qkey}=${query[qkey]}&`:'');
    return axios.get(`${baseUrl}/evaluation/result/`);

}
export const getDetailHasilPerforma = (id) => {
    return axios.get(`${baseUrl}/evaluation/result/${id}/`);

}

export const postEvaluasiDiri = data => 
    axios.post(`${baseUrl}/evaluation/result/evaluasi-diri/`, data);

// export const deleteEvaluasiDiriAPI = id =>
//     axios.delete(`${baseUrl}/evaluation/result/${id}/`);

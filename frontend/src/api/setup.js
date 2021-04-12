import axios from "axios";
// import store from "../store";

// axios.interceptors.request.use(config => {
//   // Do something before request is sent
//   if (store == null) return config;

// //     console.log("axios configured", store.getState())
//   const {token} = store.getState().auth
//   if (token) Object.assign(config, { headers: { Authorization: `Token ${token}` } });
//   return config;
// });
export const setupAuthToken = (token) => {
  console.log("axios configured", token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
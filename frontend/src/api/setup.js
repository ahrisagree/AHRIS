import axios from "axios";
import { push } from "connected-react-router";
import { setTokenError } from "store/auth";
// import store from "../store";

// axios.interceptors.request.use(config => {
//   // Do something before request is sent
//   if (store == null) return config;

// //     console.log("axios configured", store.getState())
//   const {token} = store.getState().auth
//   if (token) Object.assign(config, { headers: { Authorization: `Token ${token}` } });
//   return config;
// });

export const setupAuthTokenMiddleware = store => next => action => {
  // console.log(action)
  if (['persist/REHYDRATE', 'auth/login/fulfilled'].includes(action.type)) {
    const token = action.payload?.token;
    console.log("axios configured", token)
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
    axios.interceptors.response.use(null, err=>{
      if (err.response && err.response.status === 401) {
        delete axios.defaults.headers.common['Authorization']
        store.dispatch(dispatch=>{
          dispatch(setTokenError(`${err.response.statusText}: ${err.response.data.detail}`));
          dispatch(push('/login'));
        })
      }
      return Promise.reject(err);
    });
  } 

  // continue processing this action
  return next(action);
}

export const setupAuthToken = (token) => {
  if (token) {
    console.log("axios configured", token)
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
    window.location.href = "/login";
  }
  

  // axios.interceptors.response.use(null, err=>{
  //   console.log("HAI", err.response.status)
  //   console.log(err.response && err.response.status === 401)
  //   if (err.response && err.response.status === 401) {
  //     console.log("HALO")
  //     console.error(err.response.statusText, err.response.data.detail)
  //     useDis
  //     store.dispatch(()=>{
  //       setTokenError(`${err.response.statusText}: ${err.response.data.detail}`);
  //       logoutThunk();
  //       push('/login');
  //     })
  //   }
  // })
}
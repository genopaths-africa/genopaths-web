import { ILogin } from '../interfaces';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(' process.env.REACT_APP_API_BASE_URL:',  process.env);

/*
* Get axios instance
*/
export const getAxios = (token?: string) => {
  const tokenHeader = token ? {'Authorization': `Bearer ${token}`} : {'Authorization': ""}; 
  const axiosInst = axios.create({
    baseURL: API_BASE_URL + '/',
    headers: {
      'Content-Type': 'application/json',
      ...tokenHeader
    }
  });

  axiosInst.interceptors.request.use(function (request: any) {
    console.debug(request);
    return request;
  }, function (error: any) {
    return Promise.reject(error);
  });

  return axiosInst;
}

/*
* Authenticate user
*
* @param string email user's email address
* @param string password user's password
*
* @return Promise
*/
export const authenticateUser = (email: string, password: string) => {
  return getAxios().post('/auth/login',{
    username: email, 
    password
  });
}
// utils包---工具包
import axios from 'axios'
const axiosInstance = axios.create({
    //前后端分离必须为http，前端自己用mock模拟必须为https
    baseURL:'http://localhost',
    timeout:5000,
})
axiosInstance.interceptors.request.use(function(config){
    return config;
},function(error){
    return Promise.reject(error);
})
axiosInstance.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error);
})

export default axiosInstance
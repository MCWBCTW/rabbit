//二次封装axios
import axios from "axios";
 
//创建一个实例
const request = axios.create({
  baseURL: "", // 基础路径
  timeout: 12000,// 请求超时时间
});
 
//拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
 
request.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
 
export default request;
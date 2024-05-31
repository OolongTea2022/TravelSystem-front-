import axios from 'axios'

//创建一个axios对象出来
const request = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
});

//request拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    return config;
}, error => {
    return Promise.reject(error)
});

//response拦截器
request.interceptors.response.use(
    response=>{
        let res;
        res = response.data;

        if(typeof res === 'string'){
            res = res ? JSON.parse(res) : res;
        }
        return res;
    },
    error => {
        console.log('err' + error);
        return Promise.reject(error);
})

export default request;


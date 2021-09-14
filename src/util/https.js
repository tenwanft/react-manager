import axios from "axios";
const BASE_URL = 'http://www.qqlykm.cn/api/'
// qqlykm.cn/api/phone/phone.php?phone=15677246297
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    // withCredentials: true  //携带cookie
});

// 请求之前的拦截器
service.interceptors.request.use((config) => {
    //token带入请求头,即如果你有任何需要带入公共请求头的东西,都可以写在这里
    // const token = window.localStorage.getItem('access_token')
    // if(token){
    //     config.headers['token'] = token
    // }
    return config;
},(error)=>{
    // 如果请求失败，服务返回错误码而不是状态码,此时我应该要做的操作
    console.log(error,'请求error')
    return Promise.reject(error)
});


// 数据返回拦截器
service.interceptors.response.use((config)=>{
    //这个地方是请求成功后,但是我需要在这里对一些状态码做一些公共的操作,用这个
    console.log(config,'返回')
    return config
},(error)=>{
    // 请求返回错误码时候进行抛出或者拦截的统一处理
    console.log(error,'返回error')
    return Promise.reject(error);
})

export {
    service
}

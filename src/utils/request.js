import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
// 根据目前是开发环境还是生产环境来配置不同的baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({
    baseURL,
    timeout: 5000
});

// 拦截器

// 请求拦截器
request.interceptors.request.use(config => {
    // 在发送请求之前做些什么

    // TODO : 如果有token,就把token放到请求头中(请求头的key是Authorization)这里我们选择的方式是通过pinia管理数据 通过pinia获取token
    const { userInfo } = useUserStore();
    if (userInfo.token) {
        config.headers.Authorization = 'Bearer ' + userInfo.token;
        console.log(config.headers.Authorization);
    }
    return config;
}
    , error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(response => {
    // 对响应数据做点什么

    // 如果返回值的code是401直接跳转到登录页面
    if (response.data.code === 401) {
        window.location.href = '/login';
    }

    return response;
}
    , error => {
        // TODO : 跳出错误提示,提示用户
        ElMessage({
            type: 'warning',
            message: error.response.data.msg,
        })
        return Promise.reject(error);
    }
);

export default request;
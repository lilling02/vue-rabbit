// 用户相关的api
import request from '@/utils/request'

/**
 * @description 发送 POST 请求到登录 API.
 * @param {Object} data - 包含账号和密码的对象,用于进行登录验证.
 * @param {string} data.account - 用户名或账号.
 * @param {string} data.password - 密码.
 * @returns {Promise} 一个 Promise 对象,该对象在服务器响应后解析为相应数据.
 */
export const loginApi = (data) => {
    return request({ url: "/login", method: "post", data })
}

// 猜你喜欢的接口
export const getLikeListAPI = ({ limit = 4 }) => {
    return request({
        url: '/goods/relevant',
        params: {
            limit
        }
    })
}
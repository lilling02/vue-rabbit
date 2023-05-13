import request from "@/utils/request";

// 获取category列表
export const getCategoryAPI = (id) => {
    return request({ url: `/category`, params: { id }, method: 'get' })
}
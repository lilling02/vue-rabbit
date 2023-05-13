import request from "@/utils/request";

// 获取category列表
export const getCategoryAPI = (id) => {
    return request({ url: `/category`, params: { id }, method: 'get' })
}

/**
 * @returns {*}
 * @description: 获取轮播图
 * @param {*}
 */
export function getBannerAPI(params = {}) {
    let { distributionSite = "1" } = params
    return request({ url: "/home/banner", params: { distributionSite }, method: "get" })
}
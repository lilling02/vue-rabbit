import request from "@/utils/request"

/**
 * @returns {*}
 * @description: 获取分类
 * @param {*}
 */

export function getCategoryAPI() {
    return request({ url: "/home/category/head", method: "get" })
}

/**
 * @returns {*}
 * @description: 获取轮播图
 * @param {*}
 */
export function getBannerAPI() {
    return request({ url: "/home/banner", method: "get" })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return request({
        url: '/home/new'
    })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findHotAPI = () => {
    return request({
        url: '/home/hot',
        method: 'get'
    })
}
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


/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
    return request({
        url: '/category/sub/filter',
        params: {
            id
        },
        method: 'get'
    })
}

/**
 * @description: 获取导航数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
    return request({
        url: '/category/goods/temporary',
        method: 'POST',
        data
    })
}


import request from '@/utils/request'

/**
 *
 * @param {string} id - The ID of the goods to fetch details for.
 * @returns {*} - The detail information of the goods.
 * @throws {Error} - if `id` is not provided.
 */
export const getDetail = (id) => {
    return request({
        url: '/goods',
        params: {
            id
        }
    })
}
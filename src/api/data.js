// 有关接口请求

import axios from "axios";
import store from '../store'
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

export const baseUrl = '/api'
// export const baseUrl = 'https://room_dev_client.pacificsilkroad.cn/api-service'


// 向指定的 url 提交数据表单
export const postForm = (requestUrl, params, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
        headers: {
            token: TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response', res);
        callback(res);
    })
}

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    nprogress.start();
    store.commit('getToken')
    const TokenValue = store.state.user.token
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get',
        headers: {
            token: TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getForm 的 response', res);
        callback(res)
    })
}


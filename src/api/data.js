// 有关接口请求

import axios from "axios";
import store from '../store'
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

export const baseUrl = '/api'
// export const baseUrl = 'https://room_dev_client.pacificsilkroad.cn/api-service'


// 向指定的 url 提交数据表单
export const postForm = (requestUrl, params, This, callback) => {
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
        if (res.code === 0) { callback(res) }
        else if(res.code === 403){
            console.log(This)
            This.$message({
                message: "请重新登录",
                type: 'error'
            });
        }
        else {
            This.$message({
                message: res.msg,
                type: 'error'
            });
        }
    })
}

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, This, callback) => {
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
        if (res.code === 0) { callback(res) }
        else if(res.code === 403){
            This.$message({
                message: "请登录",
                type: 'error'
            });
        }
        else {
            This.$message({
                message: res.msg,
                type: 'error'
            });
        }
    })
}

// 提取字段种类
export const GetType = (words) => {
    let Result = words.split('&');
    return Result[0];
}

// 将不同模板的Item合并到同一个数组中，Item 数据、List 数组、Len1 一维数组大小、Len2 二维数组大小
// 我发现 js 传递数组是引用传递，传递普通变量是值传递
export const MergeItem = (Item, List, Len1, Len2) => {
    if(List.length === 0 || List[List.length - 1].length === Len2) {
        List.push([])
        Len1++;
    }
    List[List.length - 1].push(Item);
    return Len1;
}

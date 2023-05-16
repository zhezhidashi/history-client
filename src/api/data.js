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

// 返回播放媒体的 url
export const getMediaUrl = (MediaPath) => {
    store.commit('getToken')
    const TokenValue = store.state.user.token
    return "https://room_dev_client.pacificsilkroad.cn/api-service" + "/file/download/media_file/" + MediaPath + "/" + TokenValue;
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

// 匹配模版名字 Name1 包含 Name2 返回 true
export const MatchName = (Name1, Name2) => {
    if(Name1.indexOf(Name2) !== -1) return true;
    else return false;
}

export const FromPathGetTitle = (path) => {
    let Result = path.split('/');
    return Result[Result.length - 1];
}

export const GetFieldInfo = (This, callback) => {
    getForm("/field_template/list", This, function(res){
        let FieldInfoMap = {};
        let List = res.data;
        for(let i = 0; i < List.length; i++){
            let item = List[i];
            FieldInfoMap[item.main_id.toString()] = item.show_name;
            if(i === List.length - 1) callback(FieldInfoMap);
        }
    })
} 

export const GetFilterRule = (This, Arguments, callback) => {
    GetFieldInfo(This, function(FieldInfoMap){
        let FilterRule = {};
        for(let ArgName in Arguments){
            for(let FieldID in FieldInfoMap){
                if(Arguments[ArgName] === "" || Arguments[ArgName] === undefined){
                    continue;
                }

                if(ArgName === "Keywords"){
                    FilterRule["all"] = {"has": Arguments[ArgName]};
                }
                else if(ArgName === "Title"){
                    if(MatchName(FieldInfoMap[FieldID], "标题")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
                else if(ArgName === "Theme"){
                    if(MatchName(FieldInfoMap[FieldID], "主题")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
                // 
                else if(ArgName === "TimeFrom"){
                    if(MatchName(FieldInfoMap[FieldID], "起始时间")){
                        FilterRule[FieldID.toString()] = {">=": parseInt(Arguments[ArgName])};
                    }
                }
                else if(ArgName === "TimeTo"){
                    if(MatchName(FieldInfoMap[FieldID], "结束时间")){
                        FilterRule[FieldID.toString()] = {"<=": parseInt(Arguments[ArgName])};
                    }
                }
                else if(ArgName === "Location"){
                    if(MatchName(FieldInfoMap[FieldID], "地点")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
                else if(ArgName === "Language"){
                    if(MatchName(FieldInfoMap[FieldID], "语种")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
                else if(ArgName === "People"){
                    if(MatchName(FieldInfoMap[FieldID], "人物")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
                else if(ArgName === "Event"){
                    if(MatchName(FieldInfoMap[FieldID], "事件")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
                else if(ArgName === "Source"){
                    if(MatchName(FieldInfoMap[FieldID], "来源")){
                        FilterRule[FieldID.toString()] = {"has": Arguments[ArgName]};
                    }
                }
            }
        }
        callback(FilterRule);
    })
}

export const GetTemplateIDList = (ResourceFieldList, callback) => {
    getForm('/template/list', this, function(res){
        let TemplateIDList = [];
        let List = res.data;
        for(let i = 0; i < List.length; i++){
            let item = List[i];
            for(let TemplateName of ResourceFieldList){
                if(item.name === TemplateName){
                    TemplateIDList.push(item.main_id);
                }
            }
        }
        if(TemplateIDList.length === 0){
            callback([1000000000])
        }
        else{
            callback(TemplateIDList);
        }
        
    })
}

// 获取节点的标题
export const GetTitle = (This, Path, callback) =>{
    GetFieldInfo(This, function (FieldInfoMap) {
        let DataForm = {
            path: Path,
        };
        postForm('/data/node', DataForm, this, function (res) {
            let item = res.data;
            for (let FieldID in item.content) {
                if (MatchName(FieldInfoMap[FieldID], "标题")) {
                    callback(item.content[FieldID]);
                }
            }
        })
    })
}
import fetch from 'isomorphic-fetch';
// 一个永远是pending状态的promise对象
const alwaysPendingPromise = new Promise(() => {});
// fetch请求的默认配置
const defaultOption = {
        method: 'post',
        credentials: "include",
        mode: "cors",
        headers: new Headers({
                'Content-Type': 'application/json'
        })
};
export default (url, option = {}) => {
        option = Object.assign({}, defaultOption, {body:JSON.stringify(option)});
        return fetch(url, option)
                .then(response => {
                        if(response.status >= 200 && response.status < 300) return response;
                        else return Promise.reject(response);
                })
                .then(response => response.json())
                .then(({ status, message, data }) => {
                        if(message) alert(message);
                        switch(status){
                                case 200: return data;
                                case 401:  // todo
                                default: return alwaysPendingPromise;
                        }
                })
                .catch(error => {
                        alert(error.message);
                        return alwaysPendingPromise;
                });
};

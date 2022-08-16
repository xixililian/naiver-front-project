import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import store from "../store";

const baseURL = "http://localhost:8050"; // development 测试
const baseOpts = { baseURL };

function transerPostDataByQs (config) {
    // 将请求体转换为 x-www-form-urlencoded 的 searchParams 格式
    if (
        config.method === "post" &&
        config.headers["Content-Type"] != "multipart/form-data"
    ) {
        config.data = qs.stringify(config.data);
    }
    return config;
}

function addTokenHeader (config) {
    // 给 header 里面加一个 token
    config.headers.token = store.state.token;
    return config;
}

let expireTipsCoolDown = true; // 1003 登录过期的跳转和用户提示，需要做节流处理，防止多个接口同时触发。
function transerResDataToShort (res) {
    // 返回的code如果是1003, 表示登录过期, 需要重新登录
    if (res.data.code == 1003) {
        if (expireTipsCoolDown) {
            store.dispatch("loginOut");
            expireTipsCoolDown = false;
            Vue.prototype.$message({
                message: "登录过期，请重新登录",
                type: "warning"
            });
            Vue.prototype.$loading().close();
            setTimeout(() => {
                expireTipsCoolDown = true;
            }, 3e3); // 节流的频率是3秒
        }
    } 
    return res.data
}

/**
 * $axios 请求体格式为 application/x-www-form-urlencoded
 * $oxios 请求体格式为 application/json
 * axios 好像根据请求体类型自动设置了headers 里面的Content-Type
 * 可能应该显示地设置一下
 */
const $axios = axios.create(baseOpts);
$axios.interceptors.request.use(transerPostDataByQs);
$axios.interceptors.request.use(addTokenHeader);
$axios.interceptors.response.use(transerResDataToShort);

const $oxios = axios.create(baseOpts);
$oxios.interceptors.request.use(addTokenHeader);
$oxios.interceptors.response.use(transerResDataToShort);

/**
 * $axios 为转换请求体为 searchParams 格式
 * $oxios 不会转换，保持 json 字符串格式
 */
Vue.prototype.$axios = $axios.request;
Vue.prototype.$oxios = $oxios.request;
Vue.prototype.$post = $axios.post;
Vue.prototype.$get = $axios.get;
Vue.prototype.$baseURL = baseURL;

export { $axios, $oxios, baseURL };
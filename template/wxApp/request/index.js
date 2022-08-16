/**
 * 配置 Ajax 的默认参数和行为;
 */
const baseURL = require("./baseURL");
const _request = wx.request;

async function request(options){
    const url = baseURL + (options.url || "");

    return new Promise((resolve, reject) => {
        const task = _request({
            success: res => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    const data = res.data;
                    if (data.code === 2000) resolve(data);

                    // 这里应该可以更精细化控制各种响应状况
                    else reject (data);
                }
                else reject(res);
            },
            fail: err => {
                reject({
                    ...err,
                    msg: err.errMsg
                })
            },
            ...options,
            url
        });

        // 对于回调方式的调用，返回 task 便于调用者控制。
        if (options.success || options.fail) {
            resolve(task)
        }
    })
}

Object.defineProperty(wx, "request", {
    get () {
        return request.bind(wx)
    }
})
import "./request/index";
import "./utils/index";
import globalData from './globalData.js';

App({
    globalData,

    onLaunch: async function (options) {
        console.log("onLaunch", options);

        // 检查（使用微信开放能力的）登录状态，如果过期了，就重新登录。
        try {
            await wx.checkSession();
            if (!globalData.openId) throw {msg: "没有openid"};

        } catch (reason) {
            console.warn("app.js: 微信登录已失效或检查微信登录态失败，将重新登录", reason);
            this.wxLogin();
        }
    },

    // 微信（开放能力）授权登录
    async wxLogin() {
        const code = await new Promise(resolve => {
            wx.login({
                success: res => {
                    if (res.code) {
                        globalData.session = { code: res.code };
                        resolve(res.code)
                    } else {
                        wx.showToast({ title: res.errMsg });
                    }
                },
                fail: reason => {
                    console.warn("wx.login 失败", reason);
                }
            })
        });

        try {
            const res = await wx.request({
                url: '/app/index/getOpenId',
                data: { code }
            });

            if (res.code == 2000) {
                globalData.session = res.data;
                return res.data;

            } else throw res

        } catch (reason) {
            console.warn("提交code时发生错误", reason);
        }
    },

    // 检查并强制更新小程序的新版本
    checkUpdate() {
        const updateManager = wx.getUpdateManager()
        wx.showLoading({ title: "检查更新..." })

        updateManager.onCheckForUpdate(function (res) {
            wx.hideLoading()
            if (res.hasUpdate) wx.showLoading({ title: '更新下载中...' })
        })

        updateManager.onUpdateReady(function () {
            wx.hideLoading();
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.hideLoading();
            console.warn("更新包下载失败")
        })
    },

    // 执行退出登录的相关事务
    async loginOut() {
        wx.showLoading({ title: "退出中", mask: true });

        try {
            const res = wx.request({
                url: "",
                data: {}
            })

            if (res.code === 2000) globalData.reset()
            else throw(res)
            
            await wx.reLaunch({ url: '/pages/index/index' })
            wx.hideLoading();

        } catch (reason) {
            wx.hideLoading();
            console.warn("退出失败", reason)
            wx.showToast({
                title: "退出失败，请稍后再试",
                icon: "none"
            });
        }
    }
})
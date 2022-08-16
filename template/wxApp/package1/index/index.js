const app = getApp(), GD = app.globalData;
Page({
    data: {
        pages: [
            {
                path: "/package1/login/login",
                name: "登录页"
            },
            {
                path: "/package1/agreement/agreement",
                name: "用户协议"
            },
            {
                path: "/package1/welcome/welcome",
                name: "欢迎"
            },
            {
                path: "/package2/video/video",
                name: "视频播放"
            },
        ]
    },
    onLoad: function () {},
    onShow () {},
    get onPullDownRefresh () {return this.fetchData},
    onShareAppMessage () {
        const success = () => {
            wx.showToast({
                title: '转发成功',
            })
        };
        return share({
            path : "",
            title: "",
            success
        });
    },


    // ajax 获取页面数据
    async fetchData () {
        try {
            wx.showLoading({ title: "加载中"});
            const res = await wx.request({
                url: '',
                data: {}
            });
            // todo...

            wx.stopPullDownRefresh();
            wx.showLoading()

        } catch (reason) {
            console.warn("刷新页面数据时出错", reason);
            wx.stopPullDownRefresh();
            wx.showLoading()
        }
    },
})
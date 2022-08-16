Page({
    data: {
        url: ""
    },

    onLoad(options) {
        if (options.url) this.setData({
            url: options.url
        })
        // else wx.navigateBack({});
    }
})
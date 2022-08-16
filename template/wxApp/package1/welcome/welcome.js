const app = getApp(), GD = app.globalData;

Page({
	data: {},
	onLoad: function (query) {},
	handleButtonTap: function (e) {
		wx.redirectTo({
			url: '/package1/index/index',
		});
	}
})
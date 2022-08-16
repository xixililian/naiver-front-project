let app = getApp(), GD = app.globalData;

Page({
	data: {},
	onLoad () {},

	async getPhoneNumber (e) {
		try {
			let {errMsg, iv, encryptedData} = e.detail;
			if (errMsg == 'getPhoneNumber:ok')
				throw {msg: errMsg}

			let decryptedData =
			await this.decrypt({iv, encryptedData}); // 解密
			await this.login(decryptedData);         // 登录
			wx.redirectTo({
				url: '/package1/index/index',
			});
			
		} catch (reason) {
			wx.showModal({
				title: '提示',
				content: reason.msg || "登录失败",
				showCancel: false
			})
			console.warn("登录失败", reason)
			
			wx.hideLoading();
		}
	},

	// 发到获取到的用户的电话号码数据到后台解密
	async decrypt (data) {
		const res = await wx.request({
			url: "",
			data
		});
		if (res.code !== 2000) throw res;

		const decryptedData = res.data;
		GD.userInfo = decryptedData;
		return decryptedData;
	},

	// 调用本系统的登录接口
	async login (data) {
		const {countryCode, purePhoneNumber} = data;
		res = await wx.request({
			url: "",
			data: {
				phone: purePhoneNumber,
			}
		});
		if (res.code !== 2000) throw res;
		GD.userInfo = res.data;
	}
})
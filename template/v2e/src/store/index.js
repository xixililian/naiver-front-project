import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 读取缓存中的用户数据，判断是否登录，并恢复数据到 store
const token    = localStorage.getItem("token");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const store = new Vuex.Store({
	state: {
		token        : token    || "", // 凭证
		userInfo     : userInfo || {}, // 登录用户信息
		listPageState: null,           // 列表页记录状态, 便于从详情页返回时恢复
	},

	getters: {
		hasAuthFor: state => path => {
			const {cenResourceList} = state.userInfo;
			if (cenResourceList.constructor !== Array) return false;
			else return cenResourceList.some(item => item.api.endsWith(path))
		}
	},

	mutations: {

		// 设置token
		setToken: function (state, val) {
			state.token = val;
			localStorage.setItem("token", val);
		},

		// 更新登录用户信息
		setUserInfo(state, info) {
			if (info.constructor !== Object) {
				return console.warn("store 设置用户信息失败，传入的参数不是对象", info)
			}

			state.userInfo = Object.assign(state.userInfo, info);
			localStorage.setItem("userInfo", JSON.stringify(info));
		},

		// 清空用户信息，在推出登录时使用
		clearUserInfo(state) {
			state.userInfo = {};
			state.token = "";
			localStorage.removeItem("token");
			localStorage.removeItem("userInfo");
		},

		// 记录列表页的状态
		saveListPageState(state, data) {
			if (data == undefined) {
				state.listPageState = null;
				console.log("已清空列表页状态")
			} else {
				state.listPageState = data;
				console.log("保存列表页状态", data);
			}
		},
	},

	actions: {
		async loginOut ({ commit }) {
			commit("clearUserInfo");
		}
	},

	modules: {
	}
})

export default store;
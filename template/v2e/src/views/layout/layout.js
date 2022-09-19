import { routes } from "../../router";
import UserAction from "@/components/UserAction/UserAction.vue"

export default {
	name: "Layout",
	components: {
		"user-action": UserAction
	},

	data: () => ({
		menu         : routes,
		menuMode     : "vertical", // horizontal, vertical
		isCollapse   : false,
		defaultAcitve: "", // 当前激活的导航
	}),

	computed: {
		isLineMenu () {
			return this.menuMode == "horizontal"
		},
		menuWidth () {
			if (this.isLineMenu) return "unset"
			else if (this.isCollapse) return "64px";
			else return "200px";
		}
	},

	provide () {
		return {
			getMenuWidth: () => this.menuWidth
		}
	},

	created() {
		if (this.isLineMenu) this.isCollapse = false;
		this.generateMenu();
	},

	methods: {
		// 根据用户的权限列表生成目录
		generateMenu() {
			let pathList = this.$store.state.userInfo.pathList || [];
			/**
			* 用户url权限数据，根据升序排序
			* 再把 子数据 父级的 children 中
			*/
			const navUrlList = [...pathList];
			navUrlList.sort((prev, next) => {
				if (prev.type != next.type) {
					return prev.type - next.type;
				} else {
					return prev.ord - next.ord;
				}
			});

			let i = navUrlList.length - 1;
			while (i >= 0 && navUrlList[i].type > 0) {
				const curItem = navUrlList[i];
				for (let j = i - 1; j >= 0; j--) {
					if (curItem.parent_id == navUrlList[j].id) {
						if (!(navUrlList[j].children instanceof Array)) {
							navUrlList[j].children = [];
						}
						// 此处 push 会使排序颠倒
						navUrlList[j].children.unshift(curItem);
						navUrlList.length = i;
						break;
					}
				}
				i--;
			}
			this.menu.splice(1, this.menu.length, ...navUrlList.filter(item => 
				!(item.path === "/home" && item.children))); // 排除掉主页那个模块，因为那个模块的结构和其他模块的结构不一致，我们用固定this.menu[0]的代替
			this.defaultAcitve = this.extractTop2Path();
		},
		
		// 切换导航折叠状态
		toggleCollapse(value) {
			if (typeof value === "boolean") this.isCollapse = value;
			else this.isCollapse = !this.isCollapse
		},

		// 提取当前匹配的路由的前两层："/basic/banner/edit/2" -> "/basic/banner"
		// 用于设置目录的当前高亮项
		extractTop2Path(path) {
			path = path || this.$route.fullPath;
			return path.match(/^(\/\w*){1,2}/)[0]
		}

	},

	watch: {
		"$route": {
			immediate: true,
			handler: function (val) {
				this.defaultAcitve = this.extractTop2Path(val.fullPath);

				// 更新面包屑
				let pathList = this.$store.state.userInfo.pathList || [];
				if (val.fullPath == "/home")
					return this.breadList = [{
						name: "首页",
						to: ""
					}];

				let breadList = [],
					currPath  = "",
					restPath  = val.fullPath.split("/").filter(
						dName=>(Boolean(dName)&&!(/^\d+(\?.*)?$/.test(dName)))),
					flag      = true;

				while (restPath.length) {
					const dName = restPath.shift()
					currPath += ("/" + dName);
					if (dName == "add") {
						breadList.push({
							name: "新增",
							to: ""
						})
					}
					else if (dName == "edit") {
						breadList.push({
							name: "编辑",
							to: ""
						})
					}
					else {
						const item = pathList.find(it => it.webpath == currPath);
						if (item) breadList.push({
							name: item.menuname,
							// to: flag || (currPath == val.fullPath) ? "" : currPath
							to: flag || (!restPath.length) ? "" : currPath
						})
						else {
							breadList.push({
								name: val.meta.title,
								// to: flag || (currPath == val.fullPath) ? "" : currPath
								to: flag || (!restPath.length) ? "" : currPath
							});
							break;
						}
						flag = false;
					}
				}
				this.breadList = breadList;
			}
		}
	}
};

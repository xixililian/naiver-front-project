import Vcode from ".//verify.vue";


// 滑块验证的图片资源
var verifyImages = [
    require("./images/verify1.jpg"),
    require("./images/verify2.jpg"),
    require("./images/verify3.jpg"),
    require("./images/verify4.jpg"),
    require("./images/verify5.jpg")
];


// 表单 model
var loginForm = {
    phone   : "",
    password: "",
};


// 表单验证规则
var loginFormRules = {
    phone: [
        {
            required: true,
            message : "请输入员工账号",
            trigger : "blur",
        },
    ],
    password: [
        {
            required: true,
            message : "请输入密码",
            trigger : "blur",
        },
    ],
};


export default {
    name: "Login",
    components: { Vcode },

    data() {
        return {
            showVerify: false,
            verifyImages,
            loginForm,
            loginFormRules,
        };
    },

    methods: {
        handleSubmitLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.showVerify = true;
                } else {
                    return false;
                }
            });
        },

        async onSuccess() {
            /**
             * 发起登录请求，注意加密数据
             * 请求成功后，需要将token、用户数据commit到 store
             * 如果返回了用户的权限数据，需要初始化程序的权限控制
             * 最后要跳转到replace首页
             */
            
            try {
                this.$store.commit("setToken", "a replace token string");
                this.$router.replace({ path: "/home" });
            //     const res = await this.$axios({
            //         url: "/api/login",
            //         method: "post",
            //         data: {
            //             account : this.loginForm.phone,
            //             password: this.loginForm.password
            //         }
            //     });

            //     if (res.code === 2000) {
            //         this.$store.commit("setToken", res.data.token);
            //         const {userLoginDTO: userSession} = res.data;
            //         const {cenResourceList: pathList} = userSession;
            //         pathList.forEach(item => {
            //             if (item.icon) item.icon_path = this.$baseURL + "/" + item.icon;
            //             item.iconClass = item.webPath?.split("/")?.[1];
            //             item.name = item.title = item.menuName;
            //             item.api = item.path;
            //             item.path = item.webPath;
            //         });
            //         this.$store.commit("setUserInfo", userSession);
            //         this.$router.replace({ path: "/home" });

            //     } else if (res.code != 1003) throw res;

            } catch (reason) {
                this.$message({
                    message: "登录失败，请稍后重试",
                    type: "error"
                });
                console.warn("登录程序出错", reason);
            }

            this.showVerify = false;
        }
    }
};
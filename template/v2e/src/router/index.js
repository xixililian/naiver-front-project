import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import store from "../store";
import login    from "@/views/login/login.vue";       // 登录页面
import layout   from "@/views/layout/layout.vue";     // 布局框架
import home     from "@/views/home/home.vue";         // 布局框架
import NotFound from "@/views/notFound/notFound.vue"; // 404页面

export const routes = [
    {
        name     : "Login",
        path     : "/login",
        component: login,
        meta: {
            title: "登录"
        }
    },
    {
        name     : "Layout",
        path     : "",
        redirect : "/home",
        component: layout,
        children : [
            {
                path: "/home",
                name: "Home",
                component: home,
                meta: {
                    title: "主页",
                }
            }
        ]
    },
    {
        name     : "NotFound",
        path     : "*",
        component: NotFound,
        meta: {
            title: "页面未找到"
        }
    }
]
const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
    let token = store.state.token;
    if (token) {
        next()

    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
    }
});

router.afterEach((to) => {
    // 设置页面标题
    document.title = to.meta.title;
})

export default router;

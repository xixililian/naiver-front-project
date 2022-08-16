import Vue from "vue";
Vue.config.productionTip = false;
import router from "@/router";
import store  from "@/store";

import "@/assets/style";    // 全局样式, 引入element, 及更改element样式
import '@/directive'        // 全局指令
import "@/utils";           // 一些功能

import FootBarComponent from "./components/FootBar/FootBar.vue";
Vue.component("foot-bar", FootBarComponent)

import App from "@/App.vue";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
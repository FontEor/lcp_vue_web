import Vue from "vue";
import ElementUI from "@lui/lui-ui";
import "@lui/lui-ui/lib/theme-chalk/index.css";
import App from "pages/national/App.vue";
import store from "@/store/common";
import router from "@/router/national/index";
import VueClipboard from "vue-clipboard2";
import i18n from "@/locales/index";
import dayjs from "dayjs";
import "pages/national/public-path.js";
import microApp, { getActiveApps } from "@micro-zoe/micro-app";
import envConfig from "@/env/index.js";

// import LemonIMUI from '@/components/lemon-imui/packages/components/index.vue';
import "@/components/lemon-imui/dist/index.css";

import LemonIMUI from "@/components/lemon-imui/packages/index";
// Vue.component('LemonUi', LemonIMUI);
// <lemon-ui> </lemon-ui>
// <LemonUi></LemonUi>
Vue.use(LemonIMUI);

import LemonMessageBox from "@/components/toTop/components/lemonMessageBox.vue";
Vue.component(LemonMessageBox.name, LemonMessageBox);

Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.config.devtools = true;

Vue.config.productionTip = true;
window.eventHub = new Vue();

Vue.prototype.$dayjs = dayjs;

if (
  sessionStorage.getItem("store") &&
  sessionStorage.getItem("store") != null
) {
  store.replaceState(
    Object.assign(
      {},
      store.state,
      JSON.parse(<string>sessionStorage.getItem("store"))
    )
  );
}

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state));
});
window.env = envConfig;
window.microPushStatus = microPushStatus;

startMicro();
new Vue({
  router,
  store,
  i18n,
  render: (h: (arg0: any) => any) => h(App),
}).$mount("#lcp_vue_web");

function startMicro() {
  microApp.start({
    tagName: "micro-app-lcp-vue-web",
  });
}
if (window.__MICRO_APP_ENVIRONMENT__) {
  // 作为子应用运行,可以在此处添加一些父子应用通信的事件
  addDataListener();
}
function microPushStatus(path: string, routeName: string) {
  if (!getActiveApps().includes("lcp_vue_web_upgrade")) {
    router.push({ path });
  } else {
    microApp.setData("lcp_vue_web_upgrade", { path, routeName });
  }
}

function addDataListener() {
  window.microApp.addDataListener((e: any) => {
    console.log(
      "子应用收到基座跳转路由通知开始跳转路由",
      e.routeName,
      router.push
    );
    if (e.routeName) {
      router.push({ name: e.routeName });
    }
  });
}

import Vue from "vue";
import ElementUI from "@lui/lui-ui";
import "@lui/lui-ui/lib/theme-chalk/index.css";
import App from "pages/international/App.vue";
import store from "@/store/common";
import router from "@/router/international/index";
import VueClipboard from "vue-clipboard2";
import i18n from "@/locales/index";

Vue.use(ElementUI, { i18n: (key: any, value: any) => i18n.t(key, value) });
Vue.use(VueClipboard);
Vue.config.devtools = true;

Vue.config.productionTip = true;
window.eventHub = new Vue();

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

fetch("/config/env.json")
  .then((response) => response.json())
  .then((data) => {
    window.env = data;

    new Vue({
      router,
      store,
      i18n,
      render: (h: (arg0: any) => any) => h(App),
    }).$mount("#app");
  });

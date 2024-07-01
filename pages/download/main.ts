import Vue from "vue";
import ElementUI from "@lui/lui-ui";
import "@lui/lui-ui/lib/theme-chalk/index.css";
import router from "@/router/download/index";
import App from "pages/download/App.vue";

Vue.use(ElementUI);

Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

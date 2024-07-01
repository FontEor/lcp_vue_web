import axios from "axios";
import { Message, MessageBox } from "@lui/lui-ui";
import store from "@/store/common";
import { UserModule } from "@/store/common/modules/user";
import isIntranet from "@/utils/isIntranet";
import Cookies from "js-cookie";

const service = axios.create({
  baseURL: "/lcp-rest",
  timeout: 10000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Account-Type"] = isIntranet() ? "erp" : "passport";
    //request请求头加上supplierId
    config.headers["supplierId"] = Number(Cookies.get("supplierId")) || -1;
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

let intranetLoginMessageBoxVisible = false;
let extranetLoginMessageBoxVisible = false;

service.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const urlWhiteList = ["/evaluation/docEvaluation"];

    if (data.code === 20000) {
      return response;
    } else {
      if (!isIntranet() && config.url && urlWhiteList.includes(config.url)) {
        Message({
          message: "操作过于频繁，请稍后再试",
          type: "warning",
        });
        return response;
      }

      if (data.code == 999999 && data.error === "NotLogin") {
        // 外网登录态失效
        if (config.url !== "/hrInfo/getUserInfo") {
          if (!extranetLoginMessageBoxVisible) {
            extranetLoginMessageBoxVisible = true;
            reLogin();
          }
        }
      }
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      //发出的请求收到了response，但非2XX状态码
      if (error.response.status === 520 || error.response.status === 401) {
        if (error.config.url !== "/hrInfo/getUserInfo") {
          //弹窗计数，当出现多个401请求，只打开一次
          if (!intranetLoginMessageBoxVisible) {
            intranetLoginMessageBoxVisible = true;
            reLogin();
          }
        }
      }
    } else if (error.request) {
      // 请求发出，但没有收到response
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      //设置触发错误的请求时，message信息
      console.log("Error", error.message);
    }
    console.log(error.config);

    return Promise.reject(error);
  }
);

function reLogin() {
  UserModule.SET_LOGIN_STATE(false);
  sessionStorage.setItem("store", JSON.stringify(store.state));
  MessageBox.confirm("您的登录状态已失效，是否重新登录？", "提示", {
    confirmButtonText: "登录",
    cancelButtonText: "不登录",
    type: "warning",
  })
    .then(async () => {
      intranetLoginMessageBoxVisible = false;
      extranetLoginMessageBoxVisible = false;
      await UserModule.handleLogout();
      isIntranet()
        ? await UserModule.intranetCheckLogin()
        : await UserModule.extranetCheckLogin();
    })
    .catch(() => {
      intranetLoginMessageBoxVisible = false;
      extranetLoginMessageBoxVisible = false;
    });
}

export default service;

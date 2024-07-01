import axios from "axios";
import store from "@/store/common";
import { UserModule } from "@/store/common/modules/user";
import { Message, MessageBox } from "@lui/lui-ui";
import isIntranet from "@/utils/isIntranet";
import Cookies from "js-cookie";

let reLoginDialogVisible = false;
// create an axios instance
const gwApiRequest = axios.create({
  // 本地配置了proxyTable之后不需要配置baseUrl，其他环境需要这个baseUrl
  baseURL: window.env.gatewayApiDecoupling, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    "LOP-DN": window.env.gatewayApiDecouplingLop,
    "Account-Type": isIntranet() ? "erp" : "passport",
  },
});

gwApiRequest.interceptors.request.use(
  (config) => {
    config.headers["groupCode"] = Cookies.get("groupCode") || "";
    return config;
  },
  (error) => {
    console.log("gwApiRequest", error); // for debug
    return Promise.reject(error);
  }
);

gwApiRequest.interceptors.response.use(
  (response) => {
    const { status } = response;
    const { error_response } = response.data;
    if (error_response) {
      Message.error("服务异常");
      return Promise.reject(response);
    }
    if (status === 401 || status === 520) {
      if (!reLoginDialogVisible) {
        reLoginDialogVisible = true;
        reLogin();
      }
      return Promise.reject(response);
    }
    if (response.data.response) {
      const { code, message } = response.data.response;
      if (code === 20000) {
        return response.data.response;
      } else {
        message && Message.error(message);
        return Promise.reject(response.data.response);
      }
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const { status } = error.response;
    const { error_response } = error.response.data;
    if (error_response) {
      Message.error("服务异常");
    }
    if (status === 401 || status === 520) {
      if (!reLoginDialogVisible) {
        reLoginDialogVisible = true;
        reLogin();
      }
    }
    return Promise.reject(error.response);
  }
);

async function reLogin() {
  await UserModule.SET_LOGIN_STATE(false);
  sessionStorage.setItem("store", JSON.stringify(store.state));
  MessageBox.confirm("您的登录状态已失效，是否重新登录？", "提示", {
    confirmButtonText: "登录",
    cancelButtonText: "不登录",
    type: "warning",
  })
    .then(() => {
      reLoginDialogVisible = false;
      UserModule.handleLogout();
      isIntranet()
        ? UserModule.intranetCheckLogin()
        : UserModule.extranetCheckLogin();
    })
    .catch(() => {
      reLoginDialogVisible = false;
    });
}

export default gwApiRequest;

import axios from "axios";
import { MessageBox } from "@lui/lui-ui";
import { UserModule } from "@/store/common/modules/user";

const iDassRequest = axios.create({
  baseURL: "/lcp-rest",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});
iDassRequest.interceptors.request.use(
  (config) => {
    config.headers["Account-Type"] = "passport";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

iDassRequest.interceptors.response.use(
  (response) => {
    console.info(JSON.stringify(response));
    const res = response.data;
    if (res.code == "999999") {
      return response;
    }
    if (res.code !== 20000) {
      // Message({
      //     message: res.message,
      //     type: 'error',
      //     duration: 5 * 1000
      // })
      return Promise.reject(new Error(res.message));
    }
    return res;
  },
  (error) => {
    const eo = JSON.parse(JSON.stringify(error));
    console.info("error", error);
    if (error.response) {
      //发出的请求收到了response，但非2XX状态码
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 520 || error.response.status === 401) {
        reLogin();
        return;
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
    const { url } = eo.config;
    if (url === "/hrInfo/getUserInfo") {
      return Promise.reject(error);
    }
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error);
  }
);

async function reLogin() {
  await UserModule.SET_LOGIN_STATE(false);
  MessageBox.confirm("您的登录状态已失效，是否重新登录？", "提示", {
    confirmButtonText: "登录",
    cancelButtonText: "不登录",
    type: "warning",
  })
    .then(() => {
      UserModule.handleLogout();
      UserModule.extranetCheckLogin();
    })
    .catch(() => {});
}

export default iDassRequest;

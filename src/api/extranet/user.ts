import request from "@/utils/request_noMsg";
import Request from "@/utils/request";
import idaasRequest from "@/utils/idass-request";
import { AxiosRequestConfig, Method } from "axios";

// 用户信息统一注册API
const user = {
  /**
   * 外网-获取用户信息
   */
  getUserInfo: () => {
    const url: string = "/hrInfo/getUserInfo";
    const method: Method = "get";
    const config: AxiosRequestConfig = { url, method };
    return request(config);
  },
  /**
   * 外网-获取用户信息
   */
  getUserHrInfo: () => {
    const url: string = "/hrInfo/getUserInfo";
    const method: Method = "get";
    const config: AxiosRequestConfig = { url, method };
    return Request(config);
  },

  /**
   * 外网-获取idaas登录页
   */
  getLogin: () => {
    const url: string = "/getLogin";
    const method: Method = "get";
    const config: AxiosRequestConfig = { url, method };
    return idaasRequest(config);
  },

  /**
   * 外网-自动入驻
   */
  saveOutDeveloper: () => {
    const url: string = "/user/saveOutDeveloper";
    const method: Method = "get";
    const config: AxiosRequestConfig = { url, method };
    return request(config);
  },
};

export default user;

import request from "@/utils/request_noMsg";
import { AxiosRequestConfig, Method } from "axios";

// 资质认证统一注册API
const qualification = {
  /**
   * 外网-资质认证-填写基本信息-基本信息查询
   */
  getBaseInfo: () => {
    const url: string = "/supplierIsv/getBaseInfo";
    const method: Method = "post";
    const config: AxiosRequestConfig = { url, method };
    return request(config);
  },

  /**
   * 外网-资质认证-填写基本信息-获取手机验证码
   * @param {string} phone 手机号码
   */
  getAuthCode: (params: object) => {
    const url: string = "/user/getAuthCode";
    const method: Method = "post";
    const config: AxiosRequestConfig = { url, method, params };
    return request(config);
  },

  /**
   * 外网-资质认证-填写基本信息-判断统一社会信用代码是否重复
   * @param {string} companyCode 统一社会信用代码
   */
  companyCodeExistedFlag: (params: object) => {
    const url: string = "/supplierIsv/companyCodeExistedFlag";
    const method: Method = "get";
    const config: AxiosRequestConfig = { url, method, params };
    return request(config);
  },

  /**
   * 外网-资质认证-填写基本信息-新增基本信息
   * @param {string} companyName 企业名称
   * @param {string} companyCode 统一社会信用代码
   * @param {string} contactsName 联系人姓名
   * @param {string} contactsEmail 联系人邮箱
   * @param {string} contactsPhone 联系人电话
   * @param {string} verificationCode 手机验证码
   */
   addBaseInfo: (data: object) => {
    const url: string = "/supplierIsv/addBaseInfo";
    const method: Method = "post";
    const config: AxiosRequestConfig = { url, method, data };
    return request(config);
  },

  /**
   * 外网-资质认证-填写基本信息-更新基本信息
   * @param {string | undefined} companyName 企业名称
   * @param {string | undefined} contactsName 联系人姓名
   * @param {string | undefined} contactsEmail 联系人邮箱
   * @param {string | undefined} contactsPhone 联系人电话
   * @param {string | undefined} verificationCode 手机验证码 修改联系人电话需要验证码
   */
   updateBaseInfo: (data: object) => {
    const url: string = "/supplierIsv/updateBaseInfo";
    const method: Method = "post";
    const config: AxiosRequestConfig = { url, method, data };
    return request(config);
  },
};

export default qualification;

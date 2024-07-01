import gwApiRequest from "@//utils/gwApiRequest.js";
import { AxiosRequestConfig, Method } from "axios";

const apiStore = {
  /**
   * @description 内网-API仓库-分页查询API表格数据
   * @param {number} pageNumb 当前页数
   * @param {number} pageSize 每页数据条数
   * @param {string} businessCategoryId 业务分类ID
   * @param {number} searchType 搜索方法 1:API搜索 2:方法搜索
   * @param {string} searchKeyWord 搜索关键字
   */
  queryApiReleaseByCondition: (data: object) => {
    const url: string = "/ApiDepotService/queryApiReleaseByCondition";
    const method: Method = "post";
    const config: AxiosRequestConfig = {
      url,
      method,
      data: JSON.stringify(data),
    };
    return gwApiRequest(config);
  },

  /**
   * @description 内网-API仓库-查询业务分类列表
   * @param {number} pageNumb 当前页数
   * @param {number} pageSize 每页数据条数
   */
  queryApiCategory: (params: object) => {
    const url: string = "/ApiManagerService/queryApiCategory";
    const method: Method = "post";
    const config: AxiosRequestConfig = {
      url,
      method,
      data: JSON.stringify(params),
    };
    return gwApiRequest(config);
  },
  /**
   * @description 内网-API仓库-http接口协议-查询表格数据
   * @param {number} pageNumb 当前页数
   * @param {number} pageSize 每页数据条数
   * @param {string} businessCategoryId 业务分类ID
   * @param {string} domainCode 分组编码
   * @param {string} searchType 搜索方法 1:API搜索 2:方法搜索
   * @param {string} searchKeyWord 搜索关键字
   */
  getHttpApiList: (params: Object) => {
    const url: string = "/HttpApiService/queryApiReleaseList";
    const method: Method = "post";
    const config: AxiosRequestConfig = {
      url,
      method,
      data: params,
    };
    return gwApiRequest(config);
  },
  /**
   * @description 内网-API仓库-http接口协议-模糊查询分组列表
   * @param {string} domainCode 模糊匹配http协议的分组字段
   */
  getDomainCodeList: (params: Object) => {
    const url: string = "/CloudDomainService/query";
    const method: Method = "post";
    const config: AxiosRequestConfig = { url, method, data: params };
    return gwApiRequest(config);
  },
  /**
   * @description 内网-API仓库-http协议-API详情页-查询此API的文档数据
   * @param {number} id  httpAPI的id
   */
  getHttpDocumentDetail: (params: Object) => {
    const url: string = "/HttpApiService/findApiDocRelease";
    const method: Method = "post";
    const config: AxiosRequestConfig = {
      url,
      method,
      data: params,
    };
    return gwApiRequest(config);
  },
  /**
   * @description 内网-API仓库-http协议-APi详情页-查询API的安全插件
   * @param {number} domainId  分组的id
   * @param {string} templateCode 1.2.2迭代, 此请求参数的前端传值为hmac-auth，表示查询签名的安全配置
   */
  getSecurityConfiguration: (params: Object) => {
    const url: string = "/CloudPluginManagerService/queryPublishedCloudPlugin";
    const method: Method = "post";
    const config: AxiosRequestConfig = {
      url,
      method,
      data: params,
    };
    return gwApiRequest(config);
  },
};

export default apiStore;

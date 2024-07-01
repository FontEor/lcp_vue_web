import request_msg from "@/utils/request_msg";

export interface Bizpinterface {
  [key: string]: any;
}

const bizapinterface = {
  /**
   * 查询业务单元下的api列表，支持滚动分页
   *
   * @param {number} unitId 业务单元id
   * @param {number} lastId 当前数据最后一条记录的id, 默认值为0
   * @param {number} size 每次查询的api数量，默认值为1000
   */
  getBizUnitApiScrollPage: (params: any) =>
    request_msg.get("/bizapinterface/getBizUnitApiScrollPage", { params }),

  selectBizApiList: (params: any) =>
    request_msg.get("/bizapinterface/selectBizApiList", { params }),

  /**
   * 根据API的ID查询API文档信息
   *
   * @param {number} id API的ID
   */
  getBizUnitApiDetails: (params: any) =>
    request_msg.get("/bizapinterface/getBizUnitApiDetails", { params }),

  /**
   * 获取API方法下所有参数可见映射
   *
   * @param {array} 数组元素为API的ID
   */
  getBizApiMethodParamsVisibleMap: (data: any) =>
    request_msg.post("/bizapinterface/getBizApiMethodParamsVisibleMap", data),

  /**
   * 测试工具发起测试
   *
   * @param {number} apiId 接口ID
   * @param {string} appKey AppKey
   * @param {string} appSecret AppSecret
   * @param {string} env 测试环境
   * @param {array} paramJson 测试参数
   * @param {number} appType 应用来源 1:物流开放平台 2:宙斯应用
   * @param {string} refreshToken refreshToken ISV/商家自研应用
   * @param {string} accessToken  accessToken 宙斯应用
   * @param {string} algorithm 算法 合作伙伴应用
   */
  testUnitApi: (data: any) =>
    request_msg.post("/bizapinterface/testUnitApi", data),

  /**
   * API测试工具查询参数
   *
   * @param {number} apiId API的ID
   */
  getMethodDetailsForApiTestUtil: (params: any) =>
    request_msg.get("/bizapinterface/getMethodDetailsForApiTestUtil", {
      params,
    }),

  /**
   * API代码生成示例
   *
   * @param {string} appKey AppKey
   * @param {string} appSecret AppSecret
   * @param {string} accessToken  accessToken 宙斯应用
   * @param {string} algorithm 算法 合作伙伴应用
   * @param {string} unitCode 解决方案对应的服务域
   * @param {string} apiUri 服务域API调用地址
   * @param {string} method 默认传POST
   * @param {string} paramJson 请求体，如果没有请求体，需要填空字符串而不是null
   * @param {boolean} useJos 是否使用JOS应用
   * @param {array} languages	 可选值 - java8 - dotnet_standard_2_0 - php - go - python3
   *
   *
   */
  codegen: (data: any) => request_msg.post("/bizapinterface/codegen", data),
};

export default bizapinterface;

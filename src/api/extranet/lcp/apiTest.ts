import request_msg from "@/utils/request_msg";

export interface ApiTest {
  [key: string]: any;
}

const apiTest = {
  /**
   * 从网关获取格式化数据
   *
   * @param {array} params 可见参数数组
   */
  getFormatDataForGateway: (data: any) =>
    request_msg.post("/apiTest/getFormatDataForGateway", data),

  /**
   * 获取格式化JSON数据
   *
   * @param {number} apiId
   * @param {string} jsonString json
   */
  getFormatData: (data: any) =>
    request_msg.post("/apiTest/getFormatData", data),
};

export default apiTest;

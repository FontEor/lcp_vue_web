import request_msg from "@/utils/request_msg";

export interface Evaluate {
  [key: string]: any;
}

const evaluate = {
  /**
   * 定义根据文档ID评价文档是否有帮助接口
   *
   * @see {@link YApi http://11.51.194.248:3000/project/5/interface/api/1631}
   *
   * @typedef {Object} Response 响应参数
   *
   * @param {Object} data 请求参数
   * @param {number} data.objId - 文档ID
   * @param {number} data.whetherHelp - 是否有帮助 0:没帮助 1:有帮助
   * @param {number} data.docTypeMain - 文档类型 1: api文档 2: 消息文档 3: 接入指南
   * @param {number|undefined} data.bizUnitId - 对接方案ID
   * @param {number|undefined} data.questionCause - 问题原因 1:内容不详细 2:文档更新不及时 3:内容有误 4:视觉体验差 5:其他
   * @param {string|undefined} data.questionDesc - 问题描述
   * @param {string|undefined} data.createUser - 评价创建人userPin 未登录不传，已登录需要传
   *
   * @returns {Promise.<Response>} 表示根据文档ID评价文档是否有帮助接口返回的Promise对象
   */
  submitQuestion: (data: any): Promise<Response> =>
    request_msg.post("/evaluate/submitQuestion", data),
};

export default evaluate;

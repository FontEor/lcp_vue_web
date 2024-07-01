import request_msg from "@/utils/request_msg";

export interface Bizview {
  [key: string]: any;
}

const bizview = {
  /**
   * 对接方案预览根据方案ID和审批流ID获取消息列表
   * 
   */
  getBizUnitMessagePreByCategory: (params: any) =>
    request_msg.get("/bizview/getBizUnitMessagePreByCategory", { params }),

};

export default bizview;

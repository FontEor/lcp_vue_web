import request_msg from "@/utils/request_msg";

export interface Bizmsg {
  [key: string]: any;
}

const bizmsg = {
  /**
   * 外网根据对接方案ID消息分类获取消息列表
   * @see {@link YApi http://11.51.194.248:3000/project/5/interface/api/1115}
   * @param {array} params
   * @param {nunmber} params.unitId 可见参数数组
   *
   */
  getBizUnitMessageByCategory: (params: any) =>
    request_msg.get("/bizmsg/getBizUnitMessageByCategory", { params }),
};

export default bizmsg;

import request_msg from "@/utils/request_msg";

export interface Bizunit {
  [key: string]: any;
}

const bizunit = {
  /**
   * 根据ID查询开放业务详情
   *
   * @param {array} id 开放业务ID
   */
  getBizUnitById: (params: any) =>
    request_msg.get("/bizunit/getBizUnitById", { params }),
};

export default bizunit;

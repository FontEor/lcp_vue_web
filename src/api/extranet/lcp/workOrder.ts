import request_msg from "@/utils/request_msg";

export interface WorkOrder {
  [key: string]: any;
}

const workOrder = {
  /**
   * 工单类型列表
   *
   */
  typeList: () => request_msg.get("/workOrder/typeList"),
  /**
   * 工单类型问题检索
   *
   */
  problemRetrieval: (workOrderTypeCode: any, params: any) =>
    request_msg.get(
      `/workOrder/problem/problemRetrieval/${workOrderTypeCode}`,
      { params }
    ),
  /**
   * 工单类型问题详情
   *
   */
  problemDetail: (code: any) =>
    request_msg.get(`/workOrder/problem/detail/${code}`),
  /**
   * 工单问题邻近节点查询
   *
   */
  problemNeighbor: (code: any) =>
    request_msg.get(`/workOrder/problem/neighbor/${code}`),
  /**
   * 新消息提示
   *
   */
  newMessage: () => request_msg.post("/workOrder/newMessage"),
};

export default workOrder;

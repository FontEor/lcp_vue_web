import request from "@/utils/request";

export default interface BizMessage {
  id: number | null | undefined;
  unitId: number | null | undefined;
  name: string | null | undefined;
  chineseName: string | null | undefined;
  descr: string | null | undefined;
  messageDemo: string | null | undefined;
  messagePropList: [] | null | undefined;
}

/**
 * 查询业务单元下的message列表，支持滚动分页
 *
 * @param unitId 业务单元id
 * @param lastId 当前数据最后一条记录的id, 默认值为0
 * @param size 每次查询的api数量，默认值为20
 */
export function getBizUnitMessages(
  unitId: number,
  lastId = 0,
  pageSize = 1000
): Promise<BizMessage[]> {
  return request({
    url: "/bizmsg/getBizUnitMsgs",
    method: "get",
    params: { unitId: unitId, lastId: lastId, pageSize },
  }).then((response) => response.data);
}

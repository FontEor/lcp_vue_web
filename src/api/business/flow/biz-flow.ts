import request from "@/utils/request";

export default interface BizFlow {
  id: number;
  unitId: number;
  title: string;
  content: string;
  link: string;
  serialNumber: number;
}

export function getBizUnitFlows(unitId: number, lastId = 0, size = 1000): Promise<BizFlow[]> {
  return request({
    url: "/bizunit/getBizUnitFlowScrollPage",
    method: "get",
    params: { unitId, lastId, size }
  }).then((response:any) => response.data)
}

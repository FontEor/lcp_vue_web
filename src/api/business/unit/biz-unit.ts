import request from "@/utils/request";

export default interface BizUnit {
  id: number;
  name: string;
  remark: string;
}

export function getBizUnit(id: number): Promise<BizUnit> | null {
  return  request({
      url:"/bizunit/getBizUnitById",
      method: "get",
      params: { id: id },
    }).then(response => response.data)
}

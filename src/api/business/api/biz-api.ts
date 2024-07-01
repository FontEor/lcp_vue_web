import request from "@/utils/request";
export default interface BizApi {
  id: number | null | undefined;
  unitId: number | null | undefined;
  interfaceName: string | null | undefined;
  interfaceMethod: string | null | undefined;
  apiCode: string | null | undefined;
  apiName: string | null | undefined;
  apiType: string | null | undefined;
  apiRemark: string | null | undefined;
  apiUrl: string | null | undefined;
  alias: string | null | undefined;
  shadowboxAlias: string | null | undefined;
}

/**
 * 查询业务单元下的api列表，支持滚动分页
 *
 * @param unitId 业务单元id
 * @param lastId 当前数据最后一条记录的id, 默认值为0
 * @param size 每次查询的api数量，默认值为1000
 */
export function getBizUnitApis(
  unitId: number,
  lastId = 0,
  size = 1000
): Promise<BizApi[]> {
  return request({
    url: "/bizapinterface/getBizUnitApiScrollPage",
    method: "get",
    params: {
      unitId: unitId,
      lastId: lastId,
      size: size,
    },
  }).then((response) => response.data);
}

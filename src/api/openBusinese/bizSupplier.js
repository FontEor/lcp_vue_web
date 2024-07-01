import request from "@/utils/request";

const bizSupplier = {
  /**
   * @description 校验开发商是否有可见业务单元的权限
   * @param {number} unitId - 业务单元id
   */
  checkBizUnitVisibleSupplier: (unitId) =>
    request({
      url: "/bizvisiblesupplier/checkBizUnitVisibleSupplier",
      method: "get",
      params: {
        unitId
      }
    }),
};

export default bizSupplier;

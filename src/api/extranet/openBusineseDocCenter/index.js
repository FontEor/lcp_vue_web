import request from "@/utils/request";

// 开放业务-产品中心文档
const bizDocCenter = {
  /**
   * 查询所有开放业务列表
   */
  findClassifiedBizUnitList: (data) =>
    request.post("/bizunit/findClassifiedBizUnitList", data),

  /**
   * 查询当前开放业务名称
   * @param {number} id 业务单元id
   *
   */
  getBizUnit: (params) => request.get("/bizunit/getBizUnitById", { params }),

  /**
   * 查询审批预览当前开放业务名称
   *
   * @param  id 业务单元id
   * @param  approvalNumber 审批流单号
   *
   */
  getBizView: (params) => request.get("/bizview/getBizUnitById", { params }),

  /**
   * 根据API的ID查询API文档信息
   * @param {number} id API的ID
   */
  getBizUnitApiDetails: (params) =>
    request.get("/bizapinterface/getBizUnitApiDetails", { params }),

  /**
   * 查询业务单元下的api列表，支持滚动分页
   *
   * @param unitId 业务单元id
   * @param lastId 当前数据最后一条记录的id, 默认值为0
   * @param size 每次查询的api数量，默认值为1000
   */
  getBizUnitApiScrollPage: (params) =>
    request.get("/bizapinterface/getBizUnitApiScrollPage", { params }),

  /**
   * 查询开放业务文档内容
   * @param {number} id 文档id
   *
   */
  findReleaseDocGroupById: (params) =>
    request.get("/doc/findReleaseDocGroupById", { params }),

  /**
   * 查询审批预览开放业务文档内容
   * @param {number} id 文档id
   * @param  approvalNumber 审批流单号
   */
  findDocGroupById: (params) =>
    request.get("/bizview/findDocGroupById", { params }),

  /**
   * 软件系统-配置产品介绍页-产品架构 上传图片
   * @param {FormData} imageFile 文件
   */
  imageUpload: (data) =>
    request.post("/api/imageUpload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default bizDocCenter;

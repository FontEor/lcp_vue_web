import request from "@/utils/request";
import request_noMsg from "@/utils/request_noMsg.ts";


// 首页-产品展示
const productApi = {
  /**
   * 产品介绍页数据展示
   * @param {string} productCode
   */
  queryProductDetails: (params) =>
    request.get(`/product/show/details/${params}`),
  /**
   * 产品展示权限控制
   * productShowWhitelistRestrictions = 1 时，开启白名单限制
   * productShowWhitelistRestrictions=0时，直接查询数据即可
   */
  facadeProductShowList: (params) =>
    request.get("/product/release/facadeProductShowList", { params }),
  /**
   * 已发布产品列表查询
   */
  productClassifiedProducts: (params) =>
    request.get("/product/release/classifiedProducts", { params }),

  /**
   * 查看软件系统精简信息
   */
  findMiniProductInfo: (params) =>
    request.get(`/product/release/findMini${params}`),

  /**
   *  点击申请使用软件系统的时候，需要根据 productCode 查询此软件系统的版本列表 list 以及其他信息   get
   */
  applyUse: (params) => request.get(`/productApply/findApplyUseProduct/${params}`),

  /**
   *  点击下一步，nextStep 保存这个表单到数据库中并且开发审批流以及发送邮件  post
   *
   */
  nextStep: (data) => request.post("/productApply/submitApplication", data),

  /**
   *  查看用户申请的软件系统列表  get
   *
   */
  selectProductApplyByUserId: (params) =>
  request.get(`/productApply/selectProductApplyByUserId`),
};

export default productApi;

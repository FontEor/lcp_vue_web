import request from "@/utils/request";

// 首页-产品展示
const docCenter = {
    /**
    * 查询产品版本配置API列表分类
    * @param {number} productCode 软件系统编码
    * @param {string} type 开发者资源类别类型（ 2=api, 3=spi, 4=msg）
    * 
    */
    queryProductSysgroupList: data =>
        request.post("/product/sysGroup/list", data),

    /**
    * 查询软件系统使用手册左侧菜单栏数据
    * @param {number} productCode 软件系统编码
    * 
    */
    getReleasedProductDocTree: params =>
        request.get("/doc/getReleasedProductDocTree", { params }),

    /**
    * 查询产品版本配置API列表
    * @param {number} productCode 产品版本code
    * @param {string} productSysGroupId 
    * @param {string} keyWords 
    * @param {string} pageNumb 
    * @param {string} pageSize 
    * @param {string} flag
    * 
    */
    queryOpenApiList: data =>
        request.post("/product/openapi/list", data),

    /**
     * 查询软件系统使用手册文档内容
     * @param {number} id 文档id
     * 
     */
    findReleaseDocById: params =>
        request.get("/doc/findReleaseDocById", { params }),

    /**
    * 查询软件系统使用手册文档内容
    * @param {number} productCode 产品版本code
    * 
    */
    downloadDocPdf: params =>
        request.get("/outer/doc/pdf", { params }),

    /**
    * 查询开发指南文档目录
    * @param {number} type 文档类型
    * 
    */
    getReleaseDocList: params =>
        request.get("/doc/getReleaseDocList", { params }),

    /**
    * 查询开发指南文档内容
    * @param {number} type 文档类型
    * 
    */
    getReleaseDoc: params =>
        request.get("/doc/getReleaseDoc", { params }),

    /**
    * 查询产品版本配置扩展点列表
    * @param {number} productCode 产品版本code
    * @param {string} productSysGroupId 
    * @param {string} keyWords 
    * @param {string} pageNumb 
    * @param {string} pageNumb 
    * 
    */
    querySpiDocList: data =>
        request.post("/product/spidoc/list", data),
    /**
     * 查询产品版本配置扩展点列表
     * @param {number} id 
     */
    querySpiReleaseDoc: params =>
        request.get("/product/spidoc/releaseDoc", { params })
};

export default docCenter;

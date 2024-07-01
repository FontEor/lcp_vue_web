import request from "@/utils/request";

const competenceCenter = {
    /**
     * 查询能力中心标签分类
     */
    findClassifiedBizUnitList: () => request.post("/bizunit/findClassifiedBizUnitList"),
};

export default competenceCenter;
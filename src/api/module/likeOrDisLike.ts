import request from "@/utils/request";

const likeOrDisLike = {
  /**
   * 文档点赞评论
   * @description 文档点赞按钮 lcp.jdl.com/#/newHand/52875
   * @param {string} url - 当前URL
   * @param {string} like - true: 赞 false: 踩
   * @param {string} reverse - true: 取消 false: 正常
   */
  postDocEvaluationData: (params: Object) =>
    request({ url: "/evaluation/docEvaluation", method: "post", data: params }),
};

export default likeOrDisLike;

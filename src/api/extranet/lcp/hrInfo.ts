import request_noMsg from "@/utils/request_noMsg";

export interface HrInfo {
  [key: string]: any;
}

const hrInfo = {
  /**
   * 获取用户信息
   */
  getUserInfo: () => request_noMsg.get("/hrInfo/getUserInfo"),
};

export default hrInfo;

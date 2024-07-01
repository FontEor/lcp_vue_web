import request_msg from "@/utils/request_msg";

export interface HrInfo {
  [key: string]: any;
}

const hrInfo: HrInfo = {
  /**
   * 获取用户信息
   */
  getUserInfo: () => request_msg.get("/hrInfo/getUserInfo"),
};

export default hrInfo;

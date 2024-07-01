import request_msg from "@/utils/request_msg";

export interface User {
  [key: string]: any;
}

const user: User = {
  /**
   * 内网用户自动化入驻
   */
  saveDeveloper: () => request_msg.post("/user/saveDeveloper"),

  /**
   * 内网获取团队信息
   */
  getTeamListInfo: () => request_msg.post("/user/getTeamListInfo"),
};

export default user;

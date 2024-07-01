import cookies from "./cookies";
import { Cookies } from "./cookies";
import hrInfo from "./hrInfo";
import { HrInfo } from "./hrInfo";
import user from "./user";
import { User } from "./user";

export interface Lcp {
  cookies: Cookies;
  hrInfo: HrInfo;
  user: User;
}

// 内网平台统一注册API
const lcp: Lcp = { cookies, hrInfo, user };

export default lcp;

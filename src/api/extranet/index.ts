import qualification from "./qualification/index";
import user from "./user";
import lcp from "./lcp/index";

export interface ApiExtranet {
  [key: string]: any;
}

// 外网统一注册API
const apiExtranet: ApiExtranet = { qualification, user, lcp };

export default apiExtranet;

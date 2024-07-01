import lcp from "./lcp/index";
import { Lcp } from "./lcp/index";

export interface ApiIntranet {
  lcp: Lcp;
}

// 内网统一注册API
const apiIntranet: ApiIntranet = { lcp };

export default apiIntranet;

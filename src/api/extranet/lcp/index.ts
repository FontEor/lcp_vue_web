import bizapinterface from "./bizapinterface";
import { Bizpinterface } from "./bizapinterface";
import bizunit from "./bizunit";
import { Bizunit } from "./bizunit";
import apiTest from "./apiTest";
import { ApiTest } from "./apiTest";
import hrInfo from "./hrInfo";
import { HrInfo } from "./hrInfo";
import bizmsg from "./bizmsg";
import { Bizmsg } from "./bizmsg";
import bizview from "./bizview";
import { Bizview } from "./bizview";
import workOrder, { WorkOrder } from "./workOrder";
import evaluate from "./evaluate";
import { Evaluate } from "./evaluate";

export interface Lcp {
  bizapinterface: Bizpinterface;
  bizunit: Bizunit;
  apiTest: ApiTest;
  hrInfo: HrInfo;
  bizmsg: Bizmsg;
  bizview: Bizview;
  workOrder: WorkOrder;
  evaluate: Evaluate;
}

// 外网平台统一注册API
const lcp = {
  bizapinterface,
  bizunit,
  apiTest,
  hrInfo,
  bizmsg,
  bizview,
  workOrder,
  evaluate,
};

export default lcp;

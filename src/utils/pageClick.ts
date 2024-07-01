import isIntranet from "@/utils/isIntranet";
interface EnvTable {
  [key: string]: string;
}

const pageClick = (intranetId: string = "", extranetId: string = "") => {
  const intranetEnvTable: EnvTable = {
    prod: `pageclick|keycount|${intranetId}`,
  };
  const extranetEnvTable: EnvTable = {
    prod: `pageclick|keycount|${extranetId}`,
  };
  if (isIntranet()) {
    return intranetId ? intranetEnvTable[window.env.baseEnv] || "" : "";
  } else {
    return extranetId ? extranetEnvTable[window.env.baseEnv] || "" : "";
  }
};
export default pageClick;

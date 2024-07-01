// 根据环境变量判断是否为内网
const hostnameList: string[] = [
  "dev-test-lcp.jdl.com",
  "test-lcp.jdl.com",
  "uat-lcp.jdl.com",
  "lcp.jdl.com",
];

const isIntranet = () => {
  const currentHostname: string = window.location.hostname;
  return hostnameList.includes(currentHostname);
};
export default isIntranet;

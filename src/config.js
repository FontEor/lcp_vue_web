// 开发环境地址
const config = {
  "lcp_vue_web_upgrade_i": "http://test-lcp.jdl.com:8081",
  "lcp_vue_web_upgrade_e": "http://test-cloud.jdl.com:8081",
};

// 线上环境地址
if (process.env.NODE_ENV === "production") {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach((key) => {
    config[key] = window.location.origin;
  });
}

export default config;

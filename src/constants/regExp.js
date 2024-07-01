const regExp = {
  // USF表单相关验证
  normal: /^[a-zA-Z0-9_\-.#\u4e00-\u9fa5]+$/,

  // 检测邮箱
  email: /^[a-zA-Z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,

  // 检测中文
  chinese: /^[\u4e00-\u9fa5]*$/,

  // 域名
  url: /^(http|https)?(:\/\/)?[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/,

  // 字母、数字、下划线
  engNumUnder: /^[a-zA-Z0-9_]*$/,

  // 11位手机号
  mobile: /^1[3456789]{1}[0-9]{9}$/,
};
export default regExp;

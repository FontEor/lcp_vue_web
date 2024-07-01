import request_msg from "@/utils/request_msg";

export interface Cookies {
  [key: string]: any;
}

const cookies: Cookies = {
  erp: {
    /**
     * 内网设置token
     */
    // set_token: (params: Object) =>
    //   request_msg.get("/cookies/erp/set_token", { params }),
    setOidcToken: (params: Object) =>
      request_msg.get("/cookies/erp/setOidcToken", { params }),

    /**
     * 清除jdl.com域下cookies
     */
    logout: (params: Object) =>
      request_msg.post("/cookies/erp/logout", null, { params }),
  },
};

export default cookies;

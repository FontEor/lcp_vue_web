import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import Cookies from "js-cookie";
import store from "@/store/common";
import { IUserState } from "@/store/common/getters";
import Utils from "@/utils/utils";
import request from "@/utils/request";
import { Message } from "@lui/lui-ui";
import { Loading } from "@lui/lui-ui";
import isIntranet from "@/utils/isIntranet";
import { AxiosRequestConfig } from "axios";
import extranetUser from "@/api/extranet/user";
import apiIntranet from "@/api/intranet";
import i18n from "@/locales/index";

type LoadingInstance = {
  close: Function;
};
type RouterBeforeEachNextParams = {
  name: string;
};

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  // 加载动画实例
  public loadingInstance: LoadingInstance | null = null;
  // 前置路由守卫放行参数
  public routerBeforeEachNextParams: RouterBeforeEachNextParams | null = null;
  /**
   * 名字
   */
  public name = "";
  /**
   * 账号头像地址
   */
  public headImg = "";
  /**
   * ERP单点登录获得的临时态
   */
  public ssoServiceTicket = "";
  /**
   * 是否登录 默认时false
   */
  public loginState = false;
  /**
   * 用户的pin，外网核内网共用
   */
  public user_pin = "";
  /**
   * 是否时开发者，默认时no
   */
  public user_develop = "no";

  //--产生的回调地址属性
  public redirectUrl = "";

  /**
   * 行为类型 1:登录 2:注册
   */
  public actionType = 1;

  /**
   * 角色类型 0:子账号 1:主账号
   */
  public roleType = 0;

  to: any;
  from: any;
  roles: any;

  @Mutation
  public SET_LOADING_INSTANCE(loadingInstance: LoadingInstance | null) {
    this.loadingInstance = loadingInstance;
  }
  @Mutation
  public SET_ROUTER_BEFORE_EACH_NEXT_PARAMS(
    routerBeforeEachNextParams: RouterBeforeEachNextParams | null
  ) {
    this.routerBeforeEachNextParams = routerBeforeEachNextParams;
  }
  @Mutation
  private SET_REDIRECT_URL(redirectUrl: string) {
    this.redirectUrl = redirectUrl;
  }
  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }
  @Mutation
  private SET_USER_PIN(user_pin: string) {
    this.user_pin = user_pin;
  }
  @Mutation
  private SET_HEAD_IMG(headImg: string) {
    this.headImg = headImg;
  }
  @Mutation
  private SET_SSO_SERVICE_TICKET(ssoServiceTicket: string) {
    this.ssoServiceTicket = ssoServiceTicket;
  }
  @Mutation
  public SET_USER_DEVELOP(user_develop: string) {
    this.user_develop = user_develop;
  }
  @Mutation
  public SET_LOGIN_STATE(loginState: boolean) {
    this.loginState = loginState;
  }
  @Mutation
  public SET_ACTIONTYPE(actionType: number) {
    this.actionType = actionType;
  }
  @Mutation
  public SET_ROLETYPE(roleType: number) {
    this.roleType = roleType;
  }

  // 内网设置token
  // @Action
  // public async set_token() {
  //   const { ssoServiceTicket } = this;
  //   const ticket = ssoServiceTicket;
  //   const domain = ".jdl.com";
  //   const params = { ticket, domain };
  //   return await apiIntranet.lcp.cookies.erp
  //     .set_token(params)
  //     .catch((error: any) => {
  //       throw new Error(`set_token, ${error}`);
  //     });
  // }
  @Action
  public async setOidcToken() {
    const { ssoServiceTicket } = this;
    const [code, state] = ssoServiceTicket.split(" ");
    const domain = ".jdl.com";
    const params = { code, state, domain };
    return await apiIntranet.lcp.cookies.erp
      .setOidcToken(params)
      .catch((error: any) => {
        throw new Error(`setOidcToken, ${error}`);
      });
  }
  // 清除jdl.com域下cookies
  @Action
  public async logout() {
    const domain = ".jdl.com";
    const params = { domain };
    return await apiIntranet.lcp.cookies.erp
      .logout(params)
      .catch((error: any) => {
        throw new Error(`logout, ${error}`);
      });
  }
  // 内网获取用户信息
  @Action
  public async intranetGetUserInfo() {
    return await apiIntranet.lcp.hrInfo.getUserInfo().catch((error: any) => {
      throw new Error(`intranetGetUserInfo, ${error}`);
    });
  }
  // 内网用户自动化入驻
  @Action
  public async saveDeveloper() {
    return await apiIntranet.lcp.user.saveDeveloper().catch((error: any) => {
      throw new Error(`saveDeveloper, ${error}`);
    });
  }
  // 内网获取团队信息
  @Action
  public async getTeamListInfo() {
    return await apiIntranet.lcp.user.getTeamListInfo().catch((error: any) => {
      throw new Error(`getTeamListInfo, ${error}`);
    });
  }

  // 内网设置token
  // @Action
  // public async handleSetToken() {
  //   this.openLoading();
  //   await this.set_token().catch((error) => {
  //     this.closeLoading();
  //     throw new Error(`handleSetToken, ${error}`);
  //   });
  //   this.closeLoading();
  // }
  @Action
  public async handleSetOidcToken() {
    this.openLoading();
    await this.setOidcToken().catch((error) => {
      this.closeLoading();
      throw new Error(`handleSetOidcToken, ${error}`);
    });
    this.closeLoading();
  }
  // 清除jdl.com域下cookies
  @Action
  public async handleLogout() {
    this.openLoading();
    await this.logout().catch((error) => {
      this.closeLoading();
      throw new Error(`handleLogout, ${error}`);
    });
    this.closeLoading();
  }

  // 开启加载动画
  @Action
  public openLoading() {
    const lock = true;
    const text = "加载中";
    const spinner = "el-icon-loading";
    const background = "rgba(0, 0, 0, 0.7)";
    const options = { lock, text, spinner, background };
    const loadingInstance = Loading.service(options);
    this.SET_LOADING_INSTANCE(loadingInstance);
  }
  // 关闭加载动画
  @Action
  public closeLoading() {
    const { loadingInstance } = this;
    if (!loadingInstance) {
      return;
    }
    loadingInstance.close();
    this.SET_LOADING_INSTANCE(null);
  }
  // 将store里的状态存入sessionStorage
  @Action
  public setSessionStorage() {
    sessionStorage.setItem("store", JSON.stringify(store.state));
  }
  // 设置用户信息
  @Action
  public setUser(options: any) {
    const loginState = true;
    const { headImg, develop, name, userPin, supplierId, supplierCode } =
      options;
    this.SET_LOGIN_STATE(loginState);
    this.SET_HEAD_IMG(headImg);
    this.SET_USER_DEVELOP(develop);
    this.SET_NAME(name);
    this.SET_USER_PIN(userPin);
    Cookies.set("supplierId", supplierId);
    Cookies.set("groupCode", supplierCode);
  }
  // 重置用户信息
  @Action
  public resetUser() {
    const loginState = false;
    const headImg = "";
    const userDevelop = "no";
    const name = "";
    const userPin = "";
    const redirectUrl = "";
    const ssoServiceTicket = "";
    this.SET_LOGIN_STATE(loginState);
    this.SET_HEAD_IMG(headImg);
    this.SET_USER_DEVELOP(userDevelop);
    this.SET_NAME(name);
    this.SET_USER_PIN(userPin);
    this.SET_REDIRECT_URL(redirectUrl);
    this.SET_SSO_SERVICE_TICKET(ssoServiceTicket);
    Cookies.remove("supplierId");
    Cookies.remove("groupCode");
  }
  // 跳转ERP登录页面
  // @Action
  // public openErpPage() {
  //   const { href } = location;
  //   const returnUrl = encodeURIComponent(href);
  //   location.href = `${window.env.domainErp}/sso/login?ReturnUrl=${returnUrl}`;
  // }
  // 内网登录操作
  @Action
  public async intranetCheckLogin() {
    const { loginState } = this;
    if (loginState) {
      return;
    }
    // const { sso_service_ticket } = Utils.queryUrl(location.href);
    // this.SET_SSO_SERVICE_TICKET(sso_service_ticket);
    const { code, state } = Utils.queryUrl(location.href);
    this.SET_SSO_SERVICE_TICKET(code && state ? `${code} ${state}` : "");
    const { ssoServiceTicket } = this;
    if (ssoServiceTicket) {
      // await this.handleSetToken().catch((error) => {
      //   throw new Error(`intranetCheckLogin, ${error}`);
      // });
      await this.handleSetOidcToken().catch((error) => {
        throw new Error(`intranetCheckLogin, ${error}`);
      });
    }
    await this.handleIntranetGetUserInfo().catch((error) => {
      throw new Error(`intranetCheckLogin, ${error}`);
    });
  }
  /**
   * 外网登录操作
   */
  @Action
  public async extranetCheckLogin(gotoUrl: string = "") {
    if (this.loginState) {
      //外网自动化入驻
      if (Number(Cookies.get("supplierId")) === -1) {
        console.log("save out developer");
        return await this.saveOutDeveloper();
      }
    } else {
      return await this.handleExtranetGetUserInfo(gotoUrl);
    }
  }
  // 获取内网用户信息
  @Action
  public async handleIntranetGetUserInfo() {
    this.openLoading();
    const { data } = await this.intranetGetUserInfo().catch((error) => {
      this.closeLoading();
      // this.openErpPage();
      throw new Error(`handleIntranetGetUserInfo, ${error}`);
    });
    const { headImg, develop, name, userPin, supplierId, supplierCode } =
      data || {};
    const options = {
      headImg,
      develop,
      name,
      userPin,
      supplierId,
      supplierCode,
    };
    this.setUser(options);
    const { user_pin } = this;
    this.closeLoading();
    if (!user_pin) {
      Message.error("获取用户信息失败，请重新登录");
      return;
    }
    // 内网自动入驻
    await this.handleSaveDeveloper().catch((error) => {
      throw new Error(`handleIntranetGetUserInfo, ${error}`);
    });
  }
  /**
   * 外网获取用户信息
   */
  @Action
  public async handleExtranetGetUserInfo(gotoUrl: string = "") {
    if (!this.loginState) {
      const response = await extranetUser
        .getUserInfo()
        .catch(async (errorResponse) => {
          const { code, error, message } = errorResponse.data;
          if (code === "999999" && error === "NotLogin") {
            this.closeLoading();
            this.SET_LOGIN_STATE(false);
            await this.iDaasLogin(gotoUrl);
            throw new Error("NotLogin");
          } else {
            message && Message.error(message);
            throw new Error();
          }
        });
      const { data } = response.data;
      const { headImg, develop, name, userPin, supplierId, supplierCode } =
        data;
      this.SET_HEAD_IMG(headImg);
      this.SET_USER_DEVELOP(develop);
      this.SET_NAME(name);
      this.SET_USER_PIN(userPin);
      this.SET_LOGIN_STATE(true);
      Cookies.set("supplierId", supplierId);
      Cookies.set("groupCode", supplierCode);
      if (!this.user_pin) {
        Message.error("获取用户信息失败，请重新登录");
      } else {
        //外网自动化入驻
        if (Number(Cookies.get("supplierId")) === -1) {
          return await this.saveOutDeveloper();
        }
      }
      return response;
    }
  }
  // 内网用户自动化入驻
  @Action
  public async handleSaveDeveloper() {
    this.openLoading();
    await this.saveDeveloper().catch((error) => {
      this.closeLoading();
      throw new Error(`handleSaveDeveloper, ${error}`);
    });
    this.closeLoading();
    const supplierId = Number(Cookies.get("supplierId"));
    if (supplierId !== -1) {
      return;
    }
    await this.handleGetTeamListInfo().catch((error) => {
      throw new Error(`handleSaveDeveloper, ${error}`);
    });
  }
  // 内网获取团队信息
  @Action
  public async handleGetTeamListInfo() {
    this.openLoading();
    const { data } = await this.getTeamListInfo().catch((error) => {
      this.closeLoading();
      throw new Error(`handleGetTeamListInfo, ${error}`);
    });
    this.closeLoading();
    if (Array.isArray(data) && data.length > 0) {
      const { href } = location;
      const redirectUrl = String(Utils.deleteSSOTicket(href));
      this.SET_REDIRECT_URL(redirectUrl);
      const name = "ChooseSupplier";
      this.SET_ROUTER_BEFORE_EACH_NEXT_PARAMS({ name });
    } else {
      const name = "Home";
      this.SET_ROUTER_BEFORE_EACH_NEXT_PARAMS({ name });
    }
  }
  // 内网ERP登出
  @Action
  public async intranetLogout() {
    this.resetUser();
    sessionStorage.clear();
    await this.handleLogout().catch((error) => {
      throw new Error(`intranetLogout, ${error}`);
    });
    const returnUrl = encodeURIComponent(location.origin);
    location.href = `${window.env.domainErp}/sso/logout?ReturnUrl=${returnUrl}`;
  }
  // 外网IDaaS登出
  @Action
  public async extranetLogout() {
    this.resetUser();
    sessionStorage.clear();
    const returnUrl = encodeURIComponent(location.origin);
    location.href = `${window.env.idaasLogoutDomain}/user1/logout?returnUrl=${returnUrl}`;
  }

  /**
   * 外网自动入驻
   */
  @Action
  public async saveOutDeveloper() {
    // 获取国际化语言i18n变量
    let messageInfo = i18n.t("store.common.user.5iwdv6ex8pc1");
    const response = await extranetUser.saveOutDeveloper().catch((error) => {
      Message.error(messageInfo);
      throw new Error(error);
    });
    const { data } = response.data;
    const { supplierId, develop, actionType, roleType } = data;
    //自动入驻后将supplierId的值存入缓存
    Cookies.set("supplierId", supplierId);
    this.SET_USER_DEVELOP(develop);
    this.SET_ACTIONTYPE(actionType);
    this.SET_ROLETYPE(roleType);
    return response;
  }

  /**
   * 进入控制台
   */
  @Action
  public async gotoAdmin() {
    if (isIntranet()) {
      const url = "/user/getSelectedSupplierId";
      const method = "get";
      const config: AxiosRequestConfig = { url, method };
      const response = await request(config).catch((error) => {
        console.log(error);
      });
      if (response) {
        const fromMicroApp = window.__MICRO_APP_ENVIRONMENT__
        const { data } = response;
        if (fromMicroApp) {
          data === -2
            ? (window.location.href = `${window.location.origin}/#/chooseSupplier`)
            : window.microApp.dispatch({ from: 'lcp_vue_web', routeName: 'lcp_web' })
          return;
        }
        // data为-2表示未选择过团队
        const urlHash =
          data === -2 ? "/#/chooseSupplier" : "/admin/#/appManager";
        window.location.href = `${window.location.origin}${urlHash}`;
      }
    } else {
      const url = "/user/getSelectedSupplierId";
      const method = "get";
      const config: AxiosRequestConfig = { url, method };
      const response = await request(config).catch((error) => {
        console.log(error);
      });
      if (response) {
        const { data } = response;
        // data为-2表示未选择过团队
        if (data === -2) {
          //supplierId为-1，不可进入控制台,再次请求自动化入驻接口
          const response = await this.saveOutDeveloper();
          if (response) {
            location.href = `${location.origin}/admin/#/appManager`;
          }
        } else {
          window.location.href = `${window.location.origin}/admin/#/appManager`;
        }
      }
    }
  }

  /**
   * 接入iDaas登录
   */
  @Action
  public async iDaasLogin(gotoUrl: string = "") {
    const response = await extranetUser.getLogin().catch((error) => {
      console.log(`异常信息: ${error}`);
      Message.error("账户IDaas系统出现异常,请联系相关开发人员");
      throw new Error(error);
    });
    const { data } = response;
    const { returnUrl } = data;
    if (returnUrl) {
      const index = returnUrl.indexOf("&returnUrl");
      if (index > -1) {
        window.location.href = `${window.location.origin}`;
        if (gotoUrl) {
          window.location.href =
            returnUrl
              .substring(0, index)
              .concat("&source=WLY_SAAS")
              .concat(`&returnUrl=${encodeURIComponent(gotoUrl)}`) || "";
        } else {
          window.location.href =
            returnUrl
              .substring(0, index)
              .concat("&source=WLY_SAAS")
              .concat(
                `&returnUrl=${encodeURIComponent(window.location.href)}`
              ) || "";
        }
      }
    }
    return response;
  }
}

export const UserModule = getModule(User);

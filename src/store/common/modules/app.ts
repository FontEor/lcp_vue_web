import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import store from "@/store/common/index";
import { SappState } from "@/store/common/getters";

@Module({ dynamic: true, store, name: "sapp" })
class Sapp extends VuexModule implements SappState {
  public sidebar = {
    opened: true,
    showSidebar: true,
  };

  public menus: any = [];

  // 是否显示tab 默认显示
  public isNavbarFixed = true;

  //对接方案审批预览审批流单号
  public approvalNumber:number=0

  //消息文档list
  public messageDocListLen:number=0

  //apidoc菜单长度
  public apiDocListLen:number=0

  @Mutation
  public SET_Api_Doc_List_Len(len: number) {
    this.apiDocListLen = len;
  }

  @Mutation
  public SET_Message_Doc_List_Len(len: number) {
    this.messageDocListLen = len;
  }

  @Mutation
  public SET_Approval_Number(num: number) {
    this.approvalNumber = num;
  }

  @Mutation
  public SET_NAVBAR_FIXED(flag: boolean) {
    this.isNavbarFixed = flag;
  }

  @Mutation
  private SHOW_SIDEBAR() {
    this.sidebar.showSidebar = !this.sidebar.showSidebar;
  }

  @Mutation
  private TOGGLE_SIDEBAR() {
    this.sidebar.opened = !this.sidebar.opened;
  }

  @Action
  public showSideBar() {
    this.SHOW_SIDEBAR();
  }

  @Action
  public toggleSideBar() {
    this.TOGGLE_SIDEBAR();
  }
}

export const SappModule = getModule(Sapp);

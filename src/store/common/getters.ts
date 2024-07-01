export interface IUserState {
  name: string;
  headImg: string;
  ssoServiceTicket: string;
  loginState: boolean;
  user_pin: string;
  user_develop: string;
}

export interface SappState {
  sidebar: {
    opened: Boolean;
    showSidebar: Boolean;
  };
  isNavbarFixed: Boolean;
  approvalNumber:number;
  messageDocListLen:number;
  apiDocListLen:number;
}

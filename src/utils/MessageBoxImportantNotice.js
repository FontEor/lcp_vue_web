import { MessageBox } from "@lui/lui-ui";
import "@/assets/styles/message-box-important-notice.scss";

const message = `<strong>尊敬的开放平台用户您好：</strong></br>接市场公关部通知，物流所有官网、线上网址域名需要切换为jdl.com，目前开放平台域名为：<strong>cloud.jdl.com</strong>。原先的<span style="color:red"> cloud.jdl.cn域名将在【8月31日】下线！！</span></br>若有相关跳转链接涉及老域名，为避免影响业务请尽快替换。谢谢配合！如有疑问可联系技术支持（13366320890）。`;
const title = "重要通知";
const confirmButtonText = "我知道了";
const dangerouslyUseHTMLString = true;
const contentCenter = true;
const customClass = "message-box-important-notice";
const callback = () => {
  localStorage.setItem("messageBoxImportantNoticeFlag", "true");
};
const options = {
  confirmButtonText,
  dangerouslyUseHTMLString,
  contentCenter,
  customClass,
  callback,
};

const messageBoxImportantNotice = () => {
  const messageBoxImportantNoticeFlag = JSON.parse(
    localStorage.getItem("messageBoxImportantNoticeFlag") || "false"
  );
  if (!messageBoxImportantNoticeFlag) {
    MessageBox.alert(message, title, options);
  }
};

export default messageBoxImportantNotice;

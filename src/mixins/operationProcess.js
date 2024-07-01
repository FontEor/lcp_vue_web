import { UserModule } from "@/store/common/modules/user";

export default {
  methods: {
    // 成为开发者
    toBeDevelop() {
      const isDevelop = UserModule.user_develop;
      if (isDevelop === "yes") {
        UserModule.gotoAdmin();
      } else {
        if (UserModule.loginState === false) {
          UserModule.extranetCheckLogin();
          window.location.href = `http://${window.location.host}/admin/#/appManager/createApp`;
        }
      }
    },
  },
};

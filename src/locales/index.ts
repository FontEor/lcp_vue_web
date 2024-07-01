import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en-us.json'
import zh from '@/locales/zh-cn.json'
import enLocale from '@lui/lui-ui/lib/locale/lang/en'
import zhLocale from '@lui/lui-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: {
    'zh-cn': { ...zhLocale, ...zh },
    'en-us': { ...enLocale, ...en }
  }
})

export default i18n
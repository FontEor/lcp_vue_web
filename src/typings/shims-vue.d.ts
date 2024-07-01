declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

declare module '@lui/lui-ui/lib/locale/lang/*' {
  export const elementLocale: any
}

declare module '*.gif' {
  export const gif: any
}

declare module '*.json' {
  const value: any;
  export default value;
}

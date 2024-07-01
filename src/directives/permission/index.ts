import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/common/modules/user'

export const permission: DirectiveOptions = {
  inserted(el, binding) {
    const { value } = binding
    const { roles } = UserModule
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role: any) => permissionRoles.includes(role))
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}

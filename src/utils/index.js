/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time *= 1000
    }
    const exploreName = getExploreName()
    if (exploreName === 'Safari') {
      time = time.replace('T', ' ')
      time = time.replace('.000+0000', '')
      date = new Date(time.replace(/ /g, 'T'))
    } else {
      date = new Date(time)
    }
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 获取浏览器名称
 * @returns {string}
 */
function getExploreName() {
  const { userAgent } = navigator
  if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  } if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
    return 'IE'
  } if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  } if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox'
  } if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1) {
    return 'Safari'
  } if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
    return 'Chrome'
  } if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return 'IE>=11'
  }
  return 'Unkonwn'
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if ((`${time}`).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } if (diff < 3600) {
    // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`
  } if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`
  } if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
  return (
      `${d.getMonth() +
      1
      }月${
      d.getDate()
      }日${
      d.getHours()
      }时${
      d.getMinutes()
      }分`
  )
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    `{"${
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ')
      }"}`
  )
}

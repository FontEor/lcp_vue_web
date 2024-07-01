class LockScroll {
  constructor() {
    this.top = 0;
    this.getBody();
  }
  getBody() {
    this.body = document.body;
  }
  lock() {
    if (!this.body) {
      this.getBody();
    }
    this.top = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
    this.body.style.position = 'fixed';
    this.body.style.top = -this.top + 'px';
    this.body.style.width = '100%';
    if(this.getScrollWith() > 0) {
      this.body.style.overflowY = 'scroll';
    }
    this.body.style.height = `${document.body.clientHeight}px`;
  }
  unlock() {
    if (!this.body) {
      this.getBody();
    }
    this.body.style.position = '';
    this.body.style.top = '';
    this.body.style.width = '';
    this.body.style.overflowY = '';
    this.body.style.height = '';
    window.scrollTo(0, this.top);
  }
  /**
   * 获取滚动条宽度
   * @returns 
   */
  getScrollWith() {
    var wrap = LockScroll.setAttributes(document.createElement('div'), {
      style: {
        width: '200px',
        height: '200px',
        overflow: 'auto',
        position: 'absolute',
        visibility: 'hidden'
      }
    });

    var inner = LockScroll.setAttributes(document.createElement('div'), {
      style: {
        width: '100px',
        height: '2000px'
      }
    });
    document.body.appendChild(wrap);
    wrap.appendChild(inner);
    var w = wrap.offsetWidth - wrap.clientWidth;
    document.body.removeChild(wrap);
    wrap = null;
    inner = null;
    return w;
  }
  /**
   * 设置样式属性
   * @param {HTMLDivElement} elem 
   * @param {object} opts 
   * @returns 
   */
  static setAttributes(elem, opts) {
    for (var key in opts) {
      if (typeof opts[key] == 'string') {
        elem[key] = opts[key];
      } else {
        if (!elem[key]) {
          elem[key] = {};
        }
        LockScroll.setAttributes(elem[key], opts[key]);
      }
    }
    return elem;
  }
}

export default LockScroll
export const lockScroll = new LockScroll();

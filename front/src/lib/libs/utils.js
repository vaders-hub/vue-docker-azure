export const utils = {
  getIndex(el) {
    if (!el.parentNode) {
      return -1;
    }
    let list = el.parentNode.children;
  
    if (!list) {
      return -1;
    }
    
    let indexof = [].indexOf;

    let len = list.length;
  
    if (indexof) {
      return indexof.call(list, el);
    }

    for (let i = 0; i < len; ++i) {
      if (el === list[i]) {
        return i;
      }
    }
    
    return -1;
  },
  
  trigger(el, event, otions = null) {
    const evt = otions ? new CustomEvent(event, otions) : new CustomEvent(event);
    el.dispatchEvent(evt);
  },

  setAttributes(el, attrs) {
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  },

  isPc() {
    let value = false;
    const moSize = 767;
    if (moSize < window.innerWidth) {
      value = true;
    }
    return value;
  },

  keyCode: {
    ENTER: 1,
    SPACE: 32,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
  }
};
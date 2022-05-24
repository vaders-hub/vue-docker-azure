import { mvJs, root } from '../../config/';

class Popup {
  /**
   * Create a Popup
   * @class Popup
   * @param {Element} target - 생성 타겟
   * @description 팝업을 생성 접근성 및 탭키이동 적용
   */
  constructor(target) {
    const el = {
      doc: document,
      popup: target,
      btnClose: null,
      btnConfirm: null,
      focus: null,
      layerPopWrap: null,
      request: null
    };

    this.state = Popup.STATE_CLOSE;

    let focusElArr = [];

    const selector = {    
      btnClose: '.popup-close',
      btnConfirm: '.popup-btn > .btn',
      layerPopWrap: 'div',
      focus: 'a, input, button, .popup'
    };

    const setProperty = () => {
      el.btnClose = el.popup.querySelector(selector.btnClose);
      el.btnConfirm = el.popup.querySelector(selector.btnConfirm);

      el.layerPopWrap = el.popup.querySelector(selector.layerPopWrap);
      // console.log(el.layerPopWrap);

      el.popup.setAttribute('tabindex', 0);

      el.focus = el.popup.querySelectorAll(selector.focus);

      focusElArr = [... el.focus];
      focusElArr.unshift(el.popup);

      focusElArr.forEach((el, idx) => {
        el.setAttribute('data-idx', idx);
      });

    };

    const bind = () => {
      if (el.btnClose) {
        el.btnClose.addEventListener('click', hander.click);
      }
    };

    const unbind = () => {
      if (el.popup) {
        el.btnClose.removeEventListener('click', hander.click);
      }
    };
    
    const init = () => {
      setProperty();

      bind();
    };

    const reInit = () => {
      unbind();

      setProperty();

      bind();
    };

    const hander = {
      click: () => {
        /**
       * @callback click
       * @memberof Popup
       * @description 닫기 버튼 클릭
       */
        method.close();
      },

      keydown: (evt) => {
        /**
        * @callback keydown
        * @memberof Popup
        * @description 팝업 오픈시 tabindex를 제어하기 위함
        */
        if (evt.keyCode !== 9) {
          return;
        }

        let idx = parseInt(document.activeElement.getAttribute('data-idx'));

        if (evt.shiftKey) {
          idx -= 1;
          if (idx < 0) {
            idx = focusElArr.length -1;
          }

        } else {
          idx += 1;

          if (idx >= focusElArr.length) {
            idx = 0;
          }
        }

        focusElArr[idx].focus();

        evt.preventDefault();        
      }
    };

    const method = {
    /**
     * @method open
     * @memberof Popup
     * @description current 팜업 오픈
     */
      open: () => {
        if (this.state === Popup.STATE_OPEN) {
          return;
        }

        el.request = document.activeElement;

        this.state = Popup.STATE_OPEN;

        el.popup.setAttribute('aria-hidden', false);
        
        el.popup.focus();

        el.doc.addEventListener('keydown', hander.keydown);
      },

      /**
     * @method close
     * @memberof Popup
     * @description current 팜업 오픈
     */
      close: () => {
        if (this.state === Popup.STATE_CLOSE) {
          return;
        }

        this.state = Popup.STATE_CLOSE;

        el.popup.setAttribute('aria-hidden', true);

        el.doc.removeEventListener('keydown', hander.keydown);

        el.request.focus();
         
        el.request = null;
      }
    };

    init();

    this.open = method.open;
    this.close = method.close;
    this.reInit = reInit;
  }
}

Popup.STATE_CLOSE = 'close';
Popup.STATE_OPEN = 'open';

class Controller {
  /**
   * @class Controller
   * @memberof Popup
   * @param {Element} target 콘트롤 바인딩 지점
   * @description button, anchor등 팝업을 제어 할수 있는 요소에 대한 이벤트 바인딩
   */
  constructor(target) {
    const el = {
      btn: target
    };

    // eslint-disable-next-line no-unused-vars
    const selector = {};
    const setProperty = () => {};

    const hander = {
      /**
       * @callback click
       * @memberof Controller
       * @description 닫기 버튼 클릭
       */
      click(event) {
        const id = event.currentTarget.getAttribute('data-popup-id');
        popupController.open(`#${id}`);
      } 
    };

    const bind = () => {
      el.btn.addEventListener('click', hander.click);
    };

    const unbind = () => {
      el.btn.removeEventListener('click', hander.click);
    };

    const init = () => {
      setProperty();

      bind();
    };

    
    const reInit = () => {
      unbind();

      setProperty();

      bind();
    };

    init();

    this.reInit = reInit;
  }
}

// 팝업 생성및 콘트롤러 생성
export const popupController = {
  controller(str) {
    [... document.querySelectorAll(str)].forEach((el) => {
      const obj = root.weakMap.get(el);
      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new Controller(el));
      }
    });    
  },

  init(selector) {
    const el = document.querySelector(selector);

    if (!el) {
      return;
    }

    let obj = root.weakMap.get(el);

    if (obj) {
      obj.reInit();
    } else {
      root.weakMap.set(el, new Popup(el));
    }
  },

  open(selector) {
    const el = document.querySelector(selector);

    if (!el) {
      return;
    }

    let popup = root.weakMap.get(el);

    if (!popup) {
      popup = new Popup(el);

      root.weakMap.set(el, popup);
    }

    popup.open();
  },

  close(selector) {
    const el = document.querySelector(selector);

    if (!el) {
      return;
    }

    let popup = root.weakMap.get(el);

    if (!popup) {
      popup = new Popup(el);

      root.weakMap.set(el, popup);
    }

    popup.close();
  }
};

/**
 * @namespace popup
 * @alias mvJS.popup
 * @memberof mvJs
 * @description 팝업용 메소드 묶음
 */
mvJs.popup = {};

/**
 * @param {String} selector - element selector
 * @memberof popup
 * @function init
 * @description poup class init
**/
mvJs.popup.init = (selector) => {
  popupController.init(selector);
};

/**
 * @param {String} selector - element selector
 * @memberof popup
 * @function open
 * @description 선택된 팝업 오픈
**/
mvJs.popup.open = (selector) => {
  popupController.open(selector);
};

/**
 * @param {String} selector - element selector
 * @memberof popup
 * @function close
 * @description 선택된 팝업 닫기
**/
mvJs.popup.close = (selector) => {
  popupController.close(selector);
};
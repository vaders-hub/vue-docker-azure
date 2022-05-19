import { mvJs, root } from '../../config/';

class Tooltip {
  /**
   * Create a Tooltip
   * @class Tooltip
   * @param {Element} target - 생성 타겟
   * @description 툴팁 생성
   */
  constructor(target) {
    const el = {
      target: target,
      btn: null,
      text: null
    };

    const selector = {
      btn: '.tooltip-btn',
      closeBtn: '.tooltip-close',
      text: '.tooltip-txt'
    };

    const handler = {
      /**
       * @callback btnClick
       * @memberof Tooltip
       * @description 오픈 콜백 함수
       */
      btnClick: (evt) => {
        evt.preventDefault();
  
        el.target.classList.toggle('is-active');
      },

      /**
       * @callback closeClick
       * @memberof Tooltip
       * @description 오픈 콜백 함수
       */
      closeClick: function(e) {
        e.preventDefault();

        el.target.classList.remove('is-active');
      }
    };
    
    const method = {
      /**
       * @method setAria
       * @memberof Tooltip
       * @description 접근성 추가
       */
      setAria() {
        el.btn.setAttribute('aria-describedby', el.text.getAttribute('id'));
      }
    };

    const bind = function() {
      el.btn.addEventListener('click', handler.btnClick);

      if (el.closeBtn) {
        el.closeBtn.addEventListener('click', handler.closeClick);
      }
    };

    const unbind = function() {
      el.btn.removeEventListener('click', handler.btnClick);

      if (el.closeBtn) {  
        el.closeBtn.removeEventListener('click', handler.closeClick);
      }
    };

    const setProperty = function() {
      el.btn = el.target.querySelector(selector.btn);

      el.closeBtn = el.target.querySelector(selector.closeBtn);

      el.text = el.target.querySelector(selector.text);
    };

    const init = function() {
      setProperty();

      method.setAria();

      bind();
    };

    /**
   * @function reInit
   * @memberof Tooltip
   * @description 재생성
   */  
    const reInit = () => {

      unbind();

      setProperty();

      method.setAria();

      bind();
    };
    
    init();

    this.reInit = reInit;
  }
}

export const tooltipController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new Tooltip(el));
      }
    });
  }
};

/**
 * @namespace tooltip
 * @alias mvJS.tooltip
 * @memberof mvJs
 * @description 툴팁 제어
 */
mvJs.tooltip = {};
/**
 * @param {String} selector - element selector
 * @memberof tooltip
 * @function init
 * @description 선택된 팝업 닫기
**/
mvJs.tooltip.init = tooltipController.init;
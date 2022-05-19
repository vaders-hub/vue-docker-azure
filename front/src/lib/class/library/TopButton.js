import { mvJs, root } from '../../config';

class TopButton {
  /**
   * Create a TopButton
   * @class TopButton
   * @param {Element} target - 생성 타겟
   * @description 상단 이동 스크롤 버튼
   */
  constructor(target) {
    const el = {
      target: target
    };

    const handler = {
      /**
       * @callback toggleClass
       * @memberof TopButton
       * @description 스크롤이 시작 되면 탑버튼에 scroll 클래스 추가, document 0이 되면 scroll 클래스 제거
       */
      toggleClass: (evt) => {
        if (evt.currentTarget.pageYOffset > 30) {
          el.target.classList.add('scroll');
        } else {
          el.target.classList.remove('scroll');
        }
      },
      /**
       * @callback scrollTop
       * @memberof TopButton
       * @description window scrollTo 0
       */
      scrollTop: () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    const bind = () => {
      window.addEventListener('scroll', handler.toggleClass);
      el.target.addEventListener('click', handler.scrollTop);
    };

    const unbind = () => {
      window.removeEventListener('scroll', handler.toggleClass);
      el.target.removeEventListener('click', handler.scrollTop);
    };

    const setProperty = () => {};

    const init = () => {
      setProperty();

      bind();
    };

    /**
   * @function reInit
   * @memberof TopButton
   * @description 상단 이동 스크롤 버튼 재생성
   */  
    const reInit = () => {

      unbind();

      setProperty();

      bind();
    };
    
    init();

    this.reInit = reInit;
  }
}

export const topButtonController = {
  init: (selector) => {
    [...document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);
      
      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new TopButton(el));
      }
    });
  }
};

/**
 * @namespace topButton
 * @alias mvJS.topButton
 * @memberof mvJs
 * @description 상단 이동 스크롤 버튼 생성
 */
mvJs.topButton = {};
/**
 * @param {String} selector - element selector
 * @memberof topButton
 * @function init
 * @description 상단 이동 스크롤 버튼 인터페이스 모음
**/
mvJs.topButton.init = topButtonController.init;
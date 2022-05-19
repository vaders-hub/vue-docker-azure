import { mvJs, root } from '../../config';

class DataText {
  /**
   * Create a DataText
   * @class DataText
   * @param {Element} target - 생성 타겟
   * @description data-text 속성(property) 이 있는 경우엔 해당 엘리먼트에 텍스트 영역에 문구 추가
   */
  constructor(target) {
    const el = {
      target: target,
      textContent : null
    };

    let obj = JSON.parse(el.target.dataset.text);
    let textArr = obj.text.split('|');
    let first = parseInt(obj.show);
    
    const bind = () => {};

    const unbind = () => {};

    const setProperty = () => {
      el.target.textContent = textArr[first - 1];
    };

    const init = () => {
      setProperty();
      
      bind();
    };

    /**
     * @function reInit
     * @memberof DataText
     * @description 재생성
    */  
    const reInit = () => {

      unbind();

      setProperty();

      bind();
    };

    /**
     * @function show
     * @memberof DataText
     * @param {Number} num 넘버
     * @description 파라미터에 따라서 문자배열의 텍스트 변경
    */  
    const show = (num) => {
      el.target.textContent = textArr[num - 1];
    };
    
    init();

    this.show = show;
    this.reInit = reInit;
  }
}

export const dataTextController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new DataText(el));
      }
    });
  }
};

/**
 * @namespace dataText
 * @alias mvJS.dataText
 * @memberof mvJs
 * @description data-text 속성 사용하기, JS에서 값들을 변경할 것입니다.
 */
mvJs.dataText = {};
/**
 * @param {String} selector - element selector
 * @memberof dataText
 * @function init
 * @description DataText 인스턴스 생성
**/
mvJs.dataText.init = dataTextController.init;
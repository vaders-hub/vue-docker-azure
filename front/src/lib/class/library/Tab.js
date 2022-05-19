import { mvJs, root } from '../../config';

class Tab {
  /**
   * Create a Tab
   * @class Tab
   * @param {Element} target - 생성 타겟
   * @description .js-tab 클래스가 있는 ui에 적용
   */
  constructor(target) {
    const el = {
      tabWrap: target,
      tabPanelList : null,
      tabList : null
    };

    const selector = {
      tabPanel : 'div[role=tabpanel]',
      tabBtn: 'div[role=tablist] > button[role=tab]',
      tabUL : 'ul[role=tablist] > li[role=presentation] > button[role=tab]'
    };

    const handler = {
      /**
       * @callback clickTab
       * @memberof Tab
       * @description Tab클릭 시 해당 aria-selected="true"로 변경 및 role="tabpanel"은 aria-hidden="false"로 변경
       */
      clickTab: (evt) => {
        evt.preventDefault();

        [...el.tabList].forEach((el) => {
          el.setAttribute('aria-selected', 'false');
          if (el.parentElement.tagName === 'LI') {
            el.parentElement.classList.remove('is-active');
          } else {
            el.classList.remove('is-active');
          }
        });    

        //.js-tab 에서 활성화 된 role="tab" 항목은 aria-selected="true"로 변경
        evt.target.setAttribute('aria-selected', 'true');
        if (evt.target.parentElement.tagName === 'LI') {
          evt.target.parentElement.classList.add('is-active');
        } else {
          evt.target.classList.add('is-active');
        }

        [...el.tabPanelList].forEach((el) => {
          el.setAttribute('aria-hidden', 'true');
        });  
        //.js-tab 에서 활성화 된 role="tabpanel"은 aria-hidden="false"로 변경
        const panelId = evt.target.getAttribute('aria-controls');
        document.querySelector('#' + panelId).setAttribute('aria-hidden', 'false');
      }
    };

    const bind = () => {
      if (el.tabList) {
        [...el.tabList].forEach((el) => {
          el.addEventListener('click', handler.clickTab);
        });  
      }
    };

    const unbind = () => {
      if (el.tabList) {
        [...el.tabList].forEach((el) => {
          el.removeEventListener('click', handler.clickTab);
        });  
      }
    };

    const setProperty = () => {
      el.tabPanelList = el.tabWrap.querySelectorAll(selector.tabPanel);
      if (el.tabWrap.firstElementChild.tagName === 'UL') {
        //ul > li 구조로 사용 할 경우
        el.tabList = el.tabWrap.querySelectorAll(selector.tabUL);
      } else {
        //div > button 구조로 사용 할 경우
        el.tabList = el.tabWrap.querySelectorAll(selector.tabBtn);
      }
    };

    const init = () => {
      setProperty();

      bind();
    };

    /**
   * @function reInit
   * @memberof Tab
   * @description 재생성
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

export const tabController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new Tab(el));
      }
    });
  }
};

/**
 * @namespace tab
 * @alias mvJS.tab
 * @memberof mvJs
 * @description tab 제어
 */
mvJs.tab = {};
/**
 * @param {String} selector - element selector
 * @memberof tab
 * @function init
 * @description tab 인터페이스 모음
**/
mvJs.tab.init = tabController.init;
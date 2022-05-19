import { mvJs, root } from '../../config';
import { gsap, Cubic, ScrollToPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollToPlugin);

class ScrollMenu {
  /**
   * Create a ScrollMenu
   * @class ScrollMenu
   * @param {Element} target - 생성 타겟
   * @description 마우스로 드래그해서 스크롤을 할 수 있는 메뉴 생성
   */
  constructor(target) {
    const el = {
      target: target,
      linkParentUl: null,
      linkAnchor : null
    };

    const selector = {
      linkAnchor: '.scroll-menu > ul > li > a',
      linkParentUl: '.scroll-menu > ul'
    };

    let position = {
      startX: 0,
      walk: 0,
      scrollLeft: 0,
      mouseDown: false
    };

    const handler = {
      /**
       * @callback clickAnchor
       * @memberof ScrollMenu
       * @description menu-item 클릭 시 해당 menu-item에 is-active class 추가
      */
      clickAnchor: (evt) => {
        evt.preventDefault();
        method.move(evt.target);
      },
      // 해당 ul element에서 마우스 버튼을 눌렀을 때 발생합니다.
      mouseDown: (evt) => {
        evt.preventDefault();
        position = {
          mouseDown : true,
          // 전체 문서를 기준으로 current mouse X position을 표시합니다. clientX과 같습니다.
          startX : evt.pageX - evt.currentTarget.offsetLeft,
          // 셀렉터에 해당하는 요소의 가로스크롤 값을 지정합니다.
          scrollLeft : evt.currentTarget.scrollLeft,
          // 마우스의 움직임을 지정합니다.
          walk : 0
        };
        // element에서 href="#"을 사용하면 페이지가 상단으로 이동하는 문제가 발생합니다. 해결 방법이에요.
        if (evt.target.tagName === 'A') {
          evt.target.setAttribute('href', 'javascript:;');
        }
      },
      mouseMove: (evt) => {
        if (position.mouseDown) {
          let newPageX = evt.pageX - evt.currentTarget.offsetLeft;
          // 마우스가 얼마나 움직였는지 계산합니다.
          position.walk = newPageX - position.startX;
          // 셀렉터의 가로스크롤 값을 계산하여 다시 지정하기
          evt.currentTarget.scrollLeft = position.scrollLeft - position.walk;
        }
      },
      // 해당 ul element에서 눌렀던 마우스 버튼을 떼었을 때 발생합니다.
      mouseUp: (evt) => {
        position.mouseDown = false;
        // element가 a 태그, 마우스의 움직음 없을땐 click handler 호출합니다.
        if (evt.target.tagName === 'A' && position.walk === 0) {
          handler.clickAnchor(evt);
        }
      }
    };
    
    const method = {
      move(target) {
        if (!target) {
          return;
        }

        let active = el.target.querySelector('li.is-active');
        if (active) {
          active.classList.remove('is-active');
        }

        let li = target.parentElement;
        li.classList.add('is-active');

        let middle = window.innerWidth / 3;

        let targetEl = el.target;

        if (middle > li.offsetLeft + target.scrollLeft) {
          middle = li.offsetLeft;
        }

        gsap.to(targetEl.querySelector('ul'), { 
          scrollTo: {x: li.offsetLeft - middle},
          duration: 0.4, 
          ease: Cubic.easeInOut
        });
      },
      moveActive() {
        let active = el.target.querySelector('li.is-active');
        if (active) {
          let middle = window.innerWidth / 3;
          let targetEl = el.target;
  
          if (middle > active.offsetLeft) {
            middle = active.offsetLeft;
          }

          gsap.to(targetEl.querySelector('ul'), { 
            scrollTo: {
              x: active.offsetLeft - middle, 
              autoKill: true
            },
            duration: 0.4, 
            ease: Cubic.easeInOut
          });
        }
      }
    };

    const bind = () => {
      el.linkParentUl.addEventListener('mousedown', handler.mouseDown);
      el.linkParentUl.addEventListener('mousemove', handler.mouseMove);
      el.linkParentUl.addEventListener('mouseup', handler.mouseUp);
    };

    const unbind = () => {
      el.linkParentUl.removeEventListener('mousedown', handler.mouseDown);
      el.linkParentUl.removeEventListener('mousemove', handler.mouseMove);
      el.linkParentUl.removeEventListener('mouseup', handler.mouseUp);
    };

    const setProperty = () => {
      el.linkAnchor = el.target.querySelectorAll(selector.linkAnchor);      
      el.linkParentUl = el.target.querySelector(selector.linkParentUl);
    };

    const init = () => {
      setProperty();

      bind();

      method.moveActive();
    };

    /**
   * @function reInit
   * @memberof ScrollMenu
   * @description ScrollMenu 인스턴스 재생성
   */  
    const reInit = () => {

      unbind();

      setProperty();

      bind();
      
      method.moveActive();
    };
    
    init();

    this.reInit = reInit;
  }
}

export const scrollMenuController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new ScrollMenu(el));
      }
    });
  }
};

/**
 * @namespace scrollMenu
 * @alias mvJS.scrollMenu
 * @memberof mvJs
 * @description 마우스로 드래그해서 스크롤을 할 수 있는 메뉴 제어
 */
mvJs.scrollMenu = {};
/**
 * @param {String} selector - element selector
 * @memberof scrollMenu
 * @function init
 * @description ScrollMenu 인스턴스 생성
**/
mvJs.scrollMenu.init = scrollMenuController.init;
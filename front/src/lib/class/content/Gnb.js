import { mvJs, root } from '../../config'

class Gnb {
  /**
   * Create a Gnb
   * @class Gnb
   * @param {Element} target - 생성 타겟
   * @description GNB 메뉴 활성화 class
   */
  constructor(target) {
    const el = {
      target: target,
      gnbBtn: null,
      menu: null,
      menuClose: null,
      menuDepth1: null,
      menuPin: null,
      wrap: null,
    }

    const selector = {
      gnbBtn: '.btn-menu',
      menu: '.menu',
      menuClose: '.menu__close',
      menuDepth1: '.menu__depth1',
      menuPin: '.menu__util-btn--pin',
      wrap: '.wrap',
    }

    const handler = {
      /**
       * @callback setActiveClass
       * @memberof Gnb
       * @description btn-menu 활성화 시 .is-active 적용
       */
      setActiveClass: (evt) => {
        el.target.classList.add('is-active')
        evt.target.setAttribute('aria-expanded', true)
        el.menu.setAttribute('aria-hidden', false)
      },
      closeMenu: () => {
        el.target.classList.remove('is-active')
        el.gnbBtn.setAttribute('aria-expanded', false)
        el.menu.setAttribute('aria-hidden', true)
        el.gnbBtn.focus()
      },
      setActiveMenu: (evt) => {
        ;[...el.menuDepth1].forEach((element) => {
          element.classList.remove('is-active')
        })
        evt.target.classList.add('is-active')
      },
      // .menu__pin-btn 클릭 시 .pin-fixed 추가 및 .menu__close 버튼에 disabled 속성 추가
      togglePinClass: () => {
        el.wrap.classList.toggle('pin-fixed')
        el.menuClose.toggleAttribute('disabled')
      },
    }

    const bind = () => {
      if (el.gnbBtn && el.menuClose) {
        el.gnbBtn.addEventListener('click', handler.setActiveClass)
        el.menuClose.addEventListener('click', handler.closeMenu)
        ;[...el.menuDepth1].forEach((element) => {
          element.addEventListener('click', handler.setActiveMenu)
        })
        el.menuPin.addEventListener('click', handler.togglePinClass)
      }
    }

    const unbind = () => {
      if (el.gnbBtn && el.menuClose) {
        el.gnbBtn.removeEventListener('click', handler.setActiveClass)
        el.menuClose.removeEventListener('click', handler.closeMenu)
        ;[...el.menuDepth1].forEach((element) => {
          element.removeEventListener('click', handler.setActiveMenu)
        })
        el.menuPin.removeEventListener('click', handler.togglePinClass)
      }
    }

    const setProperty = () => {
      el.gnbBtn = el.target.querySelector(selector.gnbBtn)
      el.menu = el.target.querySelector(selector.menu)
      el.menuClose = el.target.querySelector(selector.menuClose)
      el.menuDepth1 = el.target.querySelectorAll(selector.menuDepth1)
      el.menuPin = el.target.querySelector(selector.menuPin)
      setTimeout(() => {
        el.wrap = document.querySelector(selector.wrap)
      }, 300)
    }

    const init = () => {
      setProperty()

      bind()
    }

    /**
     * @function reInit
     * @memberof Gnb
     * @description Gnb 인스턴스 재생성
     */
    const reInit = () => {
      unbind()

      setProperty()

      bind()
    }

    init()

    this.reInit = reInit
  }
}

export const gnbController = {
  init: (selector) => {
    ;[...document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el)

      if (obj) {
        obj.reInit()
      } else {
        root.weakMap.set(el, new Gnb(el))
      }
    })
  },
}

/**
 * @namespace gnb
 * @alias mvJS.gnb
 * @memberof mvJs
 * @description Gnb 메뉴 활성화
 */
mvJs.gnb = {}
/**
 * @param {String} selector - element selector
 * @memberof gnb
 * @function init
 * @description Gnb 인스턴스 생성
 **/
mvJs.gnb.init = gnbController.init

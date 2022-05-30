import { mvJs, root } from '../../config'

class Header {
  /**
   * Create a Header
   * @class Header
   * @param {Element} target - 생성 타겟
   * @description Header keyvisual 영역에서 투명 타입 적용
   */
  constructor(target) {
    const el = {
      target: target,
      bgFull: null,
    }

    const selector = {
      bgFull: '.bg-full',
    }

    const handler = {
      /**
       * @callback scrollHeader
       * @memberof Header
       * @description bg-full 영역에서만 header--transparent 클래스 추가
       */
      scrollHeader: () => {
        if (!el.bgFull) {
          return
        }

        let headerHeight = el.target.offsetHeight
        let gateHeight = parseInt(el.bgFull.clientHeight) - headerHeight
        let gateScrollTop = -parseInt(el.bgFull.getBoundingClientRect().top)

        if (
          (gateScrollTop >= 0 && gateScrollTop <= gateHeight) ||
          headerHeight === Math.abs(gateScrollTop)
        ) {
          // el.target.classList.add('header--transparent');
        } else {
          el.target.classList.remove('header--transparent')
        }
      },
    }

    const bind = () => {
      document.addEventListener('scroll', handler.scrollHeader)
    }

    const unbind = () => {
      document.removeEventListener('scroll', handler.scrollHeader)
    }

    const setProperty = () => {
      el.bgFull = document.querySelector(selector.bgFull)
      handler.scrollHeader()
    }

    const init = () => {
      setProperty()

      bind()
    }

    /**
     * @function reInit
     * @memberof Header
     * @description Header 재생성
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

export const headerController = {
  init: (selector) => {
    ;[...document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el)

      if (obj) {
        obj.reInit()
      } else {
        root.weakMap.set(el, new Header(el))
      }
    })
  },
}

/**
 * @namespace header
 * @alias mvJS.header
 * @memberof mvJs
 * @description Header 메뉴 활성화
 */
mvJs.header = {}
/**
 * @param {String} selector - element selector
 * @memberof header
 * @function init
 * @description Header 인스턴스 생성
 **/
mvJs.header.init = headerController.init

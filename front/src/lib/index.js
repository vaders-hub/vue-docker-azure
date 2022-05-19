import './libs/polyfill.js'
import { mvJs, root } from './config/'

// libray content
import { popupController } from './class/library/Popup'
import { tooltipController } from './class/library/Tooltip'
import { selectmenuController } from './class/library/Selectmenu'
import { accordionController } from './class/library/Accordion.js'
import { tabController } from './class/library/Tab.js'
import { topButtonController } from './class/library/TopButton.js'
import { scrollMenuController } from './class/library/ScrollMenu.js'
import { dataTextController } from './class/library/DataText.js'
import { customSwiperController } from './class/library/CustomSwiper.js'
import { gatewayController } from './class/content/Gateway.js'
import { gnbController } from './class/content/Gnb.js'

// babel seting
import 'core-js/stable'
import 'regenerator-runtime/runtime'

//
// https://www.npmjs.com/package/perfect-scrollbar
// https://www.npmjs.com/package/text-to-speech-js
// https://www.npmjs.com/package/svg4everybody

const selector = {
  swiper: '.swiper',
  popup: '[data-popup-id]',
  toolTip: '.tooltip',
  select: '.select-wrap > select',
  accordion: '.accordion',
  tab: '.js-tab',
  topButton: '.btn-top',
  scrollMenu: '.scroll-menu',
  dataText: '[data-text]',
  gateway: '.gateway',
  gnbCon: '.header__util',
}

const hander = {
  contentReady() {
    dataTextController.init(selector.dataText)

    popupController.controller(selector.popup)

    selectmenuController.init(selector.select)

    tooltipController.init(selector.toolTip)

    accordionController.init(selector.accordion)

    tabController.init(selector.tab)

    topButtonController.init(selector.topButton)

    scrollMenuController.init(selector.scrollMenu)

    customSwiperController.init(selector.swiper)

    gatewayController.init(selector.gateway)

    if (document.querySelector(`${selector.gnbCon} .btn-menu`)) {
      gnbController.init(selector.gnbCon)
    }
  },

  contentLoad() {},
}

/**
 * @function init
 * @alias common.init
 * @memberof common
 * @description 전체 스크립트 재 설정
 */

mvJs.common = {}
mvJs.common.init = hander.contentReady

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hander.contentReady)
} else {
  hander.contentReady()
}

document.addEventListener('load', hander.contentLoad)

export { hander }

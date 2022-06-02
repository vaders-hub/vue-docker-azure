import { mvJs, root } from '../../config/';
import gsap from 'gsap/all';
class Accordion {
  /**
   * Create a Accordion
   * @class Accordion
   * @param {Element} target - 생성 타겟
   * @description accordion 생성
   */
  constructor(target) {
    const el = {
      target: target,
      accordion: null,
      dataOptions: null,
      optionId: null,
      openType: null,
      animation: null,
      animationSpeed: null,
      accHeader: null,
      accPanel: null,
      accButton: null
    };

    const selector = {
      dataOptions: 'data-options',
      accHeader: '.accordion-header',
      accPanel: '.accordion-panel',
      accButton: '.accordion-btn',
      accItem: '.accordion-item'
    };

    const setProperty = () => {
      el.accordion = el.target;

      el.accButton = el.target.querySelectorAll(selector.accButton);

      if (el.target.dataset.options) {
        el.dataOptions = JSON.parse(el.target.dataset.options);
        const id = el.dataOptions.id ? el.dataOptions.id : 'accordion';
        el.optionId = id + '_' + Accordion.index;

        el.openType = el.dataOptions.openType
          ? el.dataOptions.openType
          : 'single';

        el.animation = el.dataOptions.animation;

        el.animationSpeed = el.dataOptions.animationSpeed;
      } 
      
      el.accHeader = el.target.querySelectorAll(selector.accHeader);
      el.accPanel = el.target.querySelectorAll(selector.accPanel);

      [...el.accHeader].forEach((singleAccHeader, index) => {
        singleAccHeader.setAttribute('id', el.optionId + '_btn_' + (index + 1));
        el.accPanel[index].setAttribute('aria-labelledby', singleAccHeader.id);         
        // It seems that an additional weakMap instance is created, so data is saved
        singleAccHeader.querySelector('button').dataText = root.weakMap.get(singleAccHeader.querySelector('[data-text]'));
      });

      [...el.accPanel].forEach((singleAccPanel, index) => {
        singleAccPanel.setAttribute('id', el.optionId + '_panel_' + (index + 1));
        el.accHeader[index]
          .querySelector('.accordion-btn')
          .setAttribute('aria-controls', singleAccPanel.id);
      });

      [... el.target.querySelectorAll('.accordion-item')].forEach(element => {
        const panel = element.querySelector(selector.accPanel);
        const putton = element.querySelector(selector.accHeader).querySelector('button');
        panel.style.overflow = 'hidden';
        if (putton.getAttribute('aria-expanded') === 'false') {
          gsap.to(panel, 0, {
            height: 0
          });
        }
        panel.style.display = 'block';
      });

      Accordion.index++;
    };

    const handler = {
      /**
       * @callback btnClick
       * @memberof Accordion
       * @description accordian 오픈 및 닫기
       */
      btnClick: (e) => {
        const btnArrow = e.currentTarget.getAttribute('aria-expanded');

        const elId = e.currentTarget.getAttribute('aria-controls');
        e.preventDefault();

        if (el.openType === 'multi') {
          if (btnArrow === 'true') {
            e.currentTarget.setAttribute('aria-expanded', 'false');

            e.currentTarget.dataText ? e.currentTarget.dataText.show(1) : null;

            method.close(elId);
          } else {
            e.currentTarget.setAttribute('aria-expanded', 'true');

            e.currentTarget.dataText ? e.currentTarget.dataText.show(2) : null;

            method.open(elId);
          }
        } else if (el.openType === 'single' && btnArrow === 'false') {
          const accSingleEl = el.target.querySelectorAll(selector.accItem);
          const thisItem = e.currentTarget.closest(selector.accItem);

          [...accSingleEl].forEach((element) => {
            if (thisItem === element) {
              e.currentTarget.setAttribute('aria-expanded', 'true');
              e.currentTarget.dataText ? e.currentTarget.dataText.show(2) : null;

              method.open(elId);
              return;
            }
            element.querySelector('.accordion-btn').setAttribute('aria-expanded', 'false');
            element.querySelector('.accordion-btn').dataText ? element.querySelector('.accordion-btn').dataText.show(1) : null;

            const notActiveBtn = element.querySelector('.accordion-btn');
            const notActiveElId = notActiveBtn.getAttribute('aria-controls');
            method.close(notActiveElId);
          });
        }
      }
    };

    const method = {
      /**
       * @callback open
       * @memberof Accordion
       * @description accordion 오픈 
       */
      open : (elId) => {
        const activePanelElement = el.target.querySelector('#' + elId);
        activePanelElement.style.height = '';
        const height = activePanelElement.offsetHeight;
        activePanelElement.style.height = '0px';

        if (el.animation) {
          gsap.killTweensOf(activePanelElement);
          gsap.to(activePanelElement, el.animationSpeed, {
            height: height,
            ease: 'power1.out',
            onComplete: () => {
              activePanelElement.style.height = '';
            }
          });
        } else {
          activePanelElement.style.height = 'auto';
        }
        activePanelElement.setAttribute('aria-hidden', 'false');
      },

      /**
       * @callback close
       * @memberof Accordion
       * @description accordion 닫기 
       */
      close : (elId) => {
        const activePanelElement = el.target.querySelector('#' + elId);
        if (el.animation) {
          gsap.killTweensOf(activePanelElement);
          gsap.to(activePanelElement, el.animationSpeed, {
            height: '0px',
            ease: 'power1.out'
          });
        } else {
          activePanelElement.style.height = '0px';  

        }
        activePanelElement.setAttribute('aria-hidden', 'true');
      }
    };

    const bind = () => {
      if (el.accButton) {
        el.accButton.forEach(el => {
          el.addEventListener('click', handler.btnClick);
        });
      }
    };

    const unbind = () => {
      if (el.accButton) {
        el.accButton.forEach(el => {
          el.removeEventListener('click', handler.btnClick);
        });
      }
    };

    const init = () => {
      setProperty();

      bind();
    };

    /**
     * @function reInit
     * @memberof Accordion
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

Accordion.index = 0;
Accordion.ANIMATION_TYPE ='animation';
Accordion.ANIMATION_NONE = 'animationNone';
Accordion.animationType = Accordion.ANIMATION_TYPE;

//  Accordion  생성
export const accordionController = {
  init: (selector) => {

    [...document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new Accordion(el));
      }
    });
  }
};

/**
 * @namespace accordion
 * @alias mvJS.accordion
 * @memberof mvJs
 * @description Accordion method들의 셋
 */
mvJs.accordion = {};
/**
 * @param {String} selector - element selector
 * @memberof accordion
 * @function init
 * @description accordion class init
 **/
mvJs.accordion.init = (selector) => {
  accordionController.init(selector);
};

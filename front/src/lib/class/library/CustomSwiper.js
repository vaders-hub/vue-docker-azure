import { mvJs, root } from '../../config/';
import { utils } from '../../libs/utils';
import Swiper from 'swiper';

const weakMap = root.weakMap;

class CustomSwiper {
  /**
   * Create a CustomSwiper
   * @class CustomSwiper
   * @param {Element} target - 생성 타겟
   * @description 외부 라이브러리, 제작사 : {@link https://swiperjs.com/} 
  */
  constructor(target) {
    const el = {
      swiperWrapper: target,
      container: target.querySelector('.swiper-container'),
      swiperSlide: target.querySelectorAll('.swiper-slide'),
      btnStop: target.querySelector('.btn--stop, .swiper-button-autoplay--pause'),
      btnPlay: target.querySelector('.btn--Play, .swiper-button-autoplay--play'),
      progressBar: target.querySelector('.swiper-pagination-progressbar-fill'),
      paginationEl: target.querySelector('.swiper-pagination'),
      popupEl: null
    };
    let optionData = {};

    if (el.swiperWrapper.dataset.options) {
      optionData = JSON.parse(el.swiperWrapper.dataset.options);
    }

    // 기본 옵션 설정
    let options = {
      loop: false,
      speed: 300,
      autoplay: false,
      spaceBetween: 0,
      observer: true,
      observeParents: true,
      autoHeight: false,
      breakpoints: {},
      a11y: false
    };

    if (optionData.lazy) {
      options.lazy = optionData.lazy;
    }

    // loop
    if (optionData.loop) {
      if (el.swiperWrapper.classList.contains('main-visual__swiper') && el.popupEl) {
        options.loop = false;
      } else {
        options.loop = true;
      }
      // options.loop = true;
    }

    if (optionData.speed) {
      options.speed = optionData.speed;
    }

    // spacebetween
    if (optionData.spaceBetween > 0) {
      options.spaceBetween = optionData.spaceBetween;
    }

    // slidesPerView
    if (optionData.slidesPerView) {
      options.slidesPerView = optionData.slidesPerView;
    }

    // autoplay
    if (optionData.autoplay > 0) {
      if (!el.swiperWrapper.querySelector('.swiper-autoplay')) {
        el.btnStop = el.swiperWrapper.querySelector('.btn--stop, .swiper-button-autoplay--pause');
        el.btnPlay = el.swiperWrapper.querySelector('.btn--Play, .swiper-button-autoplay--play');
      }

      if (el.swiperWrapper.classList.contains('main-visual__swiper') && el.popupEl) {
        options.autoplay = false;
      } else {
        options.autoplay = {
          delay: optionData.autoplay,
          disableOnInteraction: false
        };
      }
    }

    // autoHeight
    if (optionData.autoHeight) {
      options.autoHeight = optionData.autoHeight;
    }

    if (optionData.progress) {
      options.progress = true;
    }

    // next prev
    if (el.swiperWrapper.querySelector('.swiper-button-prev')) {
      options.navigation = {
        nextEl: el.swiperWrapper.querySelector('.swiper-button-next'),
        prevEl: el.swiperWrapper.querySelector('.swiper-button-prev')
      };
    }

    // breakpoints
    if (optionData.breakpoints) {
      options.breakpoints = optionData.breakpoints;
    }

    if (optionData.mode) {
      options.mode = optionData.mode;
    }
    //effect fade
    if (optionData.effect) {
      options.effect = optionData.effect;
    }

    // pagination
    if (optionData.pagination === 'all') {
      options.pagination = {
        el: el.paginationEl,
        type: 'custom',
        clickable: true,
        renderCustom: function(swiper, current, total) {
          let paging = '';
          for (let i = 1; i <= total; i++) {
            if (current === i) {
              paging += `<button class="swiper-pagination-bullet swiper-pagination-bullet-active" type="button" aria-label="Go to slide ${i}"></button>`;
            } else {
              paging += `<button class="swiper-pagination-bullet" aria-label="Go to slide ${i}"></button>`;
            }
          }

          paging += `<div class="swiper-paging">
            <div class="paging">
              <span class="swiper-pagination-current">${current}</span>/<span class="swiper-pagination-total">${total}</span>
            </div>
          </div>`;

          // '</span></div><button type="button" class="swiperMore">더보기</button></div>';
          return paging;
        }
      };
    } else if (optionData.pagination === 'fraction') {
      el.paginationEl.style.display = '';

      options.pagination = {
        el: el.paginationEl,
        type: 'custom',
        renderCustom: function(swiper, current, total) {
          return `<div class="swiper-paging">
              <div class="paging">
                <span class="swiper-pagination-current">${current}</span>/<span class="swiper-pagination-total">${total}</span>
              </div>
            </div>`;
          //'<button type="button" class="swiperMore">더보기</button></div>'
        }
      };
    } else if (el.paginationEl) {
      // el.paginationEl.style.display = '';
      options.pagination = {
        el: el.paginationEl,
        renderBullet: function(i) {
          return `<button class="swiper-pagination-bullet swiper-pagination-bullet-active" type="button" aria-label="Go to slide ${i + 1}"></button>`;
          //'<button type="button" class="swiperMore">더보기</button></div>'
        },
        // type: 'bullets',
        clickable: true //선택 가능 하도록 변경
      };
    }
    options.on = {
      slideChangeTransitionStart: function() {
        if (el.progressBar) {
          const total = this.slides.length - this.el.querySelectorAll('.swiper-slide-duplicate').length;
          if (options.loop === false && Object.keys(options.breakpoints).length > 0) {
            //breakpoints 값 있을 경우
            el.progressBar.style.transform = `scale(${(this.snapIndex + 1) / this.snapGrid.length} ,1)`;
          } else {
            el.progressBar.style.transform = `scale(${(this.realIndex + 1) / total} ,1)`;
          }
        }

        //접근성
        [...el.swiperSlide].forEach(element => {
          //접근성 > .swiper-slide 에  aria-hidden 추가
          if (options.slidesPerView !== 'auto') {
            element.setAttribute('aria-hidden', 'true');
          }

          if (options.autoplay !== false) {
            element.removeAttribute('tabindex');
          }
        });

        //접근성 > .swiper-slide 에  aria-hidden 추가
        if (options.slidesPerView !== 'auto') {
          // el.swiperWrapper.querySelector('.swiper-slide-active').setAttribute('aria-hidden', 'false');
          const slide = el.swiperWrapper.querySelector('.swiper-slide-active');
          if (slide) {
            slide.setAttribute('aria-hidden', 'false');
          }
        }

        //autoplay 옵션 있을 경우 swiper-slide-active 에 포커스 갈 경우 정지 기능 추가, 해당 element 포커스 갈 수 있도록 tabindex 지정
        if (options.autoplay !== false) {
          const slide = el.swiperWrapper.querySelector('.swiper-slide-active');
          if (slide) {
            slide.setAttribute('tabindex', '0');  
          }
        }

        //메인 스와이퍼 모션
        if (el.swiperWrapper.classList.contains('main-visual__swiper')) {
          if (el.swiperWrapper.querySelector('.main-swiper-slide-active')) {
            el.swiperWrapper.querySelector('.main-swiper-slide-active').classList.remove('main-swiper-slide-active');
          }

          if (el.swiperWrapper.querySelector('.swiper-slide-active')) {
            el.swiperWrapper.querySelector('.swiper-slide-active').classList.add('main-swiper-slide-active');
          }
        }
      },

      init: function() {
        if (el.progressBar) {
          const total = this.slides.length - this.el.querySelectorAll('.swiper-slide-duplicate').length;

          if (options.loop === false && Object.keys(options.breakpoints).length > 0) {
            //breakpoints 값 있을 경우
            el.progressBar.style.transform = `scale(${(this.snapIndex + 1) / this.snapGrid.length} ,1)`;
          } else {
            el.progressBar.style.transform = `scale(${1 / total} ,1)`;
          }
        }
        if (options.slidesPerView !== 'auto') {
          [...el.swiperSlide].forEach(element => {
            element.setAttribute('aria-hidden', 'true');
          });
          el.swiperWrapper.querySelector('.swiper-slide-active').setAttribute('aria-hidden', 'false');
        }

        //autoplay 옵션 있을 경우 swiper-slide-active 에 포커스 갈 경우 정지 기능 추가, 해당 element 포커스 갈 수 있도록 tabindex 지정
        if (options.autoplay !== false) {
          el.swiperWrapper.querySelector('.swiper-slide-active').setAttribute('tabindex', '0');
        }
      },
      slideChangeTransitionEnd: function() {
        // pagination custom 일 경우 keyboard 이벤트 추가
        if (options.pagination && options.pagination.type === 'custom') {
          let btnBullet = el.swiperWrapper.querySelectorAll('.swiper-pagination-bullet');
          [...btnBullet].forEach(element => {
            element.addEventListener('keydown', handler.keydownBtnBullet);
          });
        }
      }
    };

    const handler = {
      resize: () => {

        if (options.mode === CustomSwiper.MODE_PC) {
          if (utils.isPc() && swiper.destroyed) {
            this.init();
          } else if (!utils.isPc() && !swiper.destroyed) {            
            el.swiperWrapper.setAttribute('data-initIdx', swiper.activeIndex);
            swiper.destroy();

            el.swiperWrapper.removeAttribute('style');
            let slides = el.swiperWrapper.querySelectorAll('.swiper-slide');
            [...slides].forEach((element) => {
              element.removeAttribute('style');
            });
          }
        } else if (options.mode === CustomSwiper.MODE_MO) {
          if (utils.isPc() && !swiper.destroyed) {            
            el.swiperWrapper.setAttribute('data-initIdx', swiper.activeIndex);
            swiper.destroy();

            el.swiperWrapper.removeAttribute('style');

            let slides = el.swiperWrapper.querySelectorAll('.swiper-slide');
            [...slides].forEach((element) => {
              element.removeAttribute('style');
            });
          } else if (!utils.isPc() && swiper.destroyed) {
            this.init();
          }
        }
      },
      resizeSlide: () => {
        if (utils.isPc() && el.container.getAttribute('data-wrapSlideCnt') === '3') {
          //PC 슬라이드 설정
          el.container.setAttribute('data-wrapSlideCnt', 5);

          //기존 swiper 삭제
          swiper.destroy();

          weakMap.get(el.swiperWrapper).swiper.destroy();

          setProperty();
          this.init();
        } else if (!utils.isPc() && el.container.getAttribute('data-wrapSlideCnt') === '5') {
          //MOB 슬라이드 설정
          el.container.setAttribute('data-wrapSlideCnt', 3);

          //기존 swiper 삭제
          swiper.destroy();

          weakMap.get(el.swiperWrapper).swiper.destroy();

          setProperty();
          this.init();
        }

        if (!utils.isPc()) {
          let oSelf = this;
          setTimeout(() => {
            //기존 swiper 삭제
            oSelf.swiper.destroy();

            weakMap.get(el.swiperWrapper).swiper.destroy();
      
            //swiper-slide set slide
            method.setOptBoxRelated();

            oSelf.init();
          }, 100);
        }
      },
      resizeSlideCertification: () => {
        if (utils.isPc()) {
          let oSelf = this;
          setTimeout(() => {
            //기존 swiper 삭제
            oSelf.swiper.destroy();

            weakMap.get(el.swiperWrapper).swiper.destroy();

            //swiper-slide set slide
            method.setOptBoxCertification();

            oSelf.init();
          }, 100);
        }
      },
      clickBtnPause: (e) => {    
        if (!swiper.destroyed) {
          swiper.autoplay.stop();
        }
        el.swiperWrapper.setAttribute('isPlay', false);

        if (e.currentTarget.classList.contains('on')) {
          e.currentTarget.classList.remove('on');

          el.btnPlay.classList.add('on');

          el.btnPlay.focus();
        }
      },
      clickBtnPlay: (e) => {
        if (!swiper.destroyed) {
          swiper.autoplay.start();
        }
        el.swiperWrapper.setAttribute('isPlay', true);

        if (e.currentTarget.classList.contains('on')) {
          e.currentTarget.classList.remove('on');

          el.btnStop.classList.add('on');

          el.btnStop.focus();
        }
      },
      mouseoverSwiper: () => {
        //정지 버튼 안 눌었을 경우에만 체크
        if (el.swiperWrapper.getAttribute('isPlay') === 'true') {
          if (!swiper.destroyed) {
            swiper.autoplay.stop();
          }
        }
      },
      mouseleaveSwiper: () => {
        //정지 버튼 안 눌었을 경우에만 체크
        if (el.swiperWrapper.getAttribute('isPlay') === 'true') {
          if (!swiper.destroyed) {
            swiper.autoplay.start();
          }
        }
      },
      focusinSwiper: () => {
        //정지 버튼 안 눌었을 경우에만 체크
        if (el.swiperWrapper.getAttribute('isPlay') === 'true') {
          if (!swiper.destroyed) {
            swiper.autoplay.stop();
          }
        }
      },
      focusoutSwiper: () => {
        //정지 버튼 안 눌었을 경우에만 체크
        if (el.swiperWrapper.getAttribute('isPlay') === 'true') {
          if (!swiper.destroyed) {
            swiper.autoplay.start();
          }
        }
      },
      keydownBtnBullet: (e) => {
        if (e.keyCode === 13) {
          let index = Array.from(e.currentTarget.parentNode.querySelectorAll('.swiper-pagination-bullet')).indexOf(
            e.currentTarget
          );
            //슬라이드 이동
          if (!swiper.destroyed) {
            swiper.slideTo(index, options.speed);
          }
          //슬라이드 이동 후 포커스 이동
          setTimeout(() => {
            el.swiperWrapper.querySelectorAll('.swiper-pagination-bullet')[index].focus();
          }, options.speed);
        }
      }
    };
    
    const method = {
      wrapSlide: () => {
        //swiper-slide 태그로 묶음
        let wrapCnt;
        if (utils.isPc()) {
          wrapCnt = 5;
          el.container.setAttribute('data-wrapSlideCnt', 5);
        } else {
          wrapCnt = 3;
          el.container.setAttribute('data-wrapSlideCnt', 3);
        }

        let nodesToWrap = document.getElementsByClassName('.thumbnail-carousel-box__swiper-slide');
        let node, wrapper;

        [...nodesToWrap].forEach((element, index) => {
          node = nodesToWrap[index];

          if (index % wrapCnt === 0) {
            wrapper = document.createElement('div');
            wrapper.className = 'swiper-slide';
            node.parentNode.insertBefore(wrapper, node);
          }
          node.parentNode.removeChild(node);
          wrapper.appendChild(node);
        });

        el.swiperSlide = target.querySelectorAll('.swiper-slide');
      },
      unWrapSlide: () => {
        let wrapper = document.querySelector('.swiper-wrapper');
        let nodesToWrap = document.querySelectorAll('.thumbnail-carousel-box__swiper-slide');
        let node;

        [...nodesToWrap].forEach(() => {
          node = nodesToWrap[0];
          wrapper.insertBefore(node, null);
        });

        [...el.swiperSlide].forEach(element => {
          element.parentNode.removeChild(element);
        });
      },
      setOptBoxRelated: () => {
        if (!utils.isPc()) {
          //MOB
          options.spaceBetween = 36;
          options.width = window.innerWidth - 72; // 슬라이드 넓이 = 전체 화면 사이즈 - 슬라이드padding값
        } else {
          //option 설정
          if (options.spaceBetween) {
            delete options.spaceBetween;
          }

          if (options.width) {
            delete options.width;
          }
        }
      },
      setOptBoxCertification: () => {
        if (utils.isPc()) {
          //슬라이드 넓이, margin-left 값 설정

          const slideCertification = document.querySelectorAll('.certification__swiper-slide-inner')[1];
          const wSldie = Math.ceil(slideCertification.getBoundingClientRect().width);

          let leftMargin = window.getComputedStyle(slideCertification).getPropertyValue('margin-left');
          leftMargin = leftMargin.match(/\d+/);

          const optWidth = Number(leftMargin) * 3 + wSldie * 3;
          options.width = optWidth;
          document.querySelector('.certification__swiper').style.marginLeft =
                  Math.ceil(document.querySelector('.text--type2').getBoundingClientRect().x) + 'px';
        } else {
          document.querySelector('.certification__swiper').style.marginLeft = '';
        }
      },
      initSwiper: () => {
        if (weakMap.get(el.swiperWrapper)) {
          let obj = weakMap.get(el.swiperWrapper).swiper;
  
          if (!obj.destroyed) {
            weakMap.get(el.swiperWrapper).swiper.destroy();
          }
        }
  
        //PC 모드 일 경우 ::  PC -> MOB -> PC 화면 리사이즈 시 처음 PC 모드에서 봤던 idx 로 이동
        let initIdx = el.swiperWrapper.getAttribute('data-initIdx');
        if (initIdx) {
          options.initialSlide = Number(initIdx);
          el.swiperWrapper.removeAttribute('data-initIdx');
        }
        
        if (el.swiperSlide.length > 1) {
          //함수 호출 여러번 될 경우 :: 스타일 초기화
          if (el.paginationEl) {
            el.paginationEl.style.display = '';
          }
          if (options.navigation) {
            options.navigation.nextEl.style.display = '';
            options.navigation.prevEl.style.display = '';
          }
        
          if (el.progressBar) {
            el.progressBar.parentElement.style.display = '';
          }
        
          if (el.swiperWrapper.querySelector('.swiper-btn-wrap')) {
            el.swiperWrapper.querySelector('.swiper-btn-wrap').style.display = '';
          }
          //스와이프 1개 이상 일 경우에만 작동
          swiper = new Swiper(el.container, options);
  
        } else {
          //슬라이드가 하나 일때 style="display:none" 추가
          if (el.swiperWrapper.querySelector('.swiper-notification')) {
            el.swiperWrapper.querySelector('.swiper-notification').remove();
          }
        
          if (el.paginationEl) {
            el.paginationEl.style.display = 'none';
          }
        
          options.navigation.nextEl.style.display = 'none';
          options.navigation.prevEl.style.display = 'none';
        
          if (el.progressBar) {
            el.progressBar.parentElement.style.display = 'none';
          }
        
          if (el.swiperWrapper.querySelector('.swiper-btn-wrap')) {
            el.swiperWrapper.querySelector('.swiper-btn-wrap').style.display = 'none';
          }
        }
      }
    };

    const bind = () => {
      // 모드 변화
      if (options.mode) {
        window.addEventListener('resize', handler.resize);
        handler.resize();
      }
    
      //모드 변경 시 슬라이드 묶음 변경
      if (el.container.classList.contains('thumbnail-carousel-box__swiper-wrap')) {
        window.addEventListener('resize', handler.resizeSlide);
      }
    
      //품질 경영 슬라이드 리사이즈
      if (el.swiperWrapper.classList.contains('certification__swiper')) {
        window.addEventListener('resize', handler.resizeSlideCertification);
      }
    
      //정지 버튼 클릭
      if (el.btnStop) {
        el.btnStop.addEventListener('click', handler.clickBtnPause);
      }
    
      //재생 버튼 클릭
      if (el.btnPlay) {
        el.btnPlay.addEventListener('click', handler.clickBtnPlay);
      }
    
      //autoplay 옵션 있는 경우 hover/foucs 시 swiper 정지
      if (options.autoplay !== false) {
        el.swiperWrapper.setAttribute('isPlay', true);

        el.swiperWrapper.addEventListener('mouseover', handler.mouseoverSwiper);
        el.swiperWrapper.addEventListener('mouseleave', handler.mouseleaveSwiper);

        el.swiperWrapper.addEventListener('focusin', handler.focusinSwiper);
        el.swiperWrapper.addEventListener('focusout', handler.focusoutSwiper);
      }
    
      // pagination custom 일 경우 keyboard 이벤트 추가
      if (options.pagination && options.pagination.type === 'custom') {
        let btnBullet = el.swiperWrapper.querySelectorAll('.swiper-pagination-bullet');
        [...btnBullet].forEach(element => {
          element.addEventListener('keydown', handler.keydownBtnBullet);
        });
      }
    };

    const unbind = () => {
      // 모드 변화 이벤트 제거
      if (options.mode) {
        window.removeEventListener('resize', handler.resize);
      }
    
      //모드 변경 시 슬라이드 묶음 변경 이벤트 제거
      if (el.container.classList.contains('thumbnail-carousel-box__swiper-wrap')) {
        window.removeEventListener('resize', handler.resizeSlide);
      }
    
      //품질 경영 슬라이드 리사이즈 이벤트 제거
      if (el.swiperWrapper.classList.contains('certification__swiper')) {
        window.removeEventListener('resize', handler.resizeSlideCertification);
      }
    
      //정지 버튼 클릭 이벤트 제거
      if (el.btnStop) {
        el.btnStop.removeEventListener('click', handler.clickBtnPause);
      }
    
      //재생 버튼 클릭 이벤트 제거
      if (el.btnPlay) {
        el.btnPlay.removeEventListener('click', handler.clickBtnPlay);
      }
    
      //autoplay 옵션 있는 경우 hover/foucs 시 swiper 정지 이벤트 제거
      if (options.autoplay !== false) {
        el.swiperWrapper.removeEventListener('mouseover', handler.mouseoverSwiper);
        el.swiperWrapper.removeEventListener('mouseleave', handler.mouseleaveSwiper);

        el.swiperWrapper.removeEventListener('focusin', handler.focusinSwiper);
        el.swiperWrapper.removeEventListener('focusout', handler.focusoutSwiper);
      }

      // pagination custom 일 경우 keyboard 이벤트 추가
      if (options.pagination && options.pagination.type === 'custom') {
        let btnBullet = el.swiperWrapper.querySelectorAll('.swiper-pagination-bullet');
        [...btnBullet].forEach(element => {
          element.removeEventListener('keydown', handler.keydownBtnBullet);
        });
      }
    };

    const setProperty = () => {
      //effect fade 일 경우 해당 클래스 추가
      if (optionData.effect === 'fade') {
        el.swiperWrapper.classList.add('swiper-fade');
      }

      if (el.container.classList.contains('thumbnail-carousel-box__swiper-wrap')) {
        if (el.swiperSlide.length > 0) {
          //swiper-slide 태그 삭제
          method.unWrapSlide();
        }
        //swiper-slide 태그로 묶음
        method.wrapSlide();

        //swiper-slide set swiper option
        method.setOptBoxRelated();
      }

      //품질 경영 슬라이드
      if (el.swiperWrapper.classList.contains('certification__swiper')) {
        //swiper-slide set swiper option
        method.setOptBoxCertification();
      }
    };

    let swiper;

    const init = () => {
      setProperty();

      method.initSwiper();

      bind();
    };

    /**
   * @function reInit
   * @memberof CustomSwiper
   * @description 재생성
   */  
    const reInit = () => {

      unbind();

      setProperty();

      method.initSwiper();

      bind();
    };
    
    init();

    this.swiper = swiper;
    this.init = init;
    this.reInit = reInit;
  }
}

export const customSwiperController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new CustomSwiper(el));
      }
    });
  }
};

/**
 * @namespace customSwiper
 * @alias mvJS.customSwiper
 * @memberof mvJs
 * @description swiper 인터페이스 모음
 */
mvJs.customSwiper = {
  /**
   * @param {String} selector - element id
   * @memberof customSwiper
   * @function init
   * @description 스와이퍼 생성
  */
  init: id => {
    const el = document.querySelector(id);

    if (el === undefined) {
      return;
    }

    const obj = weakMap.get(el);

    if (obj) {
      obj.reInit();
    } else {
      weakMap.set(el, new CustomSwiper(el));
    }
  },

  /**
   * @param {String} selector - element id
   * @memberof customSwiper
   * @function getActiveIndex
   * @description 선택 스와이퍼 활성화 슬라이드 인텍스 리턴
   * @return { Number }
   */
  getActiveIndex: id => {
    const el = document.querySelector(id);
    let active = null;

    if (el) {
      active = weakMap.get(el).swiper.activeIndex;
    }

    return active;
  },
  /**
   * @param {String} selector - element id
   * @memberof customSwiper
   * @function update
   * @description swiper 업데이트
   */
  update: id => {
    const el = document.querySelector(id);

    if (el) {
      weakMap.get(el).swiper.update();
    }
  },

  /**
   * @param {String} selector - element id
   * @memberof customSwiper
   * @function destroy
   * @description 스와이퍼 제거
   */
  destroy: id => {
    const el = document.querySelector(id);

    // destroy(deleteInstance, cleanStyles)
    if (el) {
      weakMap.get(el).swiper.destroy();
    }
  },

  /**
   * @param {String} selector - element id
   * @memberof customSwiper
   * @function getSwiper
   * @return { swiperInstance } 
   * @description 생성된 swiper instance 전달
   */
  getSwiper: id => {
    const el = document.querySelector(id);
    let swiperInstance = null;

    if (el) {
      swiperInstance = weakMap.get(el).swiper;
    }

    return swiperInstance;
  },
  /**
   * @param {String} selector - element id
   * @memberof customSwiper
   * @function setPlay
   * @description swiper start autoplay
   */
  setPlay: id => {
    const el = document.querySelector(id);
    let optionData = JSON.parse(el.dataset.options);
    let swiper = weakMap.get(el).swiper;
    swiper.params.autoplay.delay = optionData.autoplay;
    swiper.params.autoplay.disableOnInteraction = false;

    swiper.autoplay.start();
  }
};

CustomSwiper.MODE_ALL = 'all';
CustomSwiper.MODE_PC = 'pc';
CustomSwiper.MODE_MO = 'mo';
CustomSwiper.mode = CustomSwiper.MODE_ALL;
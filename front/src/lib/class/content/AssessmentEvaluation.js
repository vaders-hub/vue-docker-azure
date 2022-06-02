import { mvJs, root } from '../../config';
import gsap, {Power1} from 'gsap/all';

class AssessmentEvaluation {
  /**
    * Create a AssessmentEvaluation
    * @class AssessmentEvaluation
    * @param {Element} target - 생성 타겟
    * @description AssessmentEvaluation slideup class
    */
  constructor(target) {
    const el = {
      target            :   target,
      assessmentSteps   :   null
    };

    const selector = {
      assessmentSteps  :   '.assessment-step'
    };

    const handler = {
      /**
         * @callback btnClick
         * @memberof AssessmentEvaluation
         * @description assessment step 오픈
         */
      btnClick: () => {
        stepOpen();
      }
    };

    const stepOpen = () => {
      let contentEl = target.querySelector('.assessment-step__contents');

      gsap.set(contentEl, {
        autoAlpha: 1,
        height: 'auto',
        paddingBottom : 35
      });
      gsap.from(contentEl, .5, {
        height: 0,
        padding: 0,
        ease: Power1.out
      });

      el.target.classList.add('is-expand');
      el.target.classList.remove('is-collapse');
      contentEl.style.paddingBottom = '35px';
    };

    const stepClose = () => {
      let contentEl = el.target.querySelector('.assessment-step__contents');
      let rect = contentEl.getBoundingClientRect().height;

      gsap.timeline({defaults: {duration: .5}})
        .fromTo(contentEl, {height: rect}, {
          height: 0,
          paddingBottom: 0,
          ease: Power1.out,
          duration: .5
        })
        .add(() => {
          el.target.classList.add('is-collapse');
          el.target.classList.remove('is-expand');
        }, '>+0.1');
    };

    const bind = () => {
      const child = target.querySelector('.assessment-step__selected-data');
      if (child) {
        child.addEventListener('click', handler.btnClick);
      }
    };

    const unbind = () => {

    };

    const setProperty = () => {
      el.assessmentSteps = document.querySelectorAll(selector.assessmentSteps);
    };

    const init = () => {

      setProperty();

      bind();

    };

    const reInit = () => {

      unbind();

      setProperty();

      bind();

    };

    init();

    this.reInit = reInit;
    this.stepClose = stepClose;
    this.stepOpen = stepOpen;
  }
}

export const assessmentEvaluationController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);

      if (obj) {
        obj.reInit();
      } else {
        root.weakMap.set(el, new AssessmentEvaluation(el));
      }
    });
  },

  /**
   * assessment step을 닫을 애니메이션 호출할  함수
   * @param {*} id
   */
  assessmentStepClose: (id) => {
    let el = document.getElementById(id);
    const obj = root.weakMap.get(el);
    obj.stepClose();
  },

  /**
   * assessment step을 닫을 애니메이션 호출할  함수
   * @param {*} id
   */
  assessmentStepOpen: (id) => {
    let el = document.getElementById(id);
    const obj = root.weakMap.get(el);
    obj.stepOpen();
  }
};

/**
 * @namespace assessmentEvaluation
 * @alias mvJS.assessmentEvaluation
 * @memberof mvJs
 * @description assessmentEvaluation assessment-step class을 사용한 slide up animation 한다
 */
mvJs.assessmentEvaluation = {};

/**
  * @param {String} id - ID of the element
  * @memberof assessmentEvaluation
  * @function init
  * @description  AssessmentEvaluation 인스턴스 생성
 **/
mvJs.assessmentEvaluation.init = assessmentEvaluationController.init;

/**
  * @param {String} id - ID of the element
  * @memberof assessmentEvaluation
  * @function init
  * @description  assessment step 가까운 행동
 **/
mvJs.assessmentEvaluation.stepClose = assessmentEvaluationController.assessmentStepClose;

/**
  * @param {String} id - ID of the element
  * @memberof assessmentEvaluation
  * @function init
  * @description  assessment step 오픈 액션
 **/
mvJs.assessmentEvaluation.stepOpen = assessmentEvaluationController.assessmentStepOpen;

export const mvJs = (() => {
  if (!window.mvJs) {
    window.mvJs = {};
  }
  
  /**
   * @namespace mvJs
   * @global
   * @description 글로벌 변수, 외부 오픈 함수 모음
   */
  return window.mvJs;
})();

let _weakMap = new WeakMap();
export const root = {
  weakMap: _weakMap
};

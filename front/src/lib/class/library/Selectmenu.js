import { mvJs, root } from '../../config/';
import { utils } from '../../libs/utils';

class Selectmenu {
  constructor(target) {
    const datasetOpt = target.dataset.options? JSON.parse(target.dataset.options) : {};

    let index = 0;
    let optionsLength = 0;
    let activeIndex = 0;
    let timer = 0;
    let docBind = false;
    let initialize = false;
    let isOpen = false;
    let firstActive = 0;

    const scrollPos = {
      scroll: 0,
      content: 0,
      screen: 0,
      barScroll: 0,
      barPos: 0
    };

    const el = {
      select: target,
      doc: document,
      button: null,
      titleSpan: null,
      container: null,
      options: null,
      listWrap: null,
      lsit: null,
      listItem: null,
      listAnchor: null,
      scrollbarWrap: null,
      scrollbar: null
    };

    const className = {
      open: 'select-open',
      buttonOpen: 'select-button-open',
      button: 'select-button',
      title: 'select-title',
      listWrap: 'select-list-wrap',
      list: 'select-list',
      listItem: 'select-list-item',
      anchor: 'select-list-achor',
      selected: 'select-selected',
      disabled: 'select-disabled',
      listItemDisabled: 'select-list-item-disabled',
      scrollbarWrap: 'scrollbar-wrap',
      scrollbar: 'scrollbar'
    };

    const POS_DOWN ='down';

    // eslint-disable-next-line no-unused-vars
    const POS_UP = 'up';

    this.direction = datasetOpt.direction ? datasetOpt.direction : POS_DOWN;

    const selector = {
      container: '.select-wrap'
    };

    const setProperty = () => {
      el.select.style.display = 'none';

      method.createOptions(el.options);

      el.options = el.select.options;
      optionsLength = el.select.options.length;

      el.listItem = el.list.querySelectorAll(`.${className.listItem}`);
      el.listAnchor = el.list.querySelectorAll(`.${className.anchor}`);

      if (datasetOpt.msg) {
        el.listItem[0].style.display = 'none';
      }

      if (el.select.disabled) {
        el.button.classList.add(className.disabled);
        el.button.setAttribute('aria-disabled', true);
      }
    };

    const bind = () => {
      if (el.select.disabled) {
        return;
      }

      el.button.addEventListener('click', handler.click.button);

      [... el.listItem].forEach(element => {
        if (!element.getAttribute('aria-disabled')) {
          element.addEventListener('click', handler.click.listItem);
          element.addEventListener('mouseover', handler.hover.listItem);
        }
      });
      
      el.container.addEventListener('keydown', handler.keyDown);
    };

    const unbind = () => {
      el.button.removeEventListener('click', handler.click.button);

      [... el.listItem].forEach(element => {
        element.removeEventListener('click', handler.click.listItem);
        element.removeEventListener('mouseover', handler.hover.listItem);
      });

      el.container.removeEventListener('keydown', handler.keyDown);
      // 스크롤 체크
      // el.list.addEventListener('mousewheel', handler.wheel, false);
      // el.list.addEventListener('DOMMouseScroll', handler.wheel, false);
    };

    const init = () => {
      Selectmenu.index++;

      method.createElement();

      setProperty();

      bind();
    };

    const reInit = () => {
      index = 0;
      activeIndex = 0;
      docBind = false;
      initialize = false;
      firstActive = 0;

      unbind();

      const hidden = el.select.querySelector('[hidden]');
      if (hidden) {
        el.select.removeChild(hidden);
      }

      el.container.removeChild(el.container.querySelector(`.${className.button}`));
      el.container.removeChild(el.container.querySelector(`.${className.listWrap}`));

      method.createElement();

      setProperty();

      bind();
    };

    // aria-disabled="true" , ui-state-disabled ui-menu-item
    // console.log(elem.options);
    const method = {
      createElement: () => {
        el.container = el.select.closest(selector.container);

        if (el.select.id) {
          el.container.id = `mv_select_${el.select.id}`;
        } else {
          el.container.id = `mv_select_${Selectmenu.index}`;
        }
        
        el.titleSpan = document.createElement('span');
        el.titleSpan.className = className.title;

        // button
        el.button = document.createElement('button');
        el.button.className = className.button;
        utils.setAttributes(el.button, {
          'tabindex': 0,
          'role': 'combobox',
          'aria-expanded': false,
          'aria-autocomplete': 'list',
          'aria-owns': el.container.id,
          'aria-haspopup': true,
          'type': 'button',
          'aria-disabled': false
        });
        
        el.button.id = `${el.container.id}_button`;
        el.button.appendChild(el.titleSpan);

        el.list = document.createElement('ul');
        el.list.className = className.list;
        utils.setAttributes(el.list, {
          'aria-hidden': true,
          'aria-labelledby': el.button.id,
          'role': 'listbox',
          'tabindex': 0
        });
        el.list.id = `${el.container.id}_list`;
        el.list.style.maxHeight = `${datasetOpt.maxHeight}px`;
        el.list.style.overflow = 'hidden';

        el.listWrap = document.createElement('div');
        el.listWrap.className = className.listWrap;
        el.listWrap.appendChild(el.list);
        
        el.container.appendChild(el.button);
        el.container.appendChild(el.listWrap);

        // method.activeCheck();
      },
      
      createScroll: () => {
        if (datasetOpt.maxHeight < el.list.scrollHeight) {
          const scrollbarWrap = document.createElement('div');
          scrollbarWrap.className = className.scrollbarWrap;
          el.scrollbarWrap = scrollbarWrap;

          const scrollbar = document.createElement('div');
          scrollbar.className = className.scrollbar;
          scrollbarWrap.appendChild(scrollbar);

          el.scrollbar = scrollbar;
          el.listWrap.appendChild(scrollbarWrap);

          scrollPos.content = el.list.scrollHeight;
          scrollPos.screen = el.listWrap.offsetHeight - parseInt(window.getComputedStyle(el.listWrap, null).getPropertyValue('padding-bottom')) - parseInt(window.getComputedStyle(el.listWrap, null).getPropertyValue('padding-top'));
          scrollPos.scroll = scrollPos.content - scrollPos.screen;  

          el.scrollbarWrap.style.height = `${scrollPos.screen}px`;

          const barH = scrollPos.screen / 3;
          el.scrollbar.style.height = `${barH}px`;
          el.scrollbar.style.top = 0;

          scrollPos.barScroll = scrollPos.screen - el.scrollbar.offsetHeight; 
          
          el.list.addEventListener('mousewheel', handler.wheel, false);
          el.list.addEventListener('DOMMouseScroll', handler.wheel, false);
          el.list.addEventListener('scroll', handler.scroll);
          el.scrollbar.addEventListener('mousedown', handler.mousedown);
        }
      },

      setElPos: () => {
        if (this.direction === POS_DOWN) {
          el.listWrap.style.top = `${el.button.offsetHeight}px`;
        } else {
          el.listWrap.style.top = `${-el.listWrap.offsetHeight}px`;
        }
      },

      createOptions: () => {
        const sel = el.select.querySelector('option[selected]');
        if (sel) {
          el.select.activeIndex = utils.getIndex(sel);
          // console.log(el.select.activeIndex);
        } else {
          el.select.activeIndex = 0;
        }

        if (datasetOpt.msg) {
          const op = document.createElement('option');
          op.textContent = datasetOpt.msg;
          utils.setAttributes(op, {
            'hidden': '',
            'selected': ''
          });

          el.select.insertAdjacentElement('afterbegin', op);

          if (!sel) {
            el.titleSpan.textContent = datasetOpt.msg;
            activeIndex = 0;
            el.select.activeIndex = 0;
            firstActive = 1;
          } else {
            el.select.activeIndex = el.select.activeIndex + 1;
          }
        }

        const list = el.select.options;
        // console.log(el.select.activeIndex);
        

        for (let i = 0; i < list.length; i++) {
          const li = document.createElement('li');
          const a = document.createElement('a');

          const option = list[i]; 
          a.className = className.anchor;
          
          
          if (datasetOpt.multiText) {
            method.changeMultiText(option, a);
          } else {
            a.innerText = option.textContent;
          }

          a.setAttribute('role', 'option');
          a.id = `${el.container.id}_anchor_${index++}`;

          li.classList.add(className.listItem);

          // console.log(option, 'selected xxx ', el.select.activeIndex);
          if (el.select.activeIndex === i) {
            if (datasetOpt.multiText) {
              method.changeMultiText(option, el.titleSpan);
            } else {
              el.titleSpan.textContent = option.textContent;
            }
            // 
            a.classList.add(className.selected);
            activeIndex = i; 
          }

          if (option.disabled) {
            li.setAttribute('aria-disabled', true);
            li.classList.add(className.listItemDisabled);
          }

          li.appendChild(a);

          el.list.appendChild(li);
        }
      },

      changeMultiText: (option, text) => {
        const tArr = option.textContent.split(datasetOpt.multiText);
        // console.log(option.classList);

        if (tArr.length > 1) {
          let str = '';
          tArr.forEach((s, idx) => {
            // console.log(idx);
            str += `<span class=${option.classList[idx]}>${s}</span>`;
          });

          text.innerHTML = str;
        } else {
          text.innerText = option.textContent;
        }
      },

      change: (idx) => {
        const option = el.options[idx];

        if (datasetOpt.multiText) {
          method.changeMultiText(option, el.titleSpan);
        } else {
          el.titleSpan.textContent = option.textContent;
        }

        if (el.select.selectedIndex !== idx) {
          utils.trigger(el.select, 'change');
        }
        el.select.selectedIndex = idx;        
      },

      toggle : () => {
        if (el.listWrap.classList.contains(className.open)) {
          method.close();
        } else {
          method.open();
        }
      },

      open : () => {
        isOpen = true;

        method.docClick();

        el.listWrap.classList.add(className.open);
        el.button.classList.add(className.buttonOpen);
        el.button.setAttribute('aria-expanded', true);
        el.list.setAttribute('aria-hidden', false);

        if (!initialize) {
          initialize = true;
          method.createScroll();

          method.setElPos();
        }
      },

      close : () => {
        isOpen = false;

        method.docClickClear();
        el.listWrap.classList.remove(className.open);
        el.button.classList.remove(className.buttonOpen);
        el.button.setAttribute('aria-expanded', false);
        el.list.setAttribute('aria-hidden', true);
      },

      docClick: () => {
        clearTimeout(timer);

        timer = setTimeout(() => {
          if (!docBind) {
            docBind = true;
            document.addEventListener('click', handler.click.document);    
          }
        }, 100);
      },

      docClickClear: () => {
        clearTimeout(timer);

        document.removeEventListener('click', handler.click.document);
        docBind = false;
      },

      listOver: idx => {
        // const oldEl = el.listAnchor[activeIndex];
        // if (oldEl) {
        //   oldEl.classList.remove(className.selected);
        // }
        el.list.querySelector(`.${className.selected}`).classList.remove(className.selected);
        // console.log();

        activeIndex = idx;
        const newEl = el.listAnchor[activeIndex];
        if (newEl) {
          newEl.classList.add(className.selected);
          el.button.setAttribute('aria-activedescendant', newEl.id);
        }
      },

      prev: () => {
        let i = activeIndex - 1;
        if (activeIndex <= firstActive) {
          i = firstActive;
        }

        // console.log()
        if (!isOpen) {
          method.listOver(i);
          method.change(i);
          return;
        }

        const listEl = el.listItem[i];
        if (listEl) {
          el.list.scrollTop = listEl.offsetTop;
          // listEl.querySelector('a').focus();

          method.listOver(i);
          listEl.querySelector('a').focus();
        }

      },

      next: () => {
        let i = activeIndex + 1;
        if (i > optionsLength - 1) {
          i = optionsLength - 1;
        }

        // console.log('next ', i);
        if (!isOpen) {
          // method.change(i);
          method.listOver(i);
          method.change(i);
          return;
        }

        const listEl = el.listItem[i];
        if (listEl) {
          el.list.scrollTop = listEl.offsetTop;
          
          method.listOver(i);

          listEl.querySelector('a').focus();
        }
      },

      activeCheck: () => {
        // console.log('activeCheck ', el.list.querySelector('.select-selected'));
      }
    };

    const handler = {
      click: {
        document: event => {
          const target = event.target.closest(selector.container);
          if (target === el.container) {
            return;
          }

          docBind = false;
          method.close();
        },

        button: () => {
          method.toggle();
        },

        listItem: event => {
          const idx = parseInt(utils.getIndex(event.target.closest('li')));
          if (el.select.selectedIndex !== idx) {
            method.change(idx);
          }

          method.close();
        }
      },

      hover: {
        listItem: event => {
          const anchor = event.target;
          method.listOver(utils.getIndex(anchor.closest('li')));
        }
      },

      wheel: event => {
        const e = window.event || event;        
        const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)) * 100;
        const targetEl = event.currentTarget;

        let scrollTop = targetEl.scrollTop + Math.round(delta * -1) / 10;
        targetEl.scrollTop = scrollTop;
        
        if (scrollTop < 0) {
          scrollTop = 0;
        } else if (scrollTop > scrollPos.scroll) {
          scrollTop = scrollPos.scroll;
        }

        event.preventDefault();
      },

      scroll: () => {
        const scrollTop = el.list.scrollTop / scrollPos.scroll * scrollPos.barScroll;
        el.scrollbar.style.top = `${scrollTop}px`;
      },

      mousedown: event => {
        scrollPos.barPos = event.pageY - parseInt(el.scrollbar.style.top);

        el.doc.addEventListener('mousemove', handler.mousemove);
        el.doc.addEventListener('mouseleave', handler.mouseleave);
        el.doc.addEventListener('mouseup', handler.mouseleave);
        // el.doc.addEventListener('mouseout', handler.mouseleave);
      },

      mousemove: event => {
        let posY = event.pageY - scrollPos.barPos;
        if (posY < 0) {
          posY = 0;
        } else if (posY >= scrollPos.barScroll) {
          posY = scrollPos.barScroll;
        }

        el.scrollbar.style.top = `${posY}px`;
        const scroll = posY / scrollPos.barScroll * scrollPos.scroll;

        el.list.scrollTop = scroll;
      },

      mouseleave: () => {
        el.doc.removeEventListener('mousemove', handler.mousemove);
        el.doc.removeEventListener('mouseleave', handler.mouseleave);
        el.doc.removeEventListener('mouseup', handler.mouseleave);
        // el.doc.removeEventListener('mouseout', handler.mouseleave);
      },

      keyDown: event => {
        if (event.keyCode === utils.keyCode.SPACE) {
          // 
        }

        if (event.keyCode === utils.keyCode.ENTER) {
          method.change(activeIndex);

          method.close();

          event.preventDefault();
        }
        
        if (event.keyCode === utils.keyCode.UP) {
          event.preventDefault();

          method.prev();
        }
      
        if (event.keyCode === utils.keyCode.DOWN) {
          event.preventDefault();

          method.next();
        }
        
        if (event.keyCode === utils.keyCode.LEFT) {
          event.preventDefault();

          method.prev();
        }

        if (event.keyCode === utils.keyCode.RIGHT) {
          event.preventDefault();

          method.next();
        }
      }
    };
  
    init();

    this.reInit = reInit;
  }
}
Selectmenu.index = 0;

export const selectmenuController = {
  init: (selector) => {
    [... document.querySelectorAll(selector)].forEach((el) => {
      const obj = root.weakMap.get(el);
      // console.log(el);

      if (obj) {
        obj.reInit();
      } else {
        const select = new Selectmenu(el);
        root.weakMap.set(el, select);
      }
    });
  }
};

/**
 * @namespace selectmenu
 * @alias mvJS.selectmenu
 * @memberof mvJs
 * @description 디자인 셀렉트 메뉴 제어
 */
mvJs.selectmenu = {
  /**
   * @param {Element} selector - element selector
   * @memberof selectmenu
   * @function update
   * @description 선택된 디자인 셀렉트 제어
  **/
  update(selector) {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }

    const obj = root.weakMap.get(el);
    if (obj) {
      obj.reInit();
    } else {
      const select = new Selectmenu(el);
      root.weakMap.set(el, select);
    }
  }
};

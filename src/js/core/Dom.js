class Dom {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.elem = document.querySelector(selector);
    } else {
      this.elem = selector;
    }
  }

  html(html) {
    if (typeof html === 'string') {
      this.elem.innerHTML = html;
      return this;
    }
    return this.elem.outerHTML.trim();
  }

  css(styles = {}) {
    if (Object.keys(styles).length > 0) {
      for (const style in styles) {
        if (Object.hasOwn(this.elem.style, style)) {
          this.elem.style[style] = styles[style];
        }
      }

      return this;
    }
  }

  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.elem.style[style];
      return res;
    }, {});
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.elem.textContent = text;
      return this;
    }

    if (text === '') {
      return '';
    }

    if (this.elem.tagName.toLowerCase() === 'input') {
      return this.elem.value.trim();
    }

    return this.elem.textContent.trim();
  }

  addClass(className) {
    this.elem.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.elem.classList.remove(className);
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.elem.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.elem.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.elem;
    }

    if (Element.prototype.append) {
      this.elem.append(node);
    } else {
      this.elem.appendChild(node);
    }

    return this;
  }

  get data() {
    return this.elem.dataset;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');

      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  closest(selector) {
    return J(this.elem.closest(selector));
  }

  getCoords() {
    return this.elem.getBoundingClientRect();
  }

  findAll(selector) {
    return this.elem.querySelectorAll(selector);
  }

  find(selector) {
    return J(this.elem.querySelector(selector));
  }

  focus() {
    this.elem.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.elem.setAttribute(name, value);
      return this;
    }
    return this.elem.getAttribute(name);
  }
}

export function J(selector) {
  return new Dom(selector);
}

J.create = (tagName, classes = '') => {
  const elem = document.createElement(tagName);
  if (classes) {
    elem.classList.add(classes);
  }
  return J(elem);
};

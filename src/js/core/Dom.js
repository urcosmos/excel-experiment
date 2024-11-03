class DOM {
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

  text(text) {
    if (typeof text === 'string') {
      this.elem.textContent = text;
      return this;
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
    if (node instanceof DOM) {
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
}

export function J(selector) {
  return new DOM(selector);
}

J.create = (tagName, classes = '') => {
  const elem = document.createElement(tagName);
  if (classes) {
    elem.classList.add(classes);
  }
  return J(elem);
};

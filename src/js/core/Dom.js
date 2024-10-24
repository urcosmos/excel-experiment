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

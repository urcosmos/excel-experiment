import { J } from '../../core/DOM';

export function resizeHandler(root, e) {
  const resizer = J(e.target);
  const parent = resizer.closest('[data-type="resizable"]');
  const parentCoords = parent.getCoords();

  const type = resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  const propValue =
    type === 'col' ? root.getCoords().height : root.getCoords().width;

  let value = 0;

  resizer.css({
    opacity: 1,
    [sideProp]: `-${propValue}px`,
  });

  const cells = root.findAll(`[data-col="${parent.data.col}"]`);

  document.onmousemove = (event) => {
    if (type === 'col') {
      const delta = event.pageX - parentCoords.right;
      value = parentCoords.width + delta;
      resizer.css({ right: -delta + 'px' });
    } else {
      const delta = event.pageY - parentCoords.bottom;
      value = parentCoords.height + delta;
      resizer.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = () => {
    if (type === 'col') {
      cells.forEach((elem) => (elem.style.width = value + 'px'));
    } else {
      parent.css({
        height: value + 'px',
      });
    }

    resizer.elem.removeAttribute('style');

    document.onmousemove = null;
    document.onmouseup = null;
  };
}

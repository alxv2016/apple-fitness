const util = {
  setBackgroundImage: function (element: HTMLElement, url: string) {
    element.style.backgroundImage = `url('${url}')`;
  },
  setImageMask: function (element: HTMLElement, url: string) {
    element.style.webkitMaskImage = `url('${url}')`;
    element.style.maskImage = `url('${url}')`;
  },
  createElement: function (element: string, className: string | null = null) {
    const el = document.createElement(element);
    className ? (el.className = className) : el;
    return el;
  },
  randomize: function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
export default util;

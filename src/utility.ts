const util = {
  setBackgroundImage: function (element: HTMLElement, url: string) {
    element.style.backgroundImage = `url('${url}')`;
  },
  setImageMask: function (element: HTMLElement, url: string) {
    element.style.webkitMaskImage = `url('${url}')`;
    element.style.maskImage = `url('${url}')`;
  },
  createElement: function (element: string, className: string | null = null, dataTarget: string | null = null) {
    const el = document.createElement(element) as HTMLElement;
    className ? (el.className = className) : el;
    dataTarget ? el.setAttribute('data-target', dataTarget) : el;
    return el;
  },
  createVideoElement: function (element: string, className: string | null = null, dataTarget: string | null = null) {
    const el = document.createElement(element) as HTMLMediaElement;
    className ? (el.className = className) : el;
    el.muted = true;
    el.setAttribute('playsinline', 'true');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('muted', 'true');
    dataTarget ? el.setAttribute('data-target', dataTarget) : el;
    return el;
  },
  randomize: function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
export default util;

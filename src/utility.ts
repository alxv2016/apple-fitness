const util = {
  selectElement(tag: string) {
    return document.querySelector<HTMLElement>(tag);
  },
  selectElements(tag: string) {
    return document.querySelectorAll<Element>(tag);
  },
  createElement(tag: string) {
    const el = document.createElement(tag) as HTMLElement | HTMLMediaElement;
    return (className: string | null = null, data: string | null = null) => {
      className ? (el.className = className) : el;
      data ? el.setAttribute('data-target', data) : el;
      return el;
    };
  },
  randomize(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  cleanUrl(url: string | null) {
    return url ? url.split('?')[0] : null;
  },
  renderImage(el: HTMLElement) {
    return (url: string, maskUrl: string | null = null) => {
      const cleanUrl = this.cleanUrl(url);
      const cleanMaskUrl = this.cleanUrl(maskUrl);
      el.style.backgroundImage = `url('${cleanUrl}')`;
      if (maskUrl) {
        el.setAttribute('style', `background-image: url("${cleanUrl}"); -webkit-mask-image: url("${cleanMaskUrl}");`);
      }
      return el;
    };
  },
  calculateScroll(progress: number, distance: number = 3, delay: number = 0) {
    let scrollProgress = Math.floor(progress * 100) - delay;
    let endProgress = scrollProgress * distance;
    scrollProgress < 0 ? (scrollProgress = 0) : scrollProgress;
    endProgress < 0 ? (endProgress = 0) : endProgress;
    endProgress > 100 ? (endProgress = 100) : endProgress;
    return {
      start: scrollProgress,
      end: endProgress,
    };
  },
};
export default util;

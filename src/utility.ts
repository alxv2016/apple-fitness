const util = {
  selectElement(tag: string) {
    let el = document.querySelector(tag);
    return el as HTMLElement | HTMLMediaElement;
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
  // createMetric(metricClass: string, iconClass: string, dataName: string) {
  //   const renders = {
  //     metric: util.createElement('figure', `c-metric ${metricClass}`, dataName),
  //     metric_icon: util.createElement('figure', `c-metric ${iconClass}`, dataName),
  //   };
  //   return renders;
  // },
  // createVideoElement(tag: string) {
  //   const el = document.createElement(tag) as HTMLMediaElement;
  //   el.muted = true;
  //   el.setAttribute('playsinline', 'true');
  //   el.setAttribute('aria-hidden', 'true');
  //   el.setAttribute('muted', 'true');
  //   return function (className: string | null = null, data: string | null = null) {
  //     className ? (el.className = className) : el;
  //     data ? el.setAttribute('data-target', data) : el;
  //     return el;
  //   };
  // },
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
  // renderVideo(imageEl: HTMLElement, videoEL: HTMLMediaElement) {
  //   return (url: string, videoSrc: any) => {
  //     const cleanUrl = this.cleanUrl(url);
  //     imageEl.style.backgroundImage = `url("${cleanUrl}")`;
  //     videoEL.src = videoSrc;
  //     return (className: string) => {
  //       const container = this.createElement('div')(className);
  //       container.append(imageEl, videoEL);
  //       return container;
  //     };
  //   };
  // },
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

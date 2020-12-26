const util = {
  backgroundImage(element: HTMLElement, url: string) {
    element.style.backgroundImage = `url('${url}')`;
  },
  maskImage(element: HTMLElement, url: string) {
    element.style.webkitMaskImage = `url('${url}')`;
    element.style.maskImage = `url('${url}')`;
  },
  createElement(tag: string, className: string | null = null, data: string | null = null) {
    const el = document.createElement(tag) as HTMLElement;
    className ? (el.className = className) : el;
    data ? el.setAttribute('data-target', data) : el;
    return el;
  },
  createMetric(metricClass: string, iconClass: string, dataName: string) {
    const renders = {
      metric: util.createElement('figure', `c-metric ${metricClass}`, dataName),
      metric_icon: util.createElement('figure', `c-metric ${iconClass}`, dataName),
    };
    return renders;
  },
  createVideoElement(element: string, className: string | null = null, dataTarget: string | null = null) {
    const el = document.createElement(element) as HTMLMediaElement;
    className ? (el.className = className) : el;
    el.muted = true;
    el.setAttribute('playsinline', 'true');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('muted', 'true');
    dataTarget ? el.setAttribute('data-target', dataTarget) : el;
    return el;
  },
  randomize(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  renderImage(el: HTMLElement, url: string, maskUrl: string | null = null) {
    this.backgroundImage(el, url);
    if (maskUrl) {
      this.maskImage(el, maskUrl);
    }
  },
  renderVideo(image: HTMLElement, video: HTMLMediaElement, url: string, vidSrc: any) {
    this.backgroundImage(image, url);
    video.src = vidSrc;
  },
  calculateScroll(progress: number, distance: number = 3, delay: number = 0) {
    let scrollProgress = Math.floor(progress * 100) - delay;
    let endProgress = scrollProgress * distance;
    scrollProgress < 0 ? (scrollProgress = 0) : scrollProgress;
    endProgress < 0 ? (endProgress = 0) : endProgress;
    endProgress > 100 ? (endProgress = 100) : endProgress;
    const scroll = {
      start: scrollProgress,
      end: endProgress,
    };
    return scroll;
  },
};
export default util;

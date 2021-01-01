import gsap from 'gsap';

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
  mediaControl(gsapTween: any) {
    const mediaControl = this.selectElement('[data-target="media-control"]');
    const playIcon = this.selectElement('[data-target="play-icon"]');
    const pauseIcon = this.selectElement('[data-target="pause-icon"]');
    if (mediaControl) {
      let a11yMsg = 'animation of trainers for Apple Fitness Plus';
      let btnLabel = mediaControl.firstElementChild as HTMLElement;
      mediaControl.setAttribute('aria-label', `Pause ${a11yMsg}`);
      mediaControl.addEventListener('click', (ev) => {
        if (gsapTween.paused()) {
          mediaControl.setAttribute('aria-label', `Pause ${a11yMsg}`);
          if (playIcon && pauseIcon) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
          }
          btnLabel.textContent = 'Pause';
          gsapTween.play();
        } else {
          mediaControl.setAttribute('aria-label', `Play ${a11yMsg}`);
          if (playIcon && pauseIcon) {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
          }
          btnLabel.textContent = 'Play';
          gsapTween.pause();
        }
        return this.handlePauseEvent(ev);
      });
    }
  },
  handlePauseEvent(ev: Event) {
    ev.target?.removeEventListener('click', this.handlePauseEvent);
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

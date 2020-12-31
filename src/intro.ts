import gsap from 'gsap';
import appleMusic from './music';
import util from './utility';

const intro = {
  heroContent: util.selectElement('[data-target="hero-content"]'),
  appleWatch: util.selectElement('[data-target="intro-apple-watch"]'),
  appleTv: util.selectElement('[data-target="intro-apple-tv"]'),
  iphone: util.selectElement('[data-target="intro-iphone"]'),
  ipad: util.selectElement('[data-target="intro-ipad"]'),
  ipadWatch: util.selectElement('[data-target="ipad-watch"]'),
  deviceSyncHeading: util.selectElement('[data-target="device-sync-intro-heading"]'),
  appIntro: util.selectElement('[data-target="app-intro"]'),
  appIntroHeading: util.selectElement('[data-target="app-intro-heading"]'),
  processData(introData: any) {
    this.renderDeviceGrid(introData.primary);
    this.renderAppIntro(introData.primary);
    this.renderDeviceSyncUp(introData.primary);
    this.renderAnimations();
  },
  renderDeviceGrid(introData: any) {
    if (this.ipad) {
      const ipadRender = util.renderImage(this.ipad.firstElementChild as HTMLElement)(
        introData.ipad_render.url,
        introData.ipad_render.mask.url
      );
      this.ipad.append(ipadRender);
    }
    if (this.iphone) {
      const iphoneRender = util.renderImage(this.iphone.firstElementChild as HTMLElement)(
        introData.iphone_render.url,
        introData.iphone_render.mask.url
      );
      this.iphone.append(iphoneRender);
    }
    if (this.appleTv) {
      const appleTvRender = util.renderImage(this.appleTv.firstElementChild as HTMLElement)(
        introData.apple_tv.url,
        introData.apple_tv.mask.url
      );
      this.appleTv.append(appleTvRender);
    }
    if (this.appleWatch) {
      const el = util.renderImage(this.appleWatch.firstElementChild as HTMLElement)(
        introData.apple_watch_render.url,
        introData.apple_watch_render.mask.url
      );
      this.appleWatch.prepend(el);
      if (this.appleWatch.lastElementChild) {
        const el = util.renderImage(this.appleWatch.lastElementChild.firstElementChild as HTMLElement)(
          introData.apple_watch_render.static.url
        );
        this.appleWatch.lastElementChild.prepend(el);
        const videoEl = this.appleWatch.lastElementChild.lastElementChild as HTMLMediaElement;
        videoEl.src = require('./assets/intro_watch_vid.mp4');
      }
    }
  },
  renderAppIntro(introData: any) {
    if (this.appIntro) {
      const elements = this.appIntro.children;
      Array.from(elements).forEach((el: any) => {
        const data = el.getAttribute('data-target');
        if (data === 'apple-fitness') {
          el.src = introData.fitness_app_icon.url;
        }
        if (data === 'app-intro-heading') {
          el.textContent = introData.title[0].text;
        }
      });
    }
  },
  renderDeviceSyncUp(introData: any) {
    if (this.ipadWatch) {
      const el = util.renderImage(this.ipadWatch.firstElementChild as HTMLElement)(
        introData.lock_up.url,
        introData.lock_up.mask.url
      );
      this.ipadWatch.prepend(el);
      if (this.ipadWatch.lastElementChild) {
        this.ipadWatch.lastElementChild.setAttribute(
          'style',
          `-webkit-mask-image: url("${introData.lock_up.video_mask.url}");`
        );
        const el = util.renderImage(this.ipadWatch.lastElementChild.firstElementChild as HTMLElement)(
          introData.lock_up.static.url
        );
        this.ipadWatch.lastElementChild.prepend(el);
        const videoEl = this.ipadWatch.lastElementChild.lastElementChild as HTMLMediaElement;
        videoEl.src = require('./assets/intro_lockup.mp4');
      }
    }
    if (this.deviceSyncHeading) {
      this.deviceSyncHeading.innerHTML = introData.fitness_intro[0].text;
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const appleWatchVideo = util.selectElement('[data-target="intro-apple-watch-video"]');
    const ipadWatchVideo = util.selectElement('[data-target="ipad-watch-video"]');

    const deviceGrid = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="device-grid"]',
        start: 'top center',
        end: 'center center',
        scrub: 0.75,
        onUpdate: ({progress}) => {
          const heroContentHide = util.calculateScroll(progress, 3, 60);
          const appleWatchReveal = util.calculateScroll(progress, 2);
          const devicesReveal = util.calculateScroll(progress, 3, 10);
          if (this.heroContent) {
            this.heroContent.style.setProperty('--end-progress-start', `${heroContentHide.start}%`);
            this.heroContent.style.setProperty('--end-progress-end', `${heroContentHide.end}%`);
          }
          if (this.iphone) {
            this.iphone.style.setProperty('--progress-start', `${devicesReveal.start}%`);
            this.iphone.style.setProperty('--progress-end', `${devicesReveal.end}%`);
          }
          if (this.appleTv) {
            this.appleTv.style.setProperty('--progress-start', `${devicesReveal.start}%`);
            this.appleTv.style.setProperty('--progress-end', `${devicesReveal.end}%`);
          }
          if (this.ipad) {
            this.ipad.style.setProperty('--progress-start', `${devicesReveal.start}%`);
            this.ipad.style.setProperty('--progress-end', `${devicesReveal.end}%`);
          }
          if (this.appleWatch) {
            this.appleWatch.style.setProperty('--progress-start', `${appleWatchReveal.start}%`);
            this.appleWatch.style.setProperty('--progress-end', `${appleWatchReveal.end}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && appleWatchVideo) {
            let video = appleWatchVideo as HTMLMediaElement;
            video.muted = true;
            video.play();
            video.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    deviceGrid
      .fromTo(
        '[data-target="intro-apple-watch"]',
        {
          scale: 1.95,
          opacity: 0.125,
        },
        {
          //scale: 0.7,
          opacity: 1,
        }
      )
      .to('[data-target="intro-apple-watch"]', {
        scale: 0.7,
        delay: 0.25,
      })
      .from(
        '[data-target="intro-apple-tv"]',
        {
          xPercent: 20,
          opacity: 0,
          scale: 0.95,
        },
        0.75
      )
      .from(
        '[data-target="intro-iphone"]',
        {
          yPercent: 40,
          opacity: 0,
          scale: 0.95,
        },
        0.75
      )
      .from(
        '[data-target="intro-ipad"]',
        {
          xPercent: -20,
          opacity: 0,
          scale: 0.95,
        },
        0.75
      );

    gsap.from('[data-target="app-intro"]', {
      ease: 'none',
      opacity: 0,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="app-intro"]',
        start: '-=400 center',
        end: 'center center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const appReveal = util.calculateScroll(progress, 3.5);
          if (this.appIntroHeading) {
            this.appIntroHeading.style.setProperty('--progress-start', `${appReveal.start}%`);
            this.appIntroHeading.style.setProperty('--progress-end', `${appReveal.end}%`);
          }
        },
      },
    });

    const ipadWatch = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="device-sync-up"]',
        start: '-=200 center',
        end: '350 center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const ipadWatchReveal = util.calculateScroll(progress);
          const appIntroHide = util.calculateScroll(progress, 3, 60);
          if (this.appIntro) {
            this.appIntro.style.setProperty('--progress-start', `${appIntroHide.start}%`);
            this.appIntro.style.setProperty('--progress-end', `${appIntroHide.end}%`);
          }
          if (this.ipadWatch) {
            this.ipadWatch.style.setProperty('--progress-start', `${ipadWatchReveal.start}%`);
            this.ipadWatch.style.setProperty('--progress-end', `${ipadWatchReveal.end}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && ipadWatchVideo) {
            let video = ipadWatchVideo as HTMLMediaElement;
            video.muted = true;
            video.play();
            video.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    ipadWatch
      .fromTo(
        '[data-target="ipad-watch"]',
        {
          scale: 0.94,
          opacity: 0.25,
        },
        {
          scale: 1,
          opacity: 1,
        }
      )
      .from(
        '[data-target="device-sync-intro-heading"]',
        {
          y: -60,
          opacity: 0,
        },
        0.45
      )
      .to(
        '[data-target="app-intro"]',
        {
          y: 60,
        },
        0.25
      );
  },
};

export default intro;

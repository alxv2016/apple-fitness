import gsap from 'gsap';
import util from './utility';

const intro = {
  heroContent: document.querySelector<HTMLElement>('[data-target="hero-content"]'),
  appleWatch: document.querySelector<HTMLElement>('[data-target="intro-apple-watch"]'),
  appleTv: document.querySelector<HTMLElement>('[data-target="intro-apple-tv"]'),
  iphone: document.querySelector<HTMLElement>('[data-target="intro-iphone"]'),
  ipad: document.querySelector<HTMLElement>('[data-target="intro-ipad"]'),
  ipadWatch: document.querySelector<HTMLElement>('[data-target="ipad-watch"]'),
  appIntro: document.querySelector('[data-target="app-intro"]'),
  appIntroHeading: document.querySelector<HTMLElement>('[data-target="app-intro-heading"]'),
  deviceSyncUp: document.querySelector('[data-target="device-sync-up"]'),

  processData(introData: any) {
    this.renderDeviceGrid(introData.primary);
    this.renderAppIntro(introData.primary);
    this.renderDeviceSyncUp(introData.primary);
    this.renderAnimations();
  },
  renderDeviceGrid(introData: any) {
    const renders = {
      appleWatch: {
        image: util.createElement('figure', 'c-apple-watch__mock'),
        screen: {
          container: util.createElement('div', 'c-apple-watch-screen'),
          static: util.createElement('figure', 'c-apple-watch-screen__static'),
          video: util.createVideoElement('video', 'c-apple-watch-screen__video', 'intro-apple-watch-video'),
          videoSrc: require('./assets/intro_watch_vid.mp4'),
        },
      },
      appleTv: {
        image: util.createElement('figure', 'c-apple-tv__mock'),
      },
      iphone: {
        image: util.createElement('figure', 'c-iphone__mock'),
      },
      ipad: {
        image: util.createElement('figure', 'c-ipad__mock'),
      },
    };

    if (this.ipad) {
      util.renderImage(renders.ipad.image, introData.ipad_render.url, introData.ipad_render.mask.url);
      this.ipad.append(renders.ipad.image);
    }

    if (this.iphone) {
      util.renderImage(renders.iphone.image, introData.iphone_render.url, introData.iphone_render.mask.url);
      this.iphone.append(renders.iphone.image);
    }

    if (this.appleTv) {
      util.renderImage(renders.appleTv.image, introData.apple_tv_render.url, introData.apple_tv_render.mask.url);
      this.appleTv.append(renders.appleTv.image);
    }

    if (this.appleWatch) {
      util.renderImage(
        renders.appleWatch.image,
        introData.apple_watch_render.url,
        introData.apple_watch_render.mask.url
      );
      util.renderVideo(
        renders.appleWatch.screen.static,
        renders.appleWatch.screen.video,
        introData.apple_watch_render.static.url,
        renders.appleWatch.screen.videoSrc
      );

      renders.appleWatch.screen.container.append(renders.appleWatch.screen.static, renders.appleWatch.screen.video);
      this.appleWatch.append(renders.appleWatch.image, renders.appleWatch.screen.container);
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
    const renders = {
      image: util.createElement('figure', 'c-ipad-watch__mock'),
      screen: {
        container: util.createElement('div', 'c-ipad-watch-screens'),
        static: util.createElement('figure', 'c-ipad-watch-screens__static'),
        video: util.createVideoElement('video', 'c-ipad-watch-screens__video', 'ipad-watch-video'),
        videoSrc: require('./assets/intro_lockup.mp4'),
      },
    };

    util.renderImage(renders.image, introData.lock_up.url, introData.lock_up.mask.url);
    util.renderVideo(
      renders.screen.static,
      renders.screen.video,
      introData.lock_up.static.url,
      renders.screen.videoSrc
    );
    util.maskImage(renders.screen.container, introData.lock_up.video_mask.url);

    if (this.deviceSyncUp) {
      const elements = this.deviceSyncUp.children;
      renders.screen.container.append(renders.screen.static, renders.screen.video);
      Array.from(elements).forEach((el: any) => {
        const data = el.getAttribute('data-target');
        if (data === 'ipad-watch') {
          el.append(renders.image, renders.screen.container);
        }
        if (data === 'device-sync-intro-heading') {
          el.innerHTML = introData.fitness_intro[0].text;
        }
      });
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const appleWatchVideo = document.querySelector<HTMLMediaElement>('[data-target="intro-apple-watch-video"]');
    const ipadWatchVideo = document.querySelector<HTMLMediaElement>('[data-target="ipad-watch-video"]');

    const deviceGrid = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="device-grid"]',
        start: 'top center',
        end: '+=600 center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const heroContentHide = util.calculateScroll(progress, 3, 50);
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
            appleWatchVideo.muted = true;
            appleWatchVideo.play();
            appleWatchVideo.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    deviceGrid
      .fromTo(
        '[data-target="intro-apple-watch"]',
        {
          scale: 2.45,
          opacity: 0.125,
        },
        {
          scale: 0.7,
          opacity: 1,
        }
      )
      .from(
        '[data-target="intro-apple-tv"]',
        {
          xPercent: 20,
          opacity: 0,
        },
        0.25
      )
      .from(
        '[data-target="intro-iphone"]',
        {
          yPercent: 40,
          opacity: 0,
        },
        0.25
      )
      .from(
        '[data-target="intro-ipad"]',
        {
          xPercent: -20,
          opacity: 0,
        },
        0.25
      );

    const appIntro = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="app-intro"]',
        start: '-=400 center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.appIntroHeading) {
            this.appIntroHeading.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.appIntroHeading.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    appIntro
      .from('[data-target="apple-fitness"]', {
        y: 88,
        opacity: 0,
      })
      .from(
        '[data-target="app-intro-heading"]',
        {
          y: 48,
        },
        0.125
      );

    const ipadWatch = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="device-sync-up"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.75,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.ipadWatch) {
            this.ipadWatch.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.ipadWatch.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && ipadWatchVideo) {
            ipadWatchVideo.muted = true;
            ipadWatchVideo.play();
            ipadWatchVideo.addEventListener('ended', this.hideVideo);
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
      .from('[data-target="device-sync-intro-heading"]', {
        y: -60,
        opacity: 0,
      });
  },
};

export default intro;

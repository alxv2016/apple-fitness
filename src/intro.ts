import gsap from 'gsap';
import util from './utility';

const intro = {
  heroContent: document.querySelector<HTMLElement>('[data-target="hero-content"]'),
  appleWatch: document.querySelector<HTMLElement>('[data-target="intro-watch"]'),
  appleTv: document.querySelector<HTMLElement>('[data-target="intro-tv"]'),
  iphone: document.querySelector<HTMLElement>('[data-target="intro-iphone"]'),
  ipad: document.querySelector<HTMLElement>('[data-target="intro-ipad"]'),
  deviceGroup: document.querySelector('[data-target="device-sync-intro"]'),
  appIntro: document.querySelector('[data-target="app-intro"]'),
  processData(introData: any) {
    this.renderDeviceGrid(introData.primary);
    this.renderAppIntro(introData.primary);
    this.renderDeviceGroup(introData.primary);
    this.renderAnimations();
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
  renderDeviceGrid(introData: any) {
    const renders = {
      appleWatch: {
        reveal: util.createElement('figure', 'c-apple-watch__mock-dimmed', 'intro-watch-reveal'),
        image: util.createElement('figure', 'c-apple-watch__mock'),
        screen: {
          container: util.createElement('div', 'c-apple-watch-screen', 'intro-watch-screen'),
          static: util.createElement('figure', 'c-apple-watch-screen__static'),
          video: util.createVideoElement('video', 'c-apple-watch-screen__video', 'intro-watch-video'),
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
        renders.appleWatch.reveal,
        introData.apple_watch_render.reveal.url,
        introData.apple_watch_render.mask.url
      );
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
      this.appleWatch.append(renders.appleWatch.image, renders.appleWatch.reveal, renders.appleWatch.screen.container);
    }
  },
  renderDeviceGroup(introData: any) {
    const renders = {
      reveal: util.createElement('figure', 'c-ipad-watch__mock-dimmed', 'device-syncing-reveal'),
      image: util.createElement('figure', 'c-ipad-watch__mock'),
      screen: {
        container: util.createElement('div', 'c-ipad-watch-screens'),
        static: util.createElement('figure', 'c-ipad-watch-screens__static'),
        video: util.createVideoElement('video', 'c-ipad-watch-screens__video', 'device-syncing-video'),
        videoSrc: require('./assets/intro_lockup.mp4'),
      },
    };

    util.renderImage(renders.reveal, introData.lock_up.reveal.url, introData.lock_up.mask.url);
    util.renderImage(renders.image, introData.lock_up.url, introData.lock_up.mask.url);
    util.renderVideo(
      renders.screen.static,
      renders.screen.video,
      introData.lock_up.static.url,
      renders.screen.videoSrc
    );
    util.maskImage(renders.screen.container, introData.lock_up.video_mask.url);

    if (this.deviceGroup) {
      const elements = this.deviceGroup.children;
      renders.screen.container.append(renders.screen.static, renders.screen.video);
      Array.from(elements).forEach((el: any) => {
        const data = el.getAttribute('data-target');
        if (data === 'device-syncing') {
          el.append(renders.reveal, renders.image, renders.screen.container);
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
    const watchScreen = document.querySelector<HTMLMediaElement>('[data-target="intro-watch-video"]');
    const groupScreen = document.querySelector<HTMLMediaElement>('[data-target="device-syncing-video"]');
    const devicesReveal = document.querySelector<HTMLElement>('[data-target="device-syncing"]');

    const deviceGrid = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: true,
        trigger: '[data-trigger="device-grid"]',
        start: 'top center',
        end: '+=600 center',
        toggleActions: 'play pause resume reverse',
        scrub: 1,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          let endProgress = progress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.heroContent) {
            this.heroContent.style.setProperty('--end-progress-start', `${progress}%`);
            this.heroContent.style.setProperty('--end-progress-end', `${endProgress}%`);
          }
          if (this.iphone) {
            this.iphone.style.setProperty('--progress-start', `${progress}%`);
            this.iphone.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (this.appleTv) {
            this.appleTv.style.setProperty('--progress-start', `${progress}%`);
            this.appleTv.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (this.ipad) {
            this.ipad.style.setProperty('--progress-start', `${progress}%`);
            this.ipad.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (this.appleWatch) {
            this.appleWatch.style.setProperty('--progress-start', `${progress}%`);
            this.appleWatch.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive && watchScreen) {
            watchScreen.muted = true;
            watchScreen.play();
            watchScreen.addEventListener('ended', this.hideVideo);
          } else {
            if (watchScreen) {
              watchScreen.pause();
            }
          }
        },
      },
    });

    deviceGrid
      .to('[data-target="intro-watch-reveal"]', {
        opacity: 0,
      })
      .fromTo(
        '[data-target="intro-watch"]',
        {
          scale: 1.75,
        },
        {
          scale: 0.7,
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
      )
      .from(
        '[data-target="intro-tv"]',
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
      );

    const appIntro = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="app-intro"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.45,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const titleReveal = document.querySelector<HTMLElement>('[data-target="app-intro-heading"]');
          if (titleReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            titleReveal.style.setProperty('--progress-start', `${progress}%`);
            titleReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    appIntro
      .from('[data-target="app-intro-heading"]', {
        y: 48,
      })
      .from(
        '[data-target="apple-fitness"]',
        {
          y: 88,
          opacity: 0,
        },
        0.125
      );

    const deviceGroup = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="device-sync-intro"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          if (devicesReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            devicesReveal.style.setProperty('--progress-start', `${progress}%`);
            devicesReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive && groupScreen) {
            groupScreen.muted = true;
            groupScreen.play();
            groupScreen.addEventListener('ended', this.hideVideo);
          } else {
            if (groupScreen) {
              groupScreen.pause();
            }
          }
        },
      },
    });

    deviceGroup
      .from('[data-target="device-syncing"]', {
        scale: 0.94,
      })
      .to(
        '[data-target="device-syncing-reveal"]',
        {
          opacity: 0,
        },
        0
      )
      .from('[data-target="device-sync-intro-heading"]', {
        yPercent: -60,
        opacity: 0,
      });
  },
};

export default intro;

import util from './utility';

const intro = {
  processData: function (introData: any) {
    this.renderWatch(introData.primary);
    this.renderIpad(introData.primary);
    this.renderTv(introData.primary);
    this.renderIphone(introData.primary);
    this.renderAppIntro(introData.primary);
    this.renderDeviceSync(introData.primary);
  },
  renderAppIntro: function (introData: any) {
    const appIntro = document.querySelector('[data-target="app-intro"]');
    if (appIntro) {
      const elements = appIntro.children;
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
  renderDeviceSync: function (introData: any) {
    const deviceSync = document.querySelector('[data-target="device-sync-intro"]');
    if (deviceSync) {
      const elements = deviceSync.children;
      const imageSet = {
        reveal: util.createElement('figure', 'c-ipad-watch__mock-dimmed', 'device-syncing-reveal'),
        image: util.createElement('figure', 'c-ipad-watch__mock'),
      };
      const deviceScreen = {
        container: util.createElement('div', 'c-ipad-watch-screens'),
        static: util.createElement('figure', 'c-ipad-watch-screens__static'),
        video: util.createVideoElement('video', 'c-ipad-watch-screens__video', 'device-syncing-video'),
      };
      util.setBackgroundImage(imageSet.reveal, introData.lock_up.reveal.url);
      util.setBackgroundImage(imageSet.image, introData.lock_up.url);
      util.setImageMask(imageSet.reveal, introData.lock_up.mask.url);
      util.setImageMask(imageSet.image, introData.lock_up.mask.url);
      util.setBackgroundImage(deviceScreen.static, introData.lock_up.static.url);
      util.setImageMask(deviceScreen.container, introData.lock_up.video_mask.url);
      deviceScreen.video.src = require('./assets/intro_lockup.mp4');
      deviceScreen.container.append(deviceScreen.video, deviceScreen.static);

      Array.from(elements).forEach((el: any) => {
        const data = el.getAttribute('data-target');
        if (data === 'device-syncing') {
          el.append(imageSet.reveal, imageSet.image, deviceScreen.container);
        }
        if (data === 'device-sync-intro-heading') {
          el.innerHTML = introData.fitness_intro[0].text;
        }
      });
    }
  },
  renderIpad: function (introData: any) {
    const ipad = document.querySelector<HTMLElement>('[data-target="intro-ipad"]');
    if (ipad) {
      const image = util.createElement('figure', 'c-ipad__mock');
      util.setBackgroundImage(image, introData.ipad_render.url);
      util.setImageMask(image, introData.ipad_render.mask.url);
      ipad.append(image);
    }
  },
  renderIphone: function (introData: any) {
    const iphone = document.querySelector<HTMLElement>('[data-target="intro-iphone"]');
    if (iphone) {
      const image = util.createElement('figure', 'c-iphone__mock');
      util.setBackgroundImage(image, introData.iphone_render.url);
      util.setImageMask(image, introData.iphone_render.mask.url);
      iphone.append(image);
    }
  },
  renderTv: function (introData: any) {
    const appleTv = document.querySelector<HTMLElement>('[data-target="intro-tv"]');
    if (appleTv) {
      const image = util.createElement('figure', 'c-apple-tv__mock');
      util.setBackgroundImage(image, introData.apple_tv_render.url);
      util.setImageMask(image, introData.apple_tv_render.mask.url);
      appleTv.append(image);
    }
  },
  renderWatch: function (introData: any) {
    const appleWatch = document.querySelector<HTMLElement>('[data-target="intro-watch"]');
    if (appleWatch) {
      const imageSet = {
        reveal: util.createElement('figure', 'c-apple-watch__mock-dimmed', 'intro-watch-reveal'),
        image: util.createElement('figure', 'c-apple-watch__mock'),
      };
      const watchScreen = {
        container: util.createElement('div', 'c-apple-watch-screen', 'intro-watch-screen'),
        static: util.createElement('figure', 'c-apple-watch-screen__static'),
        video: util.createVideoElement('video', 'c-apple-watch-screen__video', 'intro-watch-video'),
      };

      util.setBackgroundImage(imageSet.reveal, introData.apple_watch_render.reveal.url);
      util.setBackgroundImage(imageSet.image, introData.apple_watch_render.url);
      util.setImageMask(imageSet.reveal, introData.apple_watch_render.mask.url);
      util.setImageMask(imageSet.image, introData.apple_watch_render.mask.url);

      util.setBackgroundImage(watchScreen.static, introData.apple_watch_render.static.url);

      watchScreen.video.src = require('./assets/intro_watch_vid.mp4');
      watchScreen.container.append(watchScreen.video, watchScreen.static);
      appleWatch.append(imageSet.reveal, imageSet.image, watchScreen.container);
    }
  },
};

export default intro;

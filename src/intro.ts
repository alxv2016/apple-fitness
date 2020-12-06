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
        shadow: util.createElement('figure', 'device-syncing__shadow'),
        image: util.createElement('figure', 'device-syncing__render'),
      };
      const deviceScreen = {
        container: util.createElement('div', 'device-syncing-screen'),
        static: util.createElement('figure', 'device-syncing-screen__static'),
        video: util.createVideoElement('video', 'device-syncing-screen__video', 'device-syncing-video'),
      };
      util.setBackgroundImage(imageSet.shadow, introData.lock_up.shadow.url);
      util.setBackgroundImage(imageSet.image, introData.lock_up.url);
      util.setImageMask(imageSet.image, introData.lock_up.mask.url);
      util.setBackgroundImage(deviceScreen.static, introData.lock_up.static.url);
      util.setImageMask(deviceScreen.container, introData.lock_up.video_mask.url);
      deviceScreen.video.src = require('./assets/intro_lockup.mp4');
      deviceScreen.container.appendChild(deviceScreen.video);
      deviceScreen.container.appendChild(deviceScreen.static);

      Array.from(elements).forEach((el: any) => {
        const data = el.getAttribute('data-target');
        if (data === 'device-syncing') {
          el.appendChild(imageSet.shadow);
          el.appendChild(imageSet.image);
          el.appendChild(deviceScreen.container);
        }
        if (data === 'device-sync-intro-heading') {
          el.textContent = introData.fitness_intro[0].text;
        }
      });
    }
  },
  renderIphone: function (introData: any) {
    const iphone = document.querySelector<HTMLElement>('[data-target="intro-iphone"]');
    if (iphone) {
      const imageSet = {
        shadow: util.createElement('figure', 'intro-iphone__shadow'),
        image: util.createElement('figure', 'intro-iphone__render'),
      };
      util.setBackgroundImage(imageSet.shadow, introData.iphone_render.shadow.url);
      util.setBackgroundImage(imageSet.image, introData.iphone_render.url);
      util.setImageMask(imageSet.image, introData.iphone_render.mask.url);
      iphone.appendChild(imageSet.shadow);
      iphone.appendChild(imageSet.image);
    }
  },
  renderTv: function (introData: any) {
    const appleTv = document.querySelector<HTMLElement>('[data-target="intro-tv"]');
    if (appleTv) {
      const imageSet = {
        shadow: util.createElement('figure', 'intro-tv__shadow'),
        image: util.createElement('figure', 'intro-tv__render'),
      };
      util.setBackgroundImage(imageSet.shadow, introData.apple_tv_render.shadow.url);
      util.setBackgroundImage(imageSet.image, introData.apple_tv_render.url);
      util.setImageMask(imageSet.image, introData.apple_tv_render.mask.url);
      appleTv.appendChild(imageSet.shadow);
      appleTv.appendChild(imageSet.image);
    }
  },
  renderIpad: function (introData: any) {
    const ipad = document.querySelector<HTMLElement>('[data-target="intro-ipad"]');
    if (ipad) {
      const imageSet = {
        shadow: util.createElement('figure', 'intro-ipad__shadow'),
        image: util.createElement('figure', 'intro-ipad__render'),
      };
      util.setBackgroundImage(imageSet.shadow, introData.ipad_render.shadow.url);
      util.setBackgroundImage(imageSet.image, introData.ipad_render.url);
      util.setImageMask(imageSet.image, introData.ipad_render.mask.url);
      ipad.appendChild(imageSet.shadow);
      ipad.appendChild(imageSet.image);
    }
  },
  renderWatch: function (introData: any) {
    const appleWatch = document.querySelector<HTMLElement>('[data-target="intro-watch"]');
    if (appleWatch) {
      const imageSet = {
        shadow: util.createElement('figure', 'intro-watch__shadow'),
        image: util.createElement('figure', 'intro-watch__render'),
      };
      const watchScreen = {
        container: util.createElement('div', 'intro-watch-screen', 'intro-watch-screen'),
        static: util.createElement('figure', 'intro-watch-screen__static'),
        video: util.createVideoElement('video', 'intro-watch-screen__video', 'intro-watch-video'),
      };

      util.setBackgroundImage(imageSet.shadow, introData.apple_watch_render.shadow.url);
      util.setBackgroundImage(imageSet.image, introData.apple_watch_render.url);
      util.setImageMask(imageSet.image, introData.apple_watch_render.mask.url);

      util.setBackgroundImage(watchScreen.static, introData.apple_watch_render.static.url);

      watchScreen.video.src = require('./assets/intro_watch_vid.mp4');
      watchScreen.container.appendChild(watchScreen.video);
      watchScreen.container.appendChild(watchScreen.static);
      appleWatch.appendChild(imageSet.shadow);
      appleWatch.appendChild(imageSet.image);
      appleWatch.appendChild(watchScreen.container);
    }
  },
};

export default intro;

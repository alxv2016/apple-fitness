import util from './utility';

const intro = {
  processData: function (introData: any) {
    this.renderWatchImages(introData.primary);
    this.renderIpadImages(introData.primary);
    this.renderAppleTvImages(introData.primary);
    this.renderIphoneImages(introData.primary);
    this.renderServiceIntro(introData.primary);
  },
  renderServiceIntro: function (introData: any) {
    const container = document.querySelector('[data-target="fitness-experience"]');
    if (container) {
      const children = container.children;
      const imageSet = {
        shadow: util.createElement('figure', 'device-lockup__shadow'),
        image: util.createElement('figure', 'device-lockup__render'),
      };
      const videoSet = {
        container: util.createElement('div', 'device-lockup__video'),
        static: util.createElement('figure', 'device-lockup__video-static'),
        video: util.createVideoElement('video', 'device-lockup__video-vid', 'device-lockup-video'),
      };
      util.setBackgroundImage(imageSet.shadow, introData.lock_up.shadow.url);
      util.setBackgroundImage(imageSet.image, introData.lock_up.url);
      util.setImageMask(imageSet.image, introData.lock_up.mask.url);
      util.setBackgroundImage(videoSet.static, introData.lock_up.static.url);
      util.setImageMask(videoSet.container, introData.lock_up.video_mask.url);
      videoSet.video.src = require('./assets/intro_lockup.mp4');
      videoSet.container.appendChild(videoSet.video);
      videoSet.container.appendChild(videoSet.static);

      Array.from(children).forEach((child: any) => {
        const data = child.getAttribute('data-target');
        switch (true) {
          case data === 'fitness-app':
            child.src = introData.fitness_app_icon.url;
            break;
          case data === 'fitness-heading':
            child.textContent = introData.title[0].text;
            break;
          case data === 'fitness-intro':
            child.textContent = introData.fitness_intro[0].text;
            break;
          case data === 'device-lockup':
            console.log(child);
            child.appendChild(imageSet.shadow);
            child.appendChild(imageSet.image);
            child.appendChild(videoSet.container);
            break;
        }
      });
    }
  },
  renderIphoneImages: function (introData: any) {
    const iPhone = document.querySelector<HTMLElement>('[data-target="iphone"]');
    const imageSet = {
      shadow: util.createElement('figure', 'intro-iphone__shadow'),
      image: util.createElement('figure', 'intro-iphone__render'),
    };
    util.setBackgroundImage(imageSet.shadow, introData.iphone_render.shadow.url);
    util.setBackgroundImage(imageSet.image, introData.iphone_render.url);
    util.setImageMask(imageSet.image, introData.iphone_render.mask.url);
    if (iPhone) {
      iPhone.appendChild(imageSet.shadow);
      iPhone.appendChild(imageSet.image);
    }
  },
  renderAppleTvImages: function (introData: any) {
    const appleTv = document.querySelector<HTMLElement>('[data-target="apple-tv"]');
    const imageSet = {
      shadow: util.createElement('figure', 'intro-tv__shadow'),
      image: util.createElement('figure', 'intro-tv__render'),
    };
    util.setBackgroundImage(imageSet.shadow, introData.apple_tv_render.shadow.url);
    util.setBackgroundImage(imageSet.image, introData.apple_tv_render.url);
    util.setImageMask(imageSet.image, introData.apple_tv_render.mask.url);
    if (appleTv) {
      appleTv.appendChild(imageSet.shadow);
      appleTv.appendChild(imageSet.image);
    }
  },
  renderIpadImages: function (introData: any) {
    const iPad = document.querySelector<HTMLElement>('[data-target="ipad"]');
    const imageSet = {
      shadow: util.createElement('figure', 'intro-ipad__shadow'),
      image: util.createElement('figure', 'intro-ipad__render'),
    };
    util.setBackgroundImage(imageSet.shadow, introData.ipad_render.shadow.url);
    util.setBackgroundImage(imageSet.image, introData.ipad_render.url);
    util.setImageMask(imageSet.image, introData.ipad_render.mask.url);
    if (iPad) {
      iPad.appendChild(imageSet.shadow);
      iPad.appendChild(imageSet.image);
    }
  },
  renderWatchImages: function (introData: any) {
    const appleWatch = document.querySelector<HTMLElement>('[data-target="apple-watch"]');
    const imageSet = {
      shadow: util.createElement('figure', 'intro-watch__shadow'),
      image: util.createElement('figure', 'intro-watch__render'),
    };
    util.setBackgroundImage(imageSet.shadow, introData.apple_watch_render.shadow.url);
    util.setBackgroundImage(imageSet.image, introData.apple_watch_render.url);
    util.setImageMask(imageSet.image, introData.apple_watch_render.mask.url);

    const watchVideo = {
      static: util.createElement('figure', 'intro-watch-video__static'),
      video: util.createVideoElement('video', 'intro-watch-video__video'),
      container: util.createElement('div', 'intro-watch-video'),
    };
    util.setBackgroundImage(watchVideo.static, introData.apple_watch_render.static.url);

    watchVideo.container.setAttribute('data-target', 'apple-watch-video');
    watchVideo.video.setAttribute('data-target', 'intro-video');
    if (watchVideo.video) {
      watchVideo.video.src = require('./assets/intro_watch_vid.mp4');
    }
    watchVideo.container.appendChild(watchVideo.video);
    watchVideo.container.appendChild(watchVideo.static);
    appleWatch?.appendChild(imageSet.shadow);
    appleWatch?.appendChild(imageSet.image);
    appleWatch?.appendChild(watchVideo.container);
  },
};

export default intro;

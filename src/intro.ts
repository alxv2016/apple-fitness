import util from './utility';

const intro = {
  processData: function (introData: any) {
    this.renderWatchImages(introData.primary);
  },
  renderIphoneImages: function (introData: any) {},
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
      cover: util.createElement('figure', 'intro-watch-video__start'),
      endCover: util.createElement('figure', 'intro-watch-video__end'),
      video: util.createElement('video', 'intro-watch-video__video'),
      container: util.createElement('div', 'intro-watch-video'),
    };

    util.setBackgroundImage(watchVideo.cover, introData.apple_watch_render.cover.url);
    util.setBackgroundImage(watchVideo.endCover, introData.apple_watch_render.end_cover.url);

    watchVideo.cover.setAttribute('data-target', 'intro-start');
    watchVideo.container.setAttribute('data-target', 'apple-watch-video');
    watchVideo.video.setAttribute('muted', '');
    watchVideo.video.setAttribute('playsinline', 'true');
    watchVideo.video.setAttribute('aria-hidden', 'true');
    watchVideo.video.setAttribute('data-target', 'intro-video');
    if (watchVideo.video) {
      watchVideo.video.src = require('./assets/intro_watch_vid.mp4');
    }
    watchVideo.container.appendChild(watchVideo.video);
    watchVideo.container.appendChild(watchVideo.cover);
    watchVideo.container.appendChild(watchVideo.endCover);
    appleWatch?.appendChild(imageSet.shadow);
    appleWatch?.appendChild(imageSet.image);
    appleWatch?.appendChild(watchVideo.container);
  },
};

export default intro;

import util from './utility';

const intro = {
  renderWatchImages: function (data: any) {
    const watchContainer = document.querySelector<HTMLElement>('[data-target="apple-watch"]');
    const videoContainer = document.querySelector<HTMLMediaElement>('[data-target="apple-watch"]');

    const imageSet = {
      shadow: util.createElement('figure', 'intro-watch__shadow'),
      image: util.createElement('figure', 'intro-watch__render'),
      videoCover: util.createElement('figure', 'intro-watch-video__start'),
      videoEndCover: util.createElement('figure', 'intro-watch-video__end'),
    };

    util.setBackgroundImage(imageSet.image, data.image);
  },
};

export default intro;

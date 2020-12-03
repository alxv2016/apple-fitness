import util from './utility';

const intro = {
  renderWatchImages: function (introData: any) {
    const appleWatch = document.querySelector<HTMLElement>('[data-target="apple-watch"]');

    const imageSet = {
      shadow: util.createElement('figure', 'intro-watch__shadow'),
      image: util.createElement('figure', 'intro-watch__render'),
    };
    const watchVideo = {
      cover: util.createElement('figure', 'intro-watch-video__start'),
      endCover: util.createElement('figure', 'intro-watch-video__end'),
      video: util.createElement('video', 'intro-watch-video__video'),
      container: util.createElement('div', 'intro-watch-video'),
    };
    watchVideo.cover.setAttribute('data-target', 'intro-start');
    watchVideo.container.setAttribute('data-target', 'apple-watch-video');
    watchVideo.video.setAttribute('muted', '');
    watchVideo.video.setAttribute('playsinline', 'true');
    watchVideo.video.setAttribute('aria-hidden', 'true');
    //watchVideo.video.setAttribute('data-target', 'intro-video');

    //watchVideo.container.appendChild(watchVideo.cover);
    watchVideo.container.appendChild(watchVideo.video);
    //watchVideo.container.appendChild(watchVideo.endCover);
    appleWatch?.appendChild(imageSet.shadow);
    appleWatch?.appendChild(imageSet.image);
    appleWatch?.appendChild(watchVideo.container);
    const video = document.querySelector<HTMLMediaElement>('video');
    console.log(video);
    if (video) {
      video.src = 'assets/intro_watch_vid.mp4';
      video.load();
    }
  },
};

export default intro;

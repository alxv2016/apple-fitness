import gsap from 'gsap';
import util from './utility';

const appleMusic = {
  albumCovers: document.querySelector<HTMLElement>('[data-target="album-covers"]'),
  appleMusicIntro: document.querySelector<HTMLElement>('[data-target="apple-music-intro"]'),
  iphone: document.querySelector<HTMLElement>('[data-target="music-iphone"]'),
  iphoneRender: document.querySelector<HTMLElement>('[data-target="music-iphone-render"]'),
  airPodsLeft: document.querySelector<HTMLElement>('[data-target="airpods-left"]'),
  airPodsRight: document.querySelector<HTMLElement>('[data-target="airpods-right"]'),
  playlist: document.querySelector<HTMLElement>('[data-target="playlist"]'),
  processData(trainersData: any, songsData: any, albumData: any) {
    console.log(songsData);
    this.renderAlbums(albumData.items);
    this.renderIntro(trainersData.primary);
    this.renderIphone(trainersData.primary);
    this.renderAirpods(trainersData.primary);
    this.renderPlaylist(songsData.items);
    this.renderAnimation();
  },
  renderAlbums(albumData: any) {
    if (this.albumCovers) {
      Array.from(this.albumCovers.children).forEach((cover: any, i: number) => {
        util.renderImage(cover, albumData[i].album.url);
      });
    }
  },
  renderIntro(trainersData: any) {
    if (this.appleMusicIntro) {
      Array.from(this.appleMusicIntro.children).forEach((item) => {
        switch (true) {
          case item.localName === 'h2':
            item.textContent = trainersData.apple_music_headline[0].text;
            break;
          case item.localName === 'p':
            item.textContent = trainersData.apple_music_intro[0].text;
            break;
        }
      });
    }
  },
  renderIphone(trainersData: any) {
    if (this.iphoneRender) {
      util.renderImage(this.iphoneRender, trainersData.apple_music.url, trainersData.apple_music.mask.url);
    }
  },
  renderAirpods(trainersData: any) {
    if (this.airPodsLeft && this.airPodsRight) {
      util.renderImage(this.airPodsLeft, trainersData.airpods_left.url, trainersData.airpods_left.mask.url);
      util.renderImage(this.airPodsRight, trainersData.airpods_right.url, trainersData.airpods_right.mask.url);
    }
  },
  renderPlaylist(songsData: any) {
    if (this.playlist) {
      Array.from(this.playlist.children).forEach((song: any, i: number) => {
        util.renderImage(song, songsData[i].song.url);
      });
    }
  },
  renderAnimation() {
    const appleMusic = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="apple-music"]',
        start: '-=240 center',
        end: 'bottom center',
        scrub: 0.75,
        onUpdate: ({progress}) => {
          const iphoneReveal = util.calculateScroll(progress, 3, 10);
          const airpodsReveal = util.calculateScroll(progress, 3, 30);
          if (this.iphone) {
            this.iphone.style.setProperty('--progress-start', `${iphoneReveal.start}%`);
            this.iphone.style.setProperty('--progress-end', `${iphoneReveal.end}%`);
          }
          if (this.airPodsLeft && this.airPodsRight) {
            this.airPodsLeft.style.setProperty('--progress-start', `${airpodsReveal.start}%`);
            this.airPodsLeft.style.setProperty('--progress-end', `${airpodsReveal.end}%`);
            this.airPodsRight.style.setProperty('--progress-start', `${airpodsReveal.start}%`);
            this.airPodsRight.style.setProperty('--progress-end', `${airpodsReveal.end}%`);
          }
        },
      },
    });

    gsap.to('[data-stagger="airpod"]', {
      stagger: 0.125,
      y: -490,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="apple-music"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
      },
    });

    appleMusic
      .from('[data-stagger="album"]', {
        //stagger: 0.75,
        opacity: 0,
        yPercent: 40,
        delay: 0.75,
      })
      .from('[data-stagger="song"]', {
        stagger: 0.45,
        scale: 1.25,
        opacity: 0,
        y: -60,
      })
      .from(
        '[data-stagger="value-prop"]',
        {
          stagger: 0.25,
          opacity: 0,
          y: 60,
          delay: 0.25,
        },
        0.75
      );
  },
};

export default appleMusic;

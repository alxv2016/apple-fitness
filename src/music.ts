import gsap from 'gsap';
import util from './utility';

const appleMusic = {
  albumCovers: util.selectElement('[data-target="album-covers"]'),
  appleMusicIntro: util.selectElement('[data-target="apple-music-intro"]'),
  iphone: util.selectElement('[data-target="music-iphone"]'),
  airPods: util.selectElement('[data-target="airpods"]'),
  playlist: util.selectElement('[data-target="playlist"]'),
  processData(trainersData: any, songsData: any, albumData: any) {
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
        util.renderImage(cover)(albumData[i].album.url);
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
    if (this.iphone) {
      const el = util.renderImage(this.iphone.firstElementChild as HTMLElement)(
        trainersData.apple_music.url,
        trainersData.apple_music.mask.url
      );
      el.classList.add('l-device--reveal');
      this.iphone.prepend(el);
    }
  },
  renderAirpods(trainersData: any) {
    if (this.airPods) {
      const left = util.renderImage(this.airPods.firstElementChild as HTMLElement)(
        trainersData.airpods_left.url,
        trainersData.airpods_left.mask.url
      );
      const right = util.renderImage(this.airPods.lastElementChild as HTMLElement)(
        trainersData.airpods_right.url,
        trainersData.airpods_right.mask.url
      );
      this.airPods.append(left, right);
    }
  },
  renderPlaylist(songsData: any) {
    if (this.playlist) {
      Array.from(this.playlist.children).forEach((song: any, i: number) => {
        const el = util.renderImage(song)(songsData[i].song.url);
        this.playlist?.append(el);
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
          const iphoneReveal = util.calculateScroll(progress, 3, 4);
          if (this.iphone) {
            let el = this.iphone.firstElementChild as HTMLElement;
            el.style.setProperty('--progress-start', `${iphoneReveal.start}%`);
            el.style.setProperty('--progress-end', `${iphoneReveal.end}%`);
          }
        },
      },
    });

    gsap.to('[data-stagger="airpod"]', {
      y: -490,
      duration: 6,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="apple-music"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
      },
    });

    gsap.from('[data-stagger="song"]', {
      stagger: 0.25,
      scale: 1.25,
      opacity: 0,
      y: -60,
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
        stagger: 0.75,
        opacity: 0,
        yPercent: 40,
        duration: 6,
      })
      .to(
        '[data-target="music-iphone"]',
        {
          yPercent: -10,
          duration: 6,
        },
        0.75
      );
  },
};

export default appleMusic;

import gsap from 'gsap';
import util from './utility';

const trainers = {
  hero: document.querySelector<HTMLElement>('[data-target="trainers-hero"]'),
  trainersContent: document.querySelector<HTMLElement>('[data-target="trainers-content"]'),
  processData(trainersData: any) {
    console.log(trainersData);
    this.renderHero(trainersData.primary);
    this.renderAnimation();
  },
  renderHero(trainersData: any) {
    const renders = {
      shadow: util.createElement('figure', 'c-section-hero__shadow'),
      image: util.createElement('figure', 'c-section-hero__image'),
      duoTone: util.createElement('figure', 'c-section-hero__duo-tone', 'trainers-hero-duo-tone'),
      bw: util.createElement('figure', 'c-section-hero__bw', 'trainers-hero-bw'),
    };
    if (this.hero) {
      util.renderImage(renders.shadow, trainersData.trainers_hero.shadow.url);
      util.renderImage(renders.image, trainersData.trainers_hero.url, trainersData.trainers_hero.mask.url);
      util.renderImage(renders.duoTone, trainersData.trainers_hero.duo_tone.url, trainersData.trainers_hero.mask.url);
      util.renderImage(renders.bw, trainersData.trainers_hero.bw.url, trainersData.trainers_hero.mask.url);
      this.hero.append(renders.shadow, renders.image, renders.duoTone, renders.bw);
    }
    if (this.trainersContent) {
      Array.from(this.trainersContent.children).forEach((item) => {
        switch (true) {
          case item.localName === 'h2':
            item.textContent = trainersData.overline[0].text;
            break;
          case item.localName === 'h3':
            item.textContent = trainersData.title[0].text;
            break;
          case item.localName === 'p':
            item.textContent = trainersData.headline_intro[0].text;
            break;
        }
      });
    }
  },
  renderAnimation() {
    gsap.to('[data-target="trainers-hero-duo-tone"]', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="trainers-hero"]',
        start: '+=200 +=200',
        end: 'center +=200',
        scrub: 0.65,
      },
    });

    const trainersHero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: true,
        trigger: '[data-trigger="trainers-hero"]',
        start: 'top top',
        end: 'center top',
        pin: true,
        pinSpacing: false,
        scrub: 0.175,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          let clipProgress = scrollProgress;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          clipProgress > 50 ? (clipProgress = 50) : clipProgress;
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.hero.style.setProperty('--progress-end', `${endProgress}%`);
            this.hero.style.setProperty('--clip-progress', `${clipProgress}%`);
          }
        },
      },
    });

    trainersHero
      .to('[data-target="trainers-hero"]', {
        scale: 1.45,
      })
      .to('[data-target="trainers-hero-bw"]', {
        opacity: 1,
      })
      .from('[data-target="trainers-intro"]', {
        stagger: 0.25,
        ease: 'none',
        opacity: 0,
        y: 50,
      });

    gsap.from('[data-target="workouts-intro"]', {
      stagger: 0.25,
      ease: 'none',
      opacity: 0,
      y: 50,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-content"]',
        scrub: 0.45,
        start: '-=400 center',
        end: 'center center',
      },
    });
  },
};

export default trainers;

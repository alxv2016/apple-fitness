import gsap from 'gsap';
import util from './utility';

const trainers = {
  hero: document.querySelector<HTMLElement>('[data-target="trainers-hero"]'),
  trainersContent: document.querySelector<HTMLElement>('[data-target="trainers-content"]'),
  trainersTitle: document.querySelector<HTMLElement>('[data-group="trainers-title"]'),
  trainersGroupA: document.querySelector<HTMLElement>('[data-target="trainers-group-a"]'),
  processData(trainersData: any) {
    console.log(trainersData);
    this.renderHero(trainersData.primary);
    this.renderTrainers(trainersData.items);
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
  renderTrainers(trainersData: any) {
    const trainersGroupA = trainersData
      .filter((trainers: any) => trainers.group_id === 'group_a')
      .map((trainer: any) => {
        const renders = {
          image: util.createElement('figure', 'c-trainer-card__image'),
          label: util.createElement('span', 'c-trainer-card__label'),
        };
        util.renderImage(renders.image, trainer.trainer_image.url);
        renders.label.textContent = trainer.trainer_name;
        return renders;
      });
    const trainersGroupB = trainersData
      .filter((trainers: any) => trainers.group_id === 'group_b')
      .map((trainer: any) => {
        const renders = {
          image: util.createElement('figure', 'c-trainer-card__image'),
          label: util.createElement('span', 'c-trainer-card__label'),
        };
        util.renderImage(renders.image, trainer.trainer_image);
        renders.label.textContent = trainer.trainer_name;
        return renders;
      });

    if (this.trainersGroupA) {
      Array.from(this.trainersGroupA.children).forEach((item, i) => {
        item.append(trainersGroupA[i].image, trainersGroupA[i].label);
      });
    }
    console.log(this.trainersGroupA);
    console.log(trainersGroupA, trainersGroupB);
  },
  renderAnimation() {
    const trainersHero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="trainers-hero"]',
        start: 'top +=20',
        end: 'center +=20',
        pin: true,
        scrub: 0.65,
        onUpdate: ({progress}) => {
          let scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          scrollProgress > 20 ? (scrollProgress = 20) : scrollProgress;
          endProgress > 70 ? (endProgress = 70) : endProgress;
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.hero.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (this.trainersTitle) {
            this.trainersTitle.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.trainersTitle.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    trainersHero
      .to('[data-target="trainers-hero-duo-tone"]', {
        opacity: 0,
        delay: 0.45,
      })
      .to('[data-target="trainers-hero-bw"]', {
        opacity: 1,
        delay: 0.25,
      })
      .from(
        '[data-target="trainers-hero"]',
        {
          scale: 1.45,
        },
        0.25
      )
      .to(
        '[data-target="trainers-hero"]',
        {
          backgroundColor: '#131331',
        },
        0.45
      )
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

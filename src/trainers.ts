import gsap from 'gsap';
import util from './utility';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const trainers = {
  hero: document.querySelector<HTMLElement>('[data-target="trainers-hero"]'),
  trainersContent: document.querySelector<HTMLElement>('[data-target="trainers-content"]'),
  trainersTitle: document.querySelector<HTMLElement>('[data-group="trainers-title"]'),
  trainersGroupA: document.querySelector<HTMLElement>('[data-target="trainers-group-a"]'),
  trainersGroupB: document.querySelector<HTMLElement>('[data-target="trainers-group-b"]'),
  trainers: document.querySelector<HTMLElement>('[data-target="trainers"]'),
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
          trainerCard: util.createElement('div', 'c-trainer-card'),
          container: util.createElement('div', 'c-trainer-card__container'),
          image: util.createElement('figure', 'c-trainer-card-image'),
          label: util.createElement('span', 'c-trainer-card-label'),
        };
        util.renderImage(renders.image, trainer.trainer_image.url);
        renders.label.textContent = trainer.trainer_name;
        renders.container.append(renders.image, renders.label);
        renders.trainerCard.append(renders.container);
        return renders.trainerCard;
      });

    const trainersGroupAClone = trainersGroupA.map((item: any) => {
      const clone = item.cloneNode(true);
      return clone;
    });

    const trainersGroupAMerged = trainersGroupA.concat(trainersGroupAClone);

    const trainersGroupB = trainersData
      .filter((trainers: any) => trainers.group_id === 'group_b')
      .map((trainer: any) => {
        const renders = {
          trainerCard: util.createElement('div', 'c-trainer-card'),
          container: util.createElement('div', 'c-trainer-card__container'),
          image: util.createElement('figure', 'c-trainer-card-image'),
          label: util.createElement('span', 'c-trainer-card-label'),
        };
        util.renderImage(renders.image, trainer.trainer_image.url);
        renders.label.textContent = trainer.trainer_name;
        renders.container.append(renders.image, renders.label);
        renders.trainerCard.append(renders.container);
        return renders.trainerCard;
      });

    const trainersGroupBClone = trainersGroupB.map((item: any) => {
      const clone = item.cloneNode(true);
      return clone;
    });

    const trainersGroupBMerged = trainersGroupB.concat(trainersGroupBClone);

    trainersGroupAMerged.forEach((trainer: any) => {
      if (this.trainersGroupA) {
        this.trainersGroupA.append(trainer);
      }
    });
    trainersGroupBMerged.forEach((trainer: any) => {
      if (this.trainersGroupB) {
        this.trainersGroupB.append(trainer);
      }
    });
  },
  renderAnimation() {
    ScrollTrigger.create({
      markers: false,
      trigger: '[data-trigger="trainers"]',
      start: '-=200 top',
      end: 'center top',
      scrub: 0.65,
      onUpdate: ({progress}) => {
        const trainersReveal = util.calculateScroll(progress, 3, 10);
        if (this.trainers) {
          this.trainers.style.setProperty('--progress-start', `${trainersReveal.start}%`);
          this.trainers.style.setProperty('--progress-end', `${trainersReveal.end}%`);
        }
      },
    });

    gsap.to('[data-group="trainer-profiles"]', {
      duration: 95,
      ease: 'none',
      xPercent: -50,
      repeat: -1,
    });

    ScrollTrigger.create({
      markers: false,
      trigger: '[data-trigger="pinned-content"]',
      start: 'top top',
      end: 'center top',
      pin: true,
      pinSpacing: true,
      scrub: 0.75,
    });

    const trainersHero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-search"]',
        start: 'center top',
        end: '+=120% top',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const heroReveal = util.calculateScroll(progress, 3, 10);
          const titleReveal = util.calculateScroll(progress);
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${heroReveal.start}%`);
            this.hero.style.setProperty('--progress-end', `${heroReveal.end}%`);
          }
          if (this.trainersTitle) {
            this.trainersTitle.style.setProperty('--progress-start', `${titleReveal.start}%`);
            this.trainersTitle.style.setProperty('--progress-end', `${titleReveal.end}%`);
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
          y: 120,
        },
        0
      )
      .to(
        '[data-target="trainers-hero"]',
        {
          backgroundColor: '#131331',
        },
        0.45
      )
      .from(
        '[data-target="trainers-intro"]',
        {
          stagger: 0.25,
          ease: 'none',
          opacity: 0,
          y: 50,
        },
        0.45
      );
  },
};

export default trainers;

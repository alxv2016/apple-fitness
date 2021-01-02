import gsap from 'gsap';
import util from './utility';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const trainers = {
  hero: util.selectElement('[data-target="trainer-hero-image"]'),
  trainersContent: util.selectElement('[data-target="trainers-content"]'),
  trainersTitle: util.selectElement('[data-group="trainers-title"]'),
  trainersGroupA: util.selectElement('[data-target="trainers-group-a"]'),
  trainersGroupB: util.selectElement('[data-target="trainers-group-b"]'),

  trainers: document.querySelector<HTMLElement>('[data-target="trainers"]'),
  processData(trainersData: any) {
    this.renderHero(trainersData.primary);
    this.renderTrainers(trainersData.items);
    this.renderAnimation();
  },
  renderHero(trainersData: any) {
    if (this.hero) {
      const el1 = util.renderImage(this.hero.firstElementChild as HTMLElement)(trainersData.trainers_hero.shadow.url);
      const el2 = util.renderImage(this.hero.firstElementChild?.nextElementSibling as HTMLElement)(
        trainersData.trainers_hero.url,
        trainersData.trainers_hero.mask.url
      );
      const el3 = util.renderImage(this.hero.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement)(
        trainersData.trainers_hero.duo_tone.url,
        trainersData.trainers_hero.mask.url
      );
      const el4 = util.renderImage(this.hero.lastElementChild as HTMLElement)(
        trainersData.trainers_hero.bw.url,
        trainersData.trainers_hero.mask.url
      );
      this.hero.append(el1, el2, el3, el4);
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
    const trainersGroupAData = trainersData.filter((trainer: any) => trainer.group_id === 'group_a');
    const trainersGroupBData = trainersData.filter((trainer: any) => trainer.group_id === 'group_b');

    if (this.trainersGroupA) {
      Array.from(this.trainersGroupA.children).forEach((item, i) => {
        const image = util.renderImage(util.createElement('figure')('c-trainer-card-image'))(
          trainersGroupAData[i].trainer_image.url
        );
        const label = util.createElement('span')('c-trainer-card-label');
        label.textContent = trainersGroupAData[i].trainer_name;
        let el = item.firstElementChild as HTMLElement;
        el.append(image, label);
        const clone = item.cloneNode(true);
        this.trainersGroupA?.append(clone);
      });
    }

    if (this.trainersGroupB) {
      Array.from(this.trainersGroupB.children).forEach((item, i) => {
        const image = util.renderImage(util.createElement('figure')('c-trainer-card-image'))(
          trainersGroupBData[i].trainer_image.url
        );
        const label = util.createElement('span')('c-trainer-card-label');
        label.textContent = trainersGroupBData[i].trainer_name;
        let el = item.firstElementChild as HTMLElement;
        el.append(image, label);
        const clone = item.cloneNode(true);
        this.trainersGroupB?.append(clone);
      });
    }
  },
  renderAnimation() {
    ScrollTrigger.create({
      markers: false,
      trigger: '[data-trigger="pinned-content"]',
      start: 'top 40',
      end: '240 40',
      pin: true,
      pinSpacing: true,
      scrub: 0.75,
    });

    const heroDuotone = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="trainer-hero"]',
        start: '-=300 center',
        end: 'center center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const heroReveal = util.calculateScroll(progress, 4);
          if (this.hero) {
            let el = this.hero.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement;
            el.classList.add('l-hero--reveal');
            el.style.setProperty('--progress-start', `${heroReveal.start}%`);
            el.style.setProperty('--progress-end', `${heroReveal.end}%`);
          }
        },
      },
    });

    heroDuotone
      .to('[data-target="trainer-hero"]', {
        scale: 1.4,
        duration: 4,
      })
      .to(
        '[data-target="trainer-hero"]',
        {
          backgroundColor: '#131331',
          duration: 4,
        },
        1.25
      )
      .to('[data-target="trainer-duo-tone"]', {
        opacity: 0,
        delay: 0.45,
      })
      .to('[data-target="trainer-bw"]', {
        opacity: 1,
      });

    gsap.from('[data-target="trainers-intro"]', {
      stagger: 0.25,
      ease: 'none',
      opacity: 0,
      y: 50,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="trainers-content"]',
        start: '-=200 center',
        end: 'center center',
        scrub: 0.65,
      },
    });

    ScrollTrigger.create({
      markers: false,
      trigger: '[data-trigger="trainers"]',
      start: '-=200 top',
      end: 'center top',
      scrub: 0.65,
      onUpdate: ({progress}) => {
        const trainersReveal = util.calculateScroll(progress, 4, 4);
        if (this.trainers) {
          this.trainers.classList.add('l-content--reveal');
          this.trainers.style.setProperty('--progress-start', `${trainersReveal.start}%`);
          this.trainers.style.setProperty('--progress-end', `${trainersReveal.end}%`);
        }
      },
    });

    const profiles = gsap.to('[data-group="trainer-profiles"]', {
      duration: 95,
      ease: 'none',
      xPercent: -50,
      repeat: -1,
    });
    util.mediaControl(profiles);
  },
};

export default trainers;

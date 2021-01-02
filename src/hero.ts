import util from './utility';
import {gsap} from 'gsap';

const hero = {
  hero: util.selectElement('[data-target="hero"]'),
  heroContainer: util.selectElement('[data-target="hero-container"]'),
  heroLogo: util.selectElement('[data-target="hero-logo"]'),
  processData(heroData: any) {
    this.renderHero(heroData.items);
    this.renderHeroLogo(heroData.primary);
    this.renderAnimations();
  },
  renderHero: function (heroData: any) {
    const heroIds = ['hero-01', 'hero-02', 'hero-03', 'hero-04'];
    const index = util.randomize(0, 3);
    if (this.heroLogo) {
      this.heroLogo.setAttribute('data-hero', heroIds[index]);
    }
    if (this.heroContainer) {
      this.heroContainer.setAttribute('data-hero', heroIds[index]);
      const heroId = this.heroContainer.getAttribute('data-hero');
      const imageData = heroData.filter((hero: any) => hero.hero_id === heroId)[0].hero_image;
      const shadow = util.renderImage(this.heroContainer.firstElementChild as HTMLElement)(imageData.shadow.url);
      const image = util.renderImage(this.heroContainer.lastElementChild as HTMLElement)(
        imageData.url,
        imageData.mask.url
      );
      this.heroContainer.append(shadow, image);
    }
  },
  renderHeroLogo: function (heroData: any) {
    const logoClasses = [
      'c-hero-logo__container--apple',
      'c-hero-logo__container--f',
      'c-hero-logo__container--i',
      'c-hero-logo__container--t',
      'c-hero-logo__container--n',
      'c-hero-logo__container--e',
      'c-hero-logo__container--s1',
      'c-hero-logo__container--s2',
      'c-hero-logo__container--plus',
    ];
    if (this.heroLogo) {
      const ay11Title = util.createElement('span')('visually-hidden');
      ay11Title.textContent = heroData.headline[0].text;
      this.heroLogo.append(ay11Title);
      logoClasses.forEach((logoClass) => {
        const div = util.createElement('div')(`c-hero-logo__container ${logoClass}`);
        const fig = util.createElement('figure')('c-logo');
        div.append(fig);
        this.heroLogo?.append(div);
      });
    }
  },
  renderAnimations() {
    gsap.to('[data-target="hero-container"]', {
      y: 20,
      duration: 6,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="hero"]',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.45,
        onUpdate: ({progress}) => {
          const heroHide = util.calculateScroll(progress, 3, 20);
          if (this.heroContainer) {
            let el = this.heroContainer.lastElementChild as HTMLElement;
            el.classList.add('l-hero--hide');
            el.style.setProperty('--end-progress-start', `${heroHide.start}%`);
            el.style.setProperty('--end-progress-end', `${heroHide.end}%`);
          }
        },
      },
    });
  },
};
export default hero;

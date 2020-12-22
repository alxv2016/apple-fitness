import util from './utility';
import {gsap} from 'gsap';

const hero = {
  hero: document.querySelector<HTMLElement>('[data-target="hero"]'),
  heroContainer: document.querySelector<HTMLElement>('[data-target="hero-container"]'),
  heroLogo: document.querySelector<HTMLElement>('[data-target="hero-logo"]'),
  heroContent: document.querySelector<HTMLElement>('[data-target="hero-content"]'),
  pricingGrid: document.querySelector<HTMLElement>('[data-target="pricing-grid"]'),
  processData(heroData: any, valueData: any, pricingData: any) {
    this.renderHero(heroData.items);
    this.renderHeroLogo(heroData.primary);
    this.renderValueProp(valueData);
    this.renderPricing(pricingData);
    this.renderAnimations();
  },
  randomizeHero() {
    const heroImages = ['hero-01', 'hero-02', 'hero-03', 'hero-04'];
    const index = util.randomize(0, 3);
    if (this.heroContainer) {
      this.heroContainer.setAttribute('data-hero', heroImages[index]);
    }
    if (this.heroLogo) {
      this.heroLogo.setAttribute('data-hero', heroImages[index]);
    }
  },
  renderHero: function (heroData: any) {
    if (this.heroContainer) {
      const heroId = this.heroContainer.getAttribute('data-hero');
      const image = heroData.filter((hero: any) => hero.hero_id === heroId)[0].hero_image;
      const hero = {
        shadow: util.createElement('figure', 'c-hero-shadow'),
        image: util.createElement('figure', 'c-hero-image'),
      };
      util.renderImage(hero.shadow, image.shadow.url);
      util.renderImage(hero.image, image.url, image.mask.url);
      this.heroContainer.append(hero.shadow, hero.image);
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
      const ay11Title = util.createElement('span', 'visually-hidden');
      ay11Title.textContent = heroData.headline[0].text;
      this.heroLogo.appendChild(ay11Title);
      logoClasses.forEach((logoClass) => {
        const div = util.createElement('div', `c-hero-logo__container ${logoClass}`, 'logo');
        const fig = util.createElement('figure', 'c-logo');
        div.appendChild(fig);
        if (this.heroLogo) {
          this.heroLogo.appendChild(div);
        }
      });
    }
  },
  renderValueProp: function (heroData: any) {
    if (this.heroContent) {
      const heading = this.heroContent.querySelector('[data-target="move-title"]');
      const valueProps = this.heroContent.querySelectorAll('[data-target="value-prop"]');
      if (heading) {
        heading.textContent = heroData.primary.value_headline[0].text;
      }
      heroData.items.forEach((value: any, i: number) => {
        const p = util.createElement('p', 'title-headline title--contained');
        p.textContent = value.value_prop[0].text;
        valueProps[i].appendChild(p);
      });
    }
  },
  renderPricing: function (pricingData: any) {
    if (this.pricingGrid) {
      const pricing = this.pricingGrid.querySelectorAll('[data-target="pricing-grid-item"]');
      pricingData.items.forEach((item: any, i: number) => {
        const h2 = util.createElement('h2', 'title-overline title--muted');
        const h3 = util.createElement('h3', 'title-headline');
        const p = util.createElement('p', 'small-print');
        h2.textContent = item.subheading[0].text;
        h3.innerHTML = item.price[0].text;
        p.textContent = item.description[0].text;
        pricing[i].append(h2, h3, p);
      });
    }
  },
  renderAnimations() {
    gsap.to('[data-target="logo"]', {
      yPercent: -40,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="hero"]',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self: any) => {
          const progress = Math.floor(self.progress * 100);
          let endProgress = progress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${progress}%`);
            this.hero.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    const heroContent = gsap.timeline({
      defaults: {
        ease: 'ease',
        opacity: 0,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="hero-content"]',
        start: '-=620 center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self: any) => {
          const progress = Math.floor(self.progress * 100);
          let endProgress = Math.round(progress * 1.5);
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.heroContent) {
            this.heroContent.style.setProperty('--progress-start', `${progress}%`);
            this.heroContent.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    heroContent
      .from('[data-target="value-prop"]', {
        yPercent: 200,
        stagger: 0.25,
      })
      .from('[data-target="pricing-grid"]', {
        yPercent: 40,
      });
  },
};
export default hero;

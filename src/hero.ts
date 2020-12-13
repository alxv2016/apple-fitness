import util from './utility';

const hero = {
  heroContainer: document.querySelector('[data-target="hero-container"]'),
  heroContent: document.querySelector('[data-target="hero-content"]'),
  heroPricing: document.querySelector('[data-target="pricing-grid"]'),
  heroHeading: document.querySelector('[data-target="hero-heading"]'),
  processData: function (heroData: any, valueData: any, pricingData: any) {
    this.renderHeroImage(heroData.items);
    this.renderHeroHeading(heroData.primary);
    this.renderValueProp(valueData);
    this.renderPricing(pricingData);
  },
  randomizeHero: function () {
    const heroImages = ['hero-01', 'hero-02', 'hero-03', 'hero-04'];
    const index = util.randomize(0, 3);
    if (this.heroContainer) {
      this.heroContainer.setAttribute('data-hero', heroImages[index]);
    }
    if (this.heroHeading) {
      this.heroHeading.setAttribute('data-hero', heroImages[index]);
    }
  },
  renderHeroImage: function (heroData: any) {
    if (this.heroContainer) {
      const heroId = this.heroContainer.getAttribute('data-hero');
      const image = heroData.filter((hero: any) => hero.hero_id === heroId)[0].hero_image;
      const imageSet = {
        shadow: util.createElement('figure', 'hero-image-shadow'),
        image: util.createElement('figure', 'hero-image'),
      };
      util.setBackgroundImage(imageSet.shadow, image.shadow.url);
      util.setImageMask(imageSet.image, image.mask.url);
      util.setBackgroundImage(imageSet.image, image.url);
      this.heroContainer.append(imageSet.shadow, imageSet.image);
    }
  },
  renderHeroHeading: function (heroData: any) {
    const logoClasses = [
      'logo-container--apple',
      'logo-container--f',
      'logo-container--i',
      'logo-container--t',
      'logo-container--n',
      'logo-container--e',
      'logo-container--s1',
      'logo-container--s2',
      'logo-container--plus',
    ];
    const ay11Title = util.createElement('span', 'visually-hidden');
    ay11Title.textContent = heroData.headline[0].text;
    if (this.heroHeading) {
      this.heroHeading.appendChild(ay11Title);
      logoClasses.forEach((logoClass) => {
        if (this.heroHeading) {
          const div = util.createElement('div', `logo-container ${logoClass}`, 'logo');
          const fig = util.createElement('figure', 'logo');
          div.appendChild(fig);
          this.heroHeading.appendChild(div);
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
        if (valueProps) {
          valueProps[i].appendChild(p);
        }
      });
    }
  },
  renderPricing: function (pricingData: any) {
    if (this.heroPricing) {
      const pricing = this.heroPricing.querySelectorAll('[data-target="pricing-grid-item"]');
      pricingData.items.forEach((item: any, i: number) => {
        const h2 = util.createElement('h2', 'title-overline title--muted');
        const h3 = util.createElement('h3', 'title-headline');
        const p = util.createElement('p', 'small-print');
        h2.textContent = item.subheading[0].text;
        h3.innerHTML = item.price[0].text;
        p.textContent = item.description[0].text;
        if (pricing) {
          pricing[i].append(h2, h3, p);
        }
      });
    }
  },
};
export default hero;

import util from './utility';

const hero = {
  heroImage: document.querySelector('[data-target="hero-image"]'),
  heroContent: document.querySelector('[data-target="hero-content"]'),
  heroPricing: document.querySelector('[data-target="hero-pricing"]'),
  randomizeHero: function () {
    const heroImages = ['hero-01', 'hero-02', 'hero-03', 'hero-04'];
    const index = util.randomize(0, 3);
    this.heroImage?.setAttribute('data-hero', heroImages[index]);
  },
  renderHeroImage: function (heroData: any) {
    const heroId = this.heroImage?.getAttribute('data-hero');
    const image = heroData.items.filter((hero: any) => hero.hero_id === heroId)[0].hero_image;
    const imageSet = {
      shadow: util.createElement('figure', 'hero-image-shadow'),
      image: util.createElement('figure', 'hero-image'),
    };
    util.setBackgroundImage(imageSet.shadow, image.shadow.url);
    util.setImageMask(imageSet.image, image.mask.url);
    util.setBackgroundImage(imageSet.image, image.url);
    if (this.heroImage) {
      this.heroImage.appendChild(imageSet.shadow);
      this.heroImage.appendChild(imageSet.image);
    }
  },
  renderValueProp: function (heroData: any) {
    const heading = this.heroContent?.querySelector('[data-target="value-prop-title"]');
    const valueProps = this.heroContent?.querySelectorAll('[data-target="value-prop"]');
    if (heading) {
      heading.textContent = heroData.primary.value_headline[0].text;
    }
    heroData.items.forEach((value: any, i: number) => {
      const p = util.createElement('p', 'large--title');
      p.textContent = value.value_prop[0].text;
      if (valueProps) {
        valueProps[i].appendChild(p);
      }
    });
  },
  renderPricing: function (pricingData: any) {
    const pricing = this.heroPricing?.querySelectorAll('[data-target="hero-price"]');
    pricingData.items.forEach((item: any, i: number) => {
      const h2 = util.createElement('h2', 'title--3');
      const h3 = util.createElement('h3', 'large--title');
      const p = util.createElement('p', 'subtitle');
      h2.textContent = item.subheading[0].text;
      h3.innerHTML = item.price[0].text;
      p.textContent = item.description[0].text;
      if (pricing) {
        pricing[i].appendChild(h2);
        pricing[i].appendChild(h3);
        pricing[i].appendChild(p);
      }
    });
  },
};
export default hero;

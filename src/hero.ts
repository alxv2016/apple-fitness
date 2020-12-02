import util from './utility';

const hero = {
  heroImage: document.querySelector('[data-target="hero-image"]'),
  heroContainer: document.querySelector('[data-target="hero"]'),
  randomizeHero: function () {
    const heroImages = ['hero-01', 'hero-02', 'hero-03', 'hero-04'];
    const index = util.randomize(0, 3);
    this.heroContainer?.setAttribute('data-hero', heroImages[index]);
  },
  renderHeroImage: function (currentHero: any) {
    const imageSet = {
      shadow: util.createElement('figure', 'hero-image-shadow'),
      image: util.createElement('figure', 'hero-image'),
    };
    util.setBackgroundImage(imageSet.shadow, currentHero.image_layer_3.url);
    util.setImageMask(imageSet.image, currentHero.image_layer_2.url);
    util.setBackgroundImage(imageSet.image, currentHero.image_layer_1);
    if (this.heroImage) {
      this.heroImage.appendChild(imageSet.shadow);
      this.heroImage.appendChild(imageSet.image);
    }
  },
};
export default hero;

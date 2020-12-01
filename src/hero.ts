const hero = {
  heroImage: document.querySelector('[data-target="hero-image"]'),
  heroContainer: document.querySelector('[data-target="hero"]'),
  heroImages: ['hero-01', 'hero-02', 'hero-03', 'hero-04'],
  randomizeHero: function () {
    const index = this.randomize(0, 3);
    this.heroContainer?.setAttribute('data-hero', hero.heroImages[index]);
  },
  setBackgroundImage: function (element: HTMLElement, url: string) {
    element.style.backgroundImage = `url('${url}')`;
  },
  setImageMask: function (element: HTMLElement, url: string) {
    element.style.webkitMaskImage = `url('${url}')`;
    element.style.maskImage = `url('${url}')`;
  },
  createHeroElement: function (element: string, className: string) {
    const el = document.createElement(element);
    el.className = className;
    return el;
  },
  attachHeroImage: function (currentHero: any) {
    const imageSet = {
      shadow: this.createHeroElement('figure', 'hero-image-shadow'),
      image: this.createHeroElement('figure', 'hero-image'),
    };
    const md = window.matchMedia('(min-width: 768px)');
    if (md.matches) {
      this.setBackgroundImage(imageSet.image, currentHero.image_layer_1.url);
      this.setImageMask(imageSet.image, currentHero.image_layer_2.url);
      this.setBackgroundImage(imageSet.shadow, currentHero.image_layer_3.url);
    } else {
      this.setBackgroundImage(imageSet.image, currentHero.image_layer_1.small.url);
      this.setImageMask(imageSet.image, currentHero.image_layer_2.small.url);
      this.setBackgroundImage(imageSet.shadow, currentHero.image_layer_3.small.url);
    }
    console.log(currentHero);

    md.addEventListener('change', (e) => {
      if (e.matches) {
        console.log('should update to large images');
        this.setBackgroundImage(imageSet.image, currentHero.image_layer_1.url);
        this.setImageMask(imageSet.image, currentHero.image_layer_2.url);
        this.setBackgroundImage(imageSet.shadow, currentHero.image_layer_3.url);
      } else {
        console.log('should update to small images');
        this.setBackgroundImage(imageSet.image, currentHero.image_layer_1.small.url);
        this.setImageMask(imageSet.image, currentHero.image_layer_2.small.url);
        this.setBackgroundImage(imageSet.shadow, currentHero.image_layer_3.small.url);
      }
    });
    this.heroImage?.appendChild(imageSet.shadow);
    this.heroImage?.appendChild(imageSet.image);
  },
  randomize: function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
export default hero;

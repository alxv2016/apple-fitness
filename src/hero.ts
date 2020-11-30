const hero = {
  heroImage: document.querySelector('[data-target="hero-image"]'),
  heroContainer: document.querySelector('[data-target="hero"]'),
  heroImages: ['hero-01', 'hero-02', 'hero-03', 'hero-04'],
  randomizeHero: () => {
    const index = hero.randomize(0, 3);
    hero.heroContainer?.setAttribute('data-hero', hero.heroImages[index]);
  },
  attachHeroImage: (heros: any[], currentHero: any) => {
    const shadow = document.createElement('figure');
    const image = document.createElement('figure');
    shadow.className = 'hero-image-shadow';
    image.className = 'hero-image';
    heros.forEach((heroImg) => {
      if (currentHero === heroImg.hero_id) {
        shadow.style.backgroundImage = `url('${heroImg.image_layer_3.url}')`;
        image.setAttribute(
          'style',
          `background-image: url('${heroImg.image_layer_1.url}'); -webkit-mask-image: url('${heroImg.image_layer_2.url}'); mask-image: url('${heroImg.image_layer_2.url}');`
        );
      }
    });
    hero.heroImage?.appendChild(shadow);
    hero.heroImage?.appendChild(image);
  },
  randomize: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
export default hero;

const hero = {
  heroContainer: document.querySelector('.js-hero'),
  heroImages: ['hero-01', 'hero-02', 'hero-03', 'hero-04'],
  randomizeHero: () => {
    const index = hero.randomize(0, 3);
    hero.heroContainer?.classList.add(`${hero.heroImages[index]}`);
  },
  randomize: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
export default hero;

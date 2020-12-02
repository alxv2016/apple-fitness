import './scss/app.scss';
import Axios from 'axios';
import hero from './hero';
// import accordion from './accordion';
// import slider from './slider';
import scrollTrigger from './scroll-trigger';
// accordion.initAccordion();
// slider.initSlider();
scrollTrigger.stickyHeader();
hero.randomizeHero();
const heroContentParent = document.querySelector('[data-target="hero-content"]');
const pricingContentParent = document.querySelector('[data-target="hero-pricing"]');
proccessData();

async function masterRef(): Promise<string> {
  return await Axios.get(`${process.env.API_URL}`).then((resp) => resp.data.refs[0].ref);
}

async function getData(ref: string) {
  hero.heroContainer?.setAttribute('data-state', 'loading');
  heroContentParent?.setAttribute('data-state', 'loading');
  pricingContentParent?.setAttribute('data-state', 'loading');
  const query = '[[at(document.type, "apple_fitness_plus")]]';
  return await Axios.get(`${process.env.API_URL}/documents/search`, {
    params: {ref: ref, access_token: process.env.ACCESS_TOKEN, q: query},
  }).then((resp) => resp.data.results);
}

async function proccessData() {
  try {
    const ref = await masterRef();
    const data = await getData(ref);
    const appleFitnessData = data[0].data.body;
    // throw new Error('uh oh');
    accessData(appleFitnessData);
    heroContentParent?.removeAttribute('data-state');
    pricingContentParent?.removeAttribute('data-state');
    hero.heroContainer?.removeAttribute('data-state');
    scrollTrigger.heroSection();
    scrollTrigger.introSection();
  } catch (error) {
    console.log(error.message);
  }
}

function createElement(element: string, classes: string | null = null) {
  const el = document.createElement(element);
  if (classes) {
    el.className = classes;
  }
  return el;
}

function accessData(data: any) {
  console.log(data);
  const heroId = hero.heroContainer?.getAttribute('data-hero');
  const heroImages = data.filter((content: any) => content.slice_type === 'hero_image')[0];
  const heroContent = data.filter((content: any) => content.slice_type === 'hero_content')[0];
  const pricingContent = data.filter((content: any) => content.slice_type === 'pricing')[0];
  const currentHero = heroImages.items.filter((hero: any) => hero.hero_id === heroId)[0];
  hero.attachHeroImage(currentHero);
  const valuePropContainers = heroContentParent?.querySelectorAll('[data-target="value-prop"]');
  const valuePropH2 = heroContentParent?.querySelector('[data-target="value-prop-title"]');
  const pricingContainers = pricingContentParent?.querySelectorAll('[data-target="hero-price"]');

  if (valuePropH2) {
    valuePropH2.textContent = heroContent.primary.value_prop_title[0].text;
  }
  heroContent.items.forEach((value: any, i: number) => {
    const p = createElement('p', 'large--title');
    p.textContent = value.value_prop[0].text;
    if (valuePropContainers) {
      valuePropContainers[i].appendChild(p);
    }
  });

  pricingContent.items.forEach((content: any, i: number) => {
    const h2 = createElement('h2', 'title--3');
    const h3 = createElement('h3', 'large--title');
    const p = createElement('p', 'subtitle');
    h2.textContent = content.subtitle[0].text;
    h3.innerHTML = content.title[0].text;
    p.innerHTML = content.description[0].text;
    if (pricingContainers) {
      pricingContainers[i].appendChild(h2);
      pricingContainers[i].appendChild(h3);
      pricingContainers[i].appendChild(p);
    }
  });
}

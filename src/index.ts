import './scss/app.scss';
import Axios from 'axios';
import hero from './hero';
// import accordion from './accordion';
// import slider from './slider';
import scrollTrigger from './scroll-trigger';
// accordion.initAccordion();
// slider.initSlider();
hero.randomizeHero();
const heroContentParent = document.querySelector('.js-hero-content');
const pricingContentParent = document.querySelector('.js-hero-pricing');
proccessData();

async function masterRef(): Promise<string> {
  return await Axios.get(`${process.env.API_URL}`).then((resp) => resp.data.refs[0].ref);
}

async function getData(ref: string) {
  return await Axios.get(`${process.env.API_URL}/documents/search`, {
    params: {ref: ref, access_token: process.env.ACCESS_TOKEN},
  }).then((resp) => resp.data.results);
}

async function proccessData() {
  heroContentParent?.classList.add('is-loading');
  pricingContentParent?.classList.add('is-loading');
  try {
    // throw new Error('uh oh');
    const ref = await masterRef();
    const data = await getData(ref);
    const appleFitnessData = data.filter((data: any) => data.type === 'apple_fitness_plus');
    accessData(appleFitnessData[0].data);
    heroContentParent?.classList.remove('is-loading');
    pricingContentParent?.classList.remove('is-loading');
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
  const heroContent = data.body.filter((content: any) => content.slice_type === 'hero_content')[0];
  const pricingContent = data.body.filter((content: any) => content.slice_type === 'pricing')[0];

  const valuePropContainers = heroContentParent?.querySelectorAll('.js-value-prop');
  const valuePropH2 = heroContentParent?.querySelector('.js-value-prop-title');
  const pricingContainers = pricingContentParent?.querySelectorAll('.js-hero-pricing-container');

  if (valuePropH2) {
    valuePropH2.innerHTML = heroContent.primary.value_prop_title[0].text;
  }
  heroContent.items.forEach((value: any, i: number) => {
    const p = createElement('p', 'large--title');
    p.innerHTML = value.value_prop[0].text;
    if (valuePropContainers) {
      valuePropContainers[i].appendChild(p);
    }
  });

  pricingContent.items.forEach((content: any, i: number) => {
    const h2 = createElement('h2', 'title--3');
    const h3 = createElement('h3', 'large--title');
    const p = createElement('p', 'subtitle');
    h2.innerHTML = content.subtitle[0].text;
    h3.innerHTML = content.title[0].text;
    p.innerHTML = content.description[0].text;
    if (pricingContainers) {
      pricingContainers[i].appendChild(h2);
      pricingContainers[i].appendChild(h3);
      pricingContainers[i].appendChild(p);
    }
  });
}

import './scss/app.scss';
import Axios from 'axios';
import hero from './hero';
// import accordion from './accordion';
// import slider from './slider';
import scrollTrigger from './scroll-trigger';
// accordion.initAccordion();
// slider.initSlider();
document.addEventListener('DOMContentLoaded', (ev) => {
  hero.randomizeHero();
  scrollTrigger.introSection();
});

const valuePropHeader = document.querySelector('.js-value-prop-title');
const heroContent = document.querySelector('.js-hero-content');
const pricingContent = document.querySelector('.js-hero-pricing');
heroContent?.classList.add('is-loading');
async function masterRef(): Promise<string> {
  return await Axios.get(`${process.env.API_URL}`).then((resp) => resp.data.refs[0].ref);
}

async function getData(ref: string) {
  return await Axios.get(`${process.env.API_URL}/documents/search`, {
    params: {ref: ref, access_token: process.env.ACCESS_TOKEN},
  }).then((resp) => resp.data.results);
}

async function proccessData() {
  try {
    // throw new Error('uh oh');
    const ref = await masterRef();
    const data = await getData(ref);
    const appleFitnessData = data.filter((data: any) => data.type === 'apple_fitness_plus');
    accessData(appleFitnessData[0].data);
    heroContent?.classList.remove('is-loading');
  } catch (error) {
    console.log(error.message);
  }
}

proccessData();

function createElement(element: string, classes: string | null = null) {
  const el = document.createElement(element);
  if (classes) {
    el.className = classes;
  }
  return el;
}

function accessData(data: any) {
  console.log(data);
  const valuePropTitle = data.body[0].primary.value_prop_title[0].text;
  const valueProps = data.body[0].items;
  const h2 = document.createElement('h2');
  h2.className = 'js-value-prop-title extra-huge--title';
  const valuePropHeading = document.createTextNode(valuePropTitle);
  h2.appendChild(valuePropHeading);
  heroContent?.appendChild(h2);
  valueProps.forEach((value: any) => {
    const div = createElement('div', 'js-value-prop hero-content__value-prop');
    const p = createElement('div', 'large--title');
    p.innerHTML = value.value_prop[0].text;
    div.appendChild(p);
    heroContent?.appendChild(div);
  });

  const pricings = data.body.filter((content: any) => content.slice_type === 'pricing');
  console.log(pricings);
  pricings[0].items.forEach((content: any) => {
    const div = createElement('div');
    const h2 = createElement('h2', 'title--3');
    const h3 = createElement('h3', 'large--title');
    const p = createElement('p', 'subtitle');
    h2.innerHTML = content.subtitle[0].text;
    h3.innerHTML = content.title[0].text;
    p.innerHTML = content.description[0].text;
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);
    pricingContent?.appendChild(div);
  });

  scrollTrigger.heroSection();
  // const title = document.createElement('h1');
  // const img = document.createElement('img');
  // // Lodash, currently included via a script, is required for this line to work
  // title.innerHTML = data[0].data.title[0].text;
  // document.body.appendChild(title);

  // const copy = document.createElement('p');
  // copy.innerHTML = data[0].data.description[0].text;
  // document.body.appendChild(copy);

  // img.setAttribute('src', data[0].data.hero_banner.url);
  // document.body.appendChild(img);
}

import './scss/app.scss';
import Axios from 'axios';
// import accordion from './accordion';
// import slider from './slider';
import scrollTrigger from './scroll-trigger';
// accordion.initAccordion();
// slider.initSlider();
scrollTrigger.heroSection();
scrollTrigger.introSection();
const heroContainer = document.querySelector('.js-hero');
const heroImages: string[] = ['hero-01', 'hero-02', 'hero-03', 'hero-04'];
randomizeHeroImage();
function randomize(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomizeHeroImage() {
  const index = randomize(0, 3);
  heroContainer?.classList.add(`${heroImages[index]}`);
}

const valuePropHeader = document.querySelector('.js-value-prop-title');
async function getData() {
  valuePropHeader?.classList.add('is-loading');
  const masterRef = await Axios.get(`${process.env.API_URL}`).then((resp) => {
    return resp.data.refs[0].ref;
  });
  console.log('loading');
  const dataRef = Axios.get(`${process.env.API_URL}/documents/search`, {
    params: {ref: masterRef, access_token: process.env.ACCESS_TOKEN},
  }).then((resp) => {
    console.log('done-loading');
    valuePropHeader?.classList.remove('is-loading');
    return resp.data.results;
  });
  return dataRef;
}
async function returnData() {
  const data = await getData();
  const appleFitnessData = data.filter((data: any) => data.type === 'apple_fitness_plus');
  accessData(appleFitnessData[0].data);
}
returnData();

function accessData(data: any) {
  const valuePropTitle = data.body[0].primary.value_prop_title[0].text;
  const valuePropHeading = document.createTextNode(valuePropTitle);
  valuePropHeader?.appendChild(valuePropHeading);
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

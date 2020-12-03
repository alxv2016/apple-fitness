import './scss/app.scss';
import Axios from 'axios';
import hero from './hero';
import intro from './intro';
import util from './utility';
// import accordion from './accordion';
// import slider from './slider';
import scrollTrigger from './scroll-trigger';
// accordion.initAccordion();
// slider.initSlider();
scrollTrigger.stickyHeader();
hero.randomizeHero();
proccessData();

async function masterRef(): Promise<string> {
  return await Axios.get(`${process.env.API_URL}`).then((resp) => resp.data.refs[0].ref);
}

async function getData(ref: string) {
  hero.heroImage?.setAttribute('data-state', 'loading');
  hero.heroContent?.setAttribute('data-state', 'loading');
  hero.heroPricing?.setAttribute('data-state', 'loading');
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
    hero.heroContent?.removeAttribute('data-state');
    hero.heroPricing?.removeAttribute('data-state');
    hero.heroImage?.removeAttribute('data-state');
    scrollTrigger.heroSection();
    scrollTrigger.introSection();
  } catch (error) {
    console.log(error.message);
  }
}

function accessData(data: any) {
  console.log('data', data);
  const heroData = data.filter((content: any) => content.slice_type === 'hero_section')[0];
  const valuePropData = data.filter((content: any) => content.slice_type === 'value_prop')[0];
  const pricingData = data.filter((content: any) => content.slice_type === 'pricing')[0];
  const introData = data.filter((content: any) => content.slice_type === 'service_intro')[0];
  console.log(introData);
  hero.renderHeroImage(heroData);
  hero.renderValueProp(valuePropData);
  hero.renderPricing(pricingData);
  intro.processData(introData);
}

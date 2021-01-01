import './scss/app.scss';
import Axios from 'axios';
import hero from './hero';
import intro from './intro';
import metrics from './metrics';
import header from './header';
import workouts from './workouts';
import trainers from './trainers';
import appleMusic from './music';
import accordion from './accordion';
import compatibility from './compatibility';
import serviceInfo from './service-info';
import valueProp from './value-prop';
import pricing from './pricing';
import util from './utility';

const banner = util.selectElement('[data-target="notification-banner"]');
const bannerBtn = util.selectElement('[data-target="notification-banner-button"]');
if (banner && bannerBtn) {
  if (util.checkConfirmation()) {
    banner.setAttribute('style', 'transform: translateY(100%); visibility: hidden;');
  } else {
    banner.removeAttribute('style');
    bannerBtn.addEventListener('click', (ev) => {
      banner.setAttribute('style', 'transform: translateY(100%); visibility: hidden;');
      localStorage.setItem('confirmed', 'true');
      return util.handlePauseEvent(ev);
    });
  }
}

header.init();
proccessData();

async function masterRef(): Promise<string> {
  return await Axios.get(`${process.env.API_URL}`).then((resp) => resp.data.refs[0].ref);
}

async function getData(ref: string) {
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
    // adde loading skeleton
    // scrollTrigger.initScrollTrigger();
  } catch (error) {
    console.log(error.message);
  }
}

function accessData(data: any) {
  console.log(data);
  data.forEach((dataSlice: any) => {
    switch (true) {
      case dataSlice.slice_type === 'hero_section':
        hero.processData(dataSlice);
        break;
      case dataSlice.slice_type === 'value_prop':
        valueProp.processData(dataSlice);
        break;
      case dataSlice.slice_type === 'pricing':
        pricing.processData(dataSlice);
        break;
    }
  });
  // const heroData = data.filter((content: any) => content.slice_type === 'hero_section')[0];
  // const valuePropData = data.filter((content: any) => content.slice_type === 'value_prop')[0];
  // const pricingData = data.filter((content: any) => content.slice_type === 'pricing')[0];
  const introData = data.filter((content: any) => content.slice_type === 'service_intro')[0];
  const metricsData = data.filter((content: any) => content.slice_type === 'metrics')[0];
  const workoutsData = data.filter((content: any) => content.slice_type === 'workouts')[0];
  const trainersData = data.filter((content: any) => content.slice_type === 'trainers')[0];
  const songsData = data.filter((content: any) => content.slice_type === 'apple_music_songs')[0];
  const albumData = data.filter((content: any) => content.slice_type === 'apple_music_albums')[0];
  const compatibilityData = data.filter((content: any) => content.slice_type === 'compatibility')[0];
  const serviceData = data.filter((content: any) => content.slice_type === 'more_info')[0];
  intro.processData(introData);
  metrics.processData(metricsData);
  workouts.processData(workoutsData);
  trainers.processData(trainersData);
  appleMusic.processData(trainersData, songsData, albumData);
  compatibility.processData(compatibilityData);
  serviceInfo.processData(serviceData);
  accordion.initAccordion();
}

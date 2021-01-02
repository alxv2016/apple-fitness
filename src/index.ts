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
accordion.initAccordion();
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
  const mappedData = data.reduce((acc: any, cur: any) => {
    const obj = Object.assign(acc, {[cur.slice_type]: cur});
    return obj;
  }, {});
  hero.processData(mappedData.hero_section);
  valueProp.processData(mappedData.value_prop);
  pricing.processData(mappedData.pricing);
  intro.processData(mappedData.service_intro);
  metrics.processData(mappedData.metrics);
  workouts.processData(mappedData.workouts);
  trainers.processData(mappedData.trainers);
  appleMusic.processData(mappedData.trainers, mappedData.apple_music_songs, mappedData.apple_music_albums);
  compatibility.processData(mappedData.compatibility);
  serviceInfo.processData(mappedData.more_info);
}

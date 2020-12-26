import './scss/app.scss';
import Axios from 'axios';
import hero from './hero';
import intro from './intro';
import metrics from './metrics';
import header from './header';
import workouts from './workouts';
import trainers from './trainers';
// import accordion from './accordion';
// accordion.initAccordion();
header.init();
hero.randomizeHero();
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
  const heroData = data.filter((content: any) => content.slice_type === 'hero_section')[0];
  const valuePropData = data.filter((content: any) => content.slice_type === 'value_prop')[0];
  const pricingData = data.filter((content: any) => content.slice_type === 'pricing')[0];
  const introData = data.filter((content: any) => content.slice_type === 'service_intro')[0];
  const metricsData = data.filter((content: any) => content.slice_type === 'metrics')[0];
  const workoutsData = data.filter((content: any) => content.slice_type === 'workouts')[0];
  const trainersData = data.filter((content: any) => content.slice_type === 'trainers')[0];
  hero.processData(heroData, valuePropData, pricingData);
  intro.processData(introData);
  metrics.processData(metricsData);
  workouts.processData(workoutsData);
  trainers.processData(trainersData);
}

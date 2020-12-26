import Splide, {SplideOptions} from '@splidejs/splide';

const sliderOptions: SplideOptions = {
  type: 'loop',
  //autoWidth: true,
  perMove: 1,
  gap: '8px',
  perPage: 5,
  pagination: false,
  autoplay: true,
  interval: 4000,
  pauseOnHover: false,
  pauseOnFocus: false,
};

const splide = {
  initSlider: () => {
    const sliding = new Splide('#slider', sliderOptions);
    sliding.on('mounted', () => {
      console.log('Iam mounted!!');
    });
    sliding.mount();
    sliding.root.classList.add('feature-slide');
    sliding.on('moved', () => {
      console.log('I moved!!');
    });
  },
};

export default splide;

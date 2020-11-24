import Splide, {SplideOptions} from '@splidejs/splide';

const sliderOptions: SplideOptions = {
  width: '100%',
  destroy: true,
  waitForTransition: true,
  speed: 225,
  perMove: 1,
  gap: '1em',
  padding: '1rem',
  arrows: true,
  pagination: false,
  keyboard: 'focused',
  updateOnMove: true,
  // classes: {
  //   // Add classes for arrows.
  //   arrows: 'splide__arrows your-class-arrows',
  //   arrow : 'splide__arrow your-class-arrow',
  //   prev  : 'splide__arrow--prev your-class-prev',
  //   next  : 'splide__arrow--next your-class-next',

  //   // Add classes for pagination.
  //   pagination: 'splide__pagination your-class-pagination', // container
  //   page      : 'splide__pagination__page your-class-page', // each button
  // },
  breakpoints: {
    767: {
      fixedWidth: '85%',
    },
  },
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

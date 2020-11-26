import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollTrigger = {
  stickyHeader: () => {
    // Header on scroll animation
    ScrollTrigger.create({
      onUpdate: (self: any) => {
        const scrollDirection = self.direction;
        const scrollPos = self.scroller.pageYOffset;
        let scrollingDown = false;
        scrollDirection === 1 ? (scrollingDown = true) : (scrollingDown = false);
        const headerNav = document.querySelector('.js-header');
        const headerHeight = headerNav?.getBoundingClientRect().height;

        if (headerHeight && scrollPos >= headerHeight) {
          scrollingDown
            ? headerNav?.classList.add('js-header--hidden')
            : headerNav?.classList.remove('js-header--hidden');
        }
      },
    });
  },
  heroSection: () => {
    gsap.to('.js-logo', {
      yPercent: -40,
      scrollTrigger: {
        markers: false,
        trigger: 'js-hero',
        start: 'top top',
        end: 'center top',
        scrub: 0.45,
      },
    });
  },
};

export default scrollTrigger;

import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const header = {
  init() {
    ScrollTrigger.create({
      onUpdate: (self: any) => {
        const headerNav = document.querySelector<HTMLElement>('[data-target="header"]');
        const scrollDirection = self.direction;
        const scrollPos = self.scroller.pageYOffset;
        let scrollingDown = false;
        scrollDirection === 1 ? (scrollingDown = true) : (scrollingDown = false);
        if (headerNav) {
          const headerHeight = headerNav.getBoundingClientRect().height;
          if (scrollPos >= headerHeight) {
            scrollingDown ? headerNav.setAttribute('data-state', 'hidden') : headerNav.removeAttribute('data-state');
          }
        }
      },
    });
  },
};

export default header;

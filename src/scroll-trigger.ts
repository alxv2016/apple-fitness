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

    const valueProp = gsap.timeline({
      defaults: {
        ease: 'powerIn',
        opacity: 0,
        stagger: 0.25,
      },
      scrollTrigger: {
        markers: false,
        trigger: '.js-hero-content',
        start: '-=620 center',
        end: 'bottom center',
        scrub: 0.45,
      },
    });

    valueProp.from('.js-value-prop', {
      yPercent: 200,
    });
  },
  introSection: () => {
    const video = document.querySelector<HTMLMediaElement>('.js-intro-video');
    video?.addEventListener('ended', hideVideo);
    function hideVideo(ev: any) {
      gsap.to('.js-intro-video', {
        ease: 'ease',
        opacity: 0,
      });
      ev.target.removeEventListener('ended', hideVideo);
    }
    const playVideo = gsap.timeline({
      scrollTrigger: {
        markers: true,
        trigger: '.js-intro',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onToggle: (self) => {
          gsap.to('.js-intro-video', {
            ease: 'ease',
            opacity: 1,
          });
          self.isActive ? video?.play() : video?.pause();
        },
      },
    });
    playVideo.to('.js-intro-start', {
      opacity: 0,
      ease: 'ease',
    });
  },
};

export default scrollTrigger;

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
        const headerNav = document.querySelector('[data-target="header"]');
        const headerHeight = headerNav?.getBoundingClientRect().height;

        if (headerHeight && scrollPos >= headerHeight) {
          scrollingDown ? headerNav?.setAttribute('data-state', 'hidden') : headerNav?.removeAttribute('data-state');
        }
      },
    });
  },
  heroSection: () => {
    gsap.to('[data-target="logo"]', {
      yPercent: -40,
      scrollTrigger: {
        markers: false,
        trigger: '[data-target="hero"]',
        start: 'top top',
        end: 'center top',
        scrub: 0.45,
      },
    });

    const valueProp = gsap.timeline({
      defaults: {
        ease: 'power3',
        opacity: 0,
        stagger: 0.25,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-target="hero-content"]',
        start: '-=620 center',
        end: 'bottom center',
        scrub: 0.45,
      },
    });

    valueProp.from('[data-target="value-prop"]', {
      yPercent: 200,
    });
  },
  introSection: () => {
    const video = document.querySelector<HTMLMediaElement>('[data-target="intro-video"]');
    const videoEl = '[data-target="intro-video"]';
    const triggerPoint = '[data-trigger="intro"]';
    const fitnessStart = '[data-target="intro-start"]';
    const appleWatch = '[data-target="apple-watch"]';
    const iPad = '[data-target="ipad"]';
    const appleTv = '[data-target="apple-tv"]';
    const iPhone = '[data-target="iphone"]';

    function hideVideo(ev: any) {
      ev.target.removeEventListener('ended', hideVideo);
    }
    video?.addEventListener('ended', hideVideo);
    const playVideo = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: triggerPoint,
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onToggle: (self) => {
          gsap.to(videoEl, {
            ease: 'ease',
            opacity: 1,
          });
          if (self.isActive && video) {
            video.muted = true;
            video.play();
          } else {
            if (video) {
              video.pause();
            }
          }
        },
      },
    });
    playVideo.to(fitnessStart, {
      opacity: 0,
      ease: 'ease',
    });

    const introItems = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: triggerPoint,
        start: 'top center',
        end: '+=400 center',
        scrub: 0.75,
      },
    });

    introItems
      .to(appleWatch, {
        scale: 0.35,
      })
      .to(
        appleWatch,
        {
          yPercent: -20,
        },
        0
      )
      .from(
        iPad,
        {
          xPercent: -20,
          opacity: 0,
        },
        0
      )
      .from(
        appleTv,
        {
          xPercent: 20,
          opacity: 0,
        },
        0
      )
      .from(
        iPhone,
        {
          yPercent: 40,
          opacity: 0,
        },
        0
      );
  },
};

export default scrollTrigger;

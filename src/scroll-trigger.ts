import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollTrigger = {
  initScrollTrigger: function () {
    this.heroSection();
    this.introSection();
    this.metricsSection();
  },
  hideVideo: function (ev: any) {
    ev.target.setAttribute('style', 'display: none');
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  stickyHeader: function () {
    ScrollTrigger.create({
      onUpdate: (self: any) => {
        const scrollDirection = self.direction;
        const scrollPos = self.scroller.pageYOffset;
        let scrollingDown = false;
        scrollDirection === 1 ? (scrollingDown = true) : (scrollingDown = false);
        const headerNav = document.querySelector('[data-target="header"]');
        if (headerNav) {
          const headerHeight = headerNav.getBoundingClientRect().height;
          if (scrollPos >= headerHeight) {
            scrollingDown ? headerNav.setAttribute('data-state', 'hidden') : headerNav.removeAttribute('data-state');
          }
        }
      },
    });
  },
  heroSection: function () {
    gsap.to('[data-target="logo"]', {
      yPercent: -40,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="hero"]',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.45,
      },
    });

    const heroContent = gsap.timeline({
      defaults: {
        ease: 'ease',
        opacity: 0,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="hero-content"]',
        start: '-=620 center',
        end: 'bottom center',
        scrub: 0.45,
      },
    });

    heroContent
      .from('[data-target="value-prop"]', {
        yPercent: 200,
        stagger: 0.25,
      })
      .from('[data-target="pricing-grid"]', {
        yPercent: 40,
      });
  },
  introSection: function () {
    const watchScreen = document.querySelector<HTMLMediaElement>('[data-target="intro-watch-video"]');
    const syncingScreen = document.querySelector<HTMLMediaElement>('[data-target="device-syncing-video"]');

    if (watchScreen) {
      watchScreen.muted = true;
      ScrollTrigger.create({
        markers: false,
        trigger: '[data-trigger="device-grid"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onToggle: (self) => {
          if (self.isActive) {
            watchScreen.setAttribute('style', 'display: block');
            watchScreen.play();
            watchScreen.addEventListener('ended', this.hideVideo);
          } else {
            watchScreen.pause();
          }
        },
      });
    }

    if (syncingScreen) {
      syncingScreen.muted = true;
      ScrollTrigger.create({
        markers: false,
        trigger: '[data-trigger="device-sync-intro"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onToggle: (self) => {
          if (self.isActive) {
            syncingScreen.setAttribute('style', 'display: block');
            syncingScreen.play();
            syncingScreen.addEventListener('ended', this.hideVideo);
          } else {
            syncingScreen.pause();
          }
        },
      });

      gsap.from('[data-target="device-sync-intro-heading"]', {
        yPercent: -60,
        opacity: 0,
        scrollTrigger: {
          markers: false,
          trigger: '[data-trigger="device-sync-intro"]',
          start: '+=200 center',
          end: 'center center',
          scrub: 0.45,
        },
      });
    }
    const deviceGrid = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="device-grid"]',
        start: 'top center',
        end: '+=400 center',
        scrub: 0.75,
      },
    });
    deviceGrid
      .to('[data-target="intro-watch"]', {
        scale: 0.35,
        yPercent: -20,
      })
      .from(
        '[data-target="intro-ipad"]',
        {
          xPercent: -20,
          opacity: 0,
        },
        0
      )
      .from(
        '[data-target="intro-tv"]',
        {
          xPercent: 20,
          opacity: 0,
        },
        0
      )
      .from(
        '[data-target="intro-iphone"]',
        {
          yPercent: 40,
          opacity: 0,
        },
        0
      );
  },
  metricsSection: function () {
    const fitnessMetric = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-hero"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.75,
      },
    });

    fitnessMetric
      .to('[data-target="metrics-time-metric"]', {
        yPercent: -150,
      })
      .to(
        '[data-target="metrics-bpm-metric"]',
        {
          yPercent: -100,
        },
        0
      )
      .to(
        '[data-target="metrics-calories-metric"]',
        {
          yPercent: -50,
        },
        0
      );
  },
};

export default scrollTrigger;

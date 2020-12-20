import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollTrigger = {
  initScrollTrigger: function () {
    this.heroSection();
    this.introSection();
    this.metricsSection();
    this.workoutsSection();
  },
  hideVideo: function (ev: any) {
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

    ScrollTrigger.create({
      markers: false,
      trigger: '[data-trigger="hero"]',
      start: '+=260 top',
      end: 'bottom top',
      scrub: 0.45,
      onUpdate: (self: any) => {
        const progress = Math.floor(self.progress * 100);
        const gradient = document.querySelector<HTMLElement>('[data-target="hero"]');
        if (gradient) {
          let endProgress = progress * 6;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          gradient.style.setProperty('--progress-start', `${progress}%`);
          gradient.style.setProperty('--progress-end', `${endProgress}%`);
        }
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

    ScrollTrigger.create({
      markers: false,
      trigger: '[data-trigger="pricing-grid"]',
      start: '-=350 center',
      end: 'bottom center',
      scrub: 0.45,
      onUpdate: (self: any) => {
        const progress = Math.floor(self.progress * 100);
        const gradient = document.querySelector<HTMLElement>('[data-target="pricing-grid"]');
        if (gradient) {
          let endProgress = progress * 6;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          gradient.style.setProperty('--progress-start', `${progress}%`);
          gradient.style.setProperty('--progress-end', `${endProgress}%`);
        }
      },
    });
  },
  introSection: function () {
    const watchScreen = document.querySelector<HTMLMediaElement>('[data-target="intro-watch-video"]');
    const syncingScreen = document.querySelector<HTMLMediaElement>('[data-target="device-syncing-video"]');

    if (watchScreen) {
      ScrollTrigger.create({
        markers: false,
        trigger: '[data-trigger="device-grid"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const watchReveal = document.querySelector<HTMLElement>('[data-target="intro-watch"]');
          const ipadReveal = document.querySelector<HTMLElement>('[data-target="intro-ipad"]');
          const tvReveal = document.querySelector<HTMLElement>('[data-target="intro-tv"]');
          const iphoneReveal = document.querySelector<HTMLElement>('[data-target="intro-iphone"]');
          if (iphoneReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            iphoneReveal.style.setProperty('--progress-start', `${progress}%`);
            iphoneReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (tvReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            tvReveal.style.setProperty('--progress-start', `${progress}%`);
            tvReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (ipadReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            ipadReveal.style.setProperty('--progress-start', `${progress}%`);
            ipadReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (watchReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            watchReveal.style.setProperty('--progress-start', `${progress}%`);
            watchReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive) {
            watchScreen.muted = true;
            watchScreen.play();
            watchScreen.addEventListener('ended', this.hideVideo);
          } else {
            watchScreen.pause();
          }
        },
      });
    }

    const appIntro = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="app-intro"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.45,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const titleReveal = document.querySelector<HTMLElement>('[data-target="app-intro-heading"]');
          if (titleReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            titleReveal.style.setProperty('--progress-start', `${progress}%`);
            titleReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    appIntro
      .from('[data-target="app-intro-heading"]', {
        y: 48,
      })
      .from(
        '[data-target="apple-fitness"]',
        {
          y: 88,
          opacity: 0,
        },
        0.125
      );

    if (syncingScreen) {
      ScrollTrigger.create({
        markers: false,
        trigger: '[data-trigger="device-sync-intro"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const devicesReveal = document.querySelector<HTMLElement>('[data-target="device-syncing"]');
          if (devicesReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            devicesReveal.style.setProperty('--progress-start', `${progress}%`);
            devicesReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive) {
            syncingScreen.muted = true;
            syncingScreen.play();
            syncingScreen.addEventListener('ended', this.hideVideo);
          } else {
            syncingScreen.pause();
          }
        },
      });

      gsap.from('[data-target="device-syncing"]', {
        scale: 0.94,
        scrollTrigger: {
          markers: false,
          trigger: '[data-trigger="device-sync-intro"]',
          start: 'top center',
          end: 'bottom center',
          scrub: 0.45,
        },
      });

      gsap.to('[data-target="device-syncing-reveal"]', {
        opacity: 0,
        scrollTrigger: {
          markers: false,
          trigger: '[data-trigger="device-sync-intro"]',
          start: 'top center',
          end: 'bottom center',
          scrub: 0.45,
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
      .fromTo(
        '[data-target="intro-watch"]',
        {
          scale: 1.75,
        },
        {
          scale: 0.7,
        }
      )
      .to(
        '[data-target="intro-watch-reveal"]',
        {
          opacity: 0,
        },
        0.75
      )
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
    const watchScreen = document.querySelector<HTMLMediaElement>('[data-target="metrics-watch-video"]');
    const iphoneScreen = document.querySelector<HTMLMediaElement>('[data-target="metrics-iphone-video"]');
    const tvScreen = document.querySelector<HTMLMediaElement>('[data-target="metrics-tv-video"]');

    if (watchScreen && iphoneScreen) {
      ScrollTrigger.create({
        markers: false,
        trigger: '[data-trigger="metrics-heart-rate"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const watchReveal = document.querySelector<HTMLElement>('[data-target="metrics-watch"]');
          const iphoneReveal = document.querySelector<HTMLElement>('[data-target="metrics-iphone"]');
          if (watchReveal && iphoneReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            watchReveal.style.setProperty('--progress-start', `${progress}%`);
            watchReveal.style.setProperty('--progress-end', `${endProgress}%`);
            iphoneReveal.style.setProperty('--progress-start', `${progress}%`);
            iphoneReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive) {
            watchScreen.muted = true;
            iphoneScreen.muted = true;
            watchScreen.play();
            iphoneScreen.play();
            watchScreen.addEventListener('ended', this.hideVideo);
            iphoneScreen.addEventListener('ended', this.hideVideo);
          } else {
            watchScreen.pause();
            iphoneScreen.pause();
          }
        },
      });

      const devicesReveal = gsap.timeline({
        scrollTrigger: {
          markers: false,
          trigger: '[data-trigger="metrics-heart-rate"]',
          start: 'top center',
          end: 'center center',
          scrub: 0.45,
        },
      });

      devicesReveal
        .to('[data-target="metrics-watch-reveal"]', {
          opacity: 0,
        })
        .to(
          '[data-target="metrics-iphone-reveal"]',
          {
            opacity: 0,
          },
          0
        )
        .from(
          '[data-target="metrics-heart-rate-intro"]',
          {
            y: 48,
            opacity: 0,
          },
          0.75
        );
    }

    const ipadReveal = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-milestone"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.45,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const ipadReveal = document.querySelector<HTMLElement>('[data-target="metrics-ipad"]');
          if (ipadReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            ipadReveal.style.setProperty('--progress-start', `${progress}%`);
            ipadReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    ipadReveal
      .from('[data-target="metrics-ipad"]', {
        scale: 0.94,
      })
      .to('[data-target="metrics-ipad-reveal"]', {
        opacity: 0,
      })
      .from(
        '[data-target="metrics-milestone-intro"]',
        {
          opacity: 0,
          y: -48,
        },
        0.45
      );

    const tvReveal = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-competition"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        scrub: 0.45,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const tvReveal = document.querySelector<HTMLElement>('[data-target="metrics-tv"]');
          if (tvReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            tvReveal.style.setProperty('--progress-start', `${progress}%`);
            tvReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (tvScreen) {
            if (self.isActive) {
              tvScreen.muted = true;
              tvScreen.play();
              tvScreen.addEventListener('ended', this.hideVideo);
            } else {
              tvScreen.pause();
            }
          }
        },
      },
    });

    tvReveal
      .from('[data-target="metrics-tv"]', {
        scale: 0.94,
      })
      .to('[data-target="metrics-tv-reveal"]', {
        opacity: 0,
      })
      .from(
        '[data-target="metrics-competition-intro"]',
        {
          opacity: 0,
          y: -48,
        },
        0.45
      );

    const fitnessMetric = gsap.timeline({
      defaults: {
        ease: 'none',
        stagger: 0.25,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-hero"]',
        start: '-=200 center',
        end: 'bottom center',
        scrub: 0.75,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const heroReveal = document.querySelector<HTMLElement>('[data-target="metrics-hero"]');
          if (heroReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            heroReveal.style.setProperty('--progress-start', `${progress}%`);
            heroReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
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

    gsap.from('[data-target="metrics-intro"]', {
      stagger: 0.25,
      ease: 'none',
      opacity: 0,
      y: 50,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-content"]',
        scrub: 0.45,
        start: '-=400 center',
        end: 'center center',
      },
    });

    const metricDevices = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-heart-rate"]',
        scrub: 0.45,
        start: 'top center',
        end: 'center center',
      },
    });

    metricDevices
      .to('[data-target="metrics-heart-rate-renders"]', {
        xPercent: -35,
      })
      .from(
        '[data-target="metrics-heart-rate-renders"]',
        {
          scale: 1.75,
        },
        0
      )
      .from(
        '[data-target="metrics-iphone"]',
        {
          xPercent: 25,
          opacity: 0,
        },
        0
      );
  },
  workoutsSection: function () {
    const workoutsHero = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-hero"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.75,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const heroReveal = document.querySelector<HTMLElement>('[data-target="workouts-hero"]');
          if (heroReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            heroReveal.style.setProperty('--progress-start', `${progress}%`);
            heroReveal.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    workoutsHero
      .to('[data-target="workouts-metric-music"]', {
        yPercent: -160,
      })
      .from(
        '[data-target="workouts-metric-clock"]',
        {
          yPercent: 20,
        },
        0
      )
      .to(
        '[data-target="workouts-metric-yoga"]',
        {
          yPercent: 180,
        },
        0
      );

    gsap.from('[data-target="workouts-intro"]', {
      stagger: 0.25,
      ease: 'none',
      opacity: 0,
      y: 50,
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-content"]',
        scrub: 0.45,
        start: '-=400 center',
        end: 'center center',
      },
    });
  },
};

export default scrollTrigger;

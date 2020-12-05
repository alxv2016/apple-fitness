import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollTrigger = {
  initScrollTrigger: function () {
    this.heroSection();
    this.introSection();
  },
  hideVideo: function (ev: any) {
    ev.target.setAttribute('style', 'display: none');
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  stickyHeader: function () {
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
  heroSection: function () {
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
  introSection: function () {
    const video = document.querySelector<HTMLMediaElement>('[data-target="intro-video"]');
    const lockupVideo = document.querySelector<HTMLMediaElement>('[data-target="device-lockup-video"]');
    const triggerPoint = '[data-trigger="intro"]';
    const triggerPoint2 = '[data-trigger="device-lockup"]';

    const appleWatch = '[data-target="apple-watch"]';
    const iPad = '[data-target="ipad"]';
    const appleTv = '[data-target="apple-tv"]';
    const iPhone = '[data-target="iphone"]';

    ScrollTrigger.create({
      markers: false,
      trigger: triggerPoint,
      start: '-=100 center',
      end: 'bottom center',
      toggleActions: 'play pause resume reverse',
      onToggle: (self) => {
        if (self.isActive && video) {
          video.setAttribute('style', 'display: block');
          video.muted = true;
          video.play();
          video.addEventListener('ended', this.hideVideo);
        } else {
          if (video) {
            video.pause();
          }
        }
      },
    });

    ScrollTrigger.create({
      markers: false,
      trigger: triggerPoint2,
      start: '-=100 center',
      end: 'bottom center',
      toggleActions: 'play pause resume reverse',
      onToggle: (self) => {
        if (self.isActive && lockupVideo) {
          lockupVideo.setAttribute('style', 'display: block');
          lockupVideo.muted = true;
          lockupVideo.play();
          lockupVideo.addEventListener('ended', this.hideVideo);
        } else {
          if (lockupVideo) {
            lockupVideo.pause();
          }
        }
      },
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

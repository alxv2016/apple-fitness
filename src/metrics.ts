import gsap from 'gsap';
import util from './utility';

const metrics = {
  previous: util.selectElement('[data-target="device-sync-up"]'),
  hero: util.selectElement('[data-target="metrics-hero"]'),
  heroMetrics: util.selectElement('[data-target="hero-metrics"]'),
  metricsContent: util.selectElement('[data-target="metrics-content"]'),
  metricsAppleWatch: util.selectElement('[data-target="metrics-apple-watch"]'),
  metricsIphone: util.selectElement('[data-target="metrics-iphone"]'),
  metricsSyncIntro: util.selectElement('[data-target="metrics-sync-intro"]'),
  metricsIpad: util.selectElement('[data-target="metrics-ipad"]'),
  metricsAppleTv: util.selectElement('[data-target="metrics-apple-tv"]'),
  milestoneIntro: util.selectElement('[data-target="metrics-milestone-intro"]'),
  competitionIntro: util.selectElement('[data-target="metrics-competition-intro"]'),
  processData(metricsData: any) {
    this.renderHero(metricsData.primary);
    this.renderMetricSync(metricsData.primary);
    this.renderValueContent(metricsData.primary);
    this.renderAnimations();
  },
  renderHero(metricsData: any) {
    if (this.hero) {
      const el1 = util.renderImage(this.hero.firstElementChild as HTMLElement)(metricsData.metrics_hero.shadow.url);
      const el2 = util.renderImage(this.hero.firstElementChild?.nextElementSibling as HTMLElement)(
        metricsData.metrics_hero.url,
        metricsData.metrics_hero.mask.url
      );
      const el3 = util.renderImage(this.hero.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement)(
        metricsData.metrics_hero.duo_tone.url,
        metricsData.metrics_hero.mask.url
      );
      this.hero.prepend(el1, el2, el3);
      if (this.heroMetrics) {
        Array.from(this.heroMetrics.children).forEach((metric) => {
          const data = metric.getAttribute('data-target');
          switch (true) {
            case data === 'metrics-time':
              const el1 = util.renderImage(metric.firstElementChild as HTMLElement)(metricsData.time_metric.url);
              const el2 = util.renderImage(metric.lastElementChild as HTMLElement)(metricsData.time_metric.icon.url);
              metric.append(el1, el2);
              break;
            case data === 'metrics-bpm':
              const el3 = util.renderImage(metric.firstElementChild as HTMLElement)(metricsData.bpm_metric.url);
              const el4 = util.renderImage(metric.lastElementChild as HTMLElement)(
                metricsData.bpm_metric.metric_icon.url
              );
              metric.append(el3, el4);
              break;
            case data === 'metrics-calories':
              const el5 = util.renderImage(metric.firstElementChild as HTMLElement)(metricsData.calories_metric.url);
              const el6 = util.renderImage(metric.lastElementChild as HTMLElement)(
                metricsData.calories_metric.metric_icon.url
              );
              metric.append(el5, el6);
              break;
          }
        });
      }
    }
    if (this.metricsContent) {
      Array.from(this.metricsContent.children).forEach((el) => {
        switch (true) {
          case el.localName === 'h2':
            el.textContent = metricsData.overline[0].text;
            break;
          case el.localName === 'h3':
            el.textContent = metricsData.title[0].text;
            break;
          case el.localName === 'p':
            el.textContent = metricsData.intro_copy[0].text;
            break;
        }
      });
    }
  },
  renderMetricSync(metricsData: any) {
    if (this.metricsAppleWatch) {
      const el = util.renderImage(this.metricsAppleWatch.firstElementChild as HTMLElement)(
        metricsData.metrics_watch.url,
        metricsData.metrics_watch.mask.url
      );
      this.metricsAppleWatch.prepend(el);
      if (this.metricsAppleWatch.lastElementChild) {
        const el = util.renderImage(this.metricsAppleWatch.lastElementChild.firstElementChild as HTMLElement)(
          metricsData.metrics_watch.static.url
        );
        this.metricsAppleWatch.lastElementChild.prepend(el);
        const videoEl = this.metricsAppleWatch.lastElementChild.lastElementChild as HTMLMediaElement;
        videoEl.src = require('./assets/metrics_watch.mp4');
      }
    }
    if (this.metricsIphone) {
      const el = util.renderImage(this.metricsIphone.firstElementChild as HTMLElement)(
        metricsData.metrics_iphone.url,
        metricsData.metrics_iphone.mask.url
      );
      this.metricsIphone.prepend(el);
      if (this.metricsIphone.lastElementChild) {
        const el = util.renderImage(this.metricsIphone.lastElementChild.firstElementChild as HTMLElement)(
          metricsData.metrics_iphone.static.url
        );
        this.metricsIphone.lastElementChild.prepend(el);
        const videoEl = this.metricsIphone.lastElementChild.lastElementChild as HTMLMediaElement;
        videoEl.src = require('./assets/metrics_iphone.mp4');
      }
    }
    if (this.metricsSyncIntro) {
      this.metricsSyncIntro.innerHTML = metricsData.sub_intro_copy[0].text;
    }
  },
  renderValueContent(metricsData: any) {
    if (this.metricsIpad) {
      const el = util.renderImage(this.metricsIpad.firstElementChild as HTMLElement)(
        metricsData.metrics_ipad.url,
        metricsData.metrics_ipad.mask.url
      );
      this.metricsIpad.prepend(el);
    }

    if (this.metricsAppleTv) {
      const el = util.renderImage(this.metricsAppleTv.firstElementChild as HTMLElement)(
        metricsData.metrics_tv.url,
        metricsData.metrics_tv.mask.url
      );
      this.metricsAppleTv.prepend(el);
      if (this.metricsAppleTv.lastElementChild) {
        const el = util.renderImage(this.metricsAppleTv.lastElementChild.firstElementChild as HTMLElement)(
          metricsData.metrics_tv.static.url
        );
        this.metricsAppleTv.lastElementChild.prepend(el);
        const videoEl = this.metricsAppleTv.lastElementChild.lastElementChild as HTMLMediaElement;
        videoEl.src = require('./assets/metrics_tv.mp4');
      }
    }

    if (this.milestoneIntro) {
      this.milestoneIntro.innerHTML = metricsData.milestone_intro[0].text;
    }

    if (this.competitionIntro) {
      this.competitionIntro.innerHTML = metricsData.competition_intro[0].text;
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const appleWatchVideo = util.selectElement('[data-target="metrics-watch-video"]');
    const iphoneVideo = util.selectElement('[data-target="metrics-iphone-video"]');
    const appleTvVideo = util.selectElement('[data-target="metrics-apple-tv-video"]');

    const hero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-hero"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const previousHide = util.calculateScroll(progress, 3, 20);
          const heroReveal = util.calculateScroll(progress, 4);
          if (this.previous) {
            this.previous.style.setProperty('--progress-start', `${previousHide.start}%`);
            this.previous.style.setProperty('--progress-end', `${previousHide.end}%`);
          }
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${heroReveal.start}%`);
            this.hero.style.setProperty('--progress-end', `${heroReveal.end}%`);
          }
        },
      },
    });

    hero
      .to('[data-target="metrics-hero-duo-tone"]', {
        opacity: 0,
        delay: 0.25,
      })
      .from('[data-target="metrics-intro"]', {
        stagger: 0.25,
        opacity: 0,
        y: 60,
      });

    gsap.fromTo(
      '[data-stagger="metric"]',
      {
        yPercent: 100,
        opacity: 0.25,
      },
      {
        ease: 'none',
        yPercent: -100,
        opacity: 1,
        stagger: 0.45,
        duration: 4,
        scrollTrigger: {
          markers: false,
          trigger: '[data-trigger="metrics-hero"]',
          scrub: 0.65,
          start: 'top center',
          end: 'bottom center',
        },
      }
    );

    const metricSync = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-devices"]',
        scrub: 0.75,
        start: '-=300 center',
        end: 'bottom center',
        onUpdate: ({progress}) => {
          const appleWatchReveal = util.calculateScroll(progress);
          const iphoneReveal = util.calculateScroll(progress, 3, 30);
          if (this.metricsAppleWatch && this.metricsIphone) {
            this.metricsAppleWatch.style.setProperty('--progress-start', `${appleWatchReveal.start}%`);
            this.metricsAppleWatch.style.setProperty('--progress-end', `${appleWatchReveal.end}%`);
            this.metricsIphone.style.setProperty('--progress-start', `${iphoneReveal.start}%`);
            this.metricsIphone.style.setProperty('--progress-end', `${iphoneReveal.end}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && appleWatchVideo) {
            let video = appleWatchVideo as HTMLMediaElement;
            video.muted = true;
            video.play();
            video.addEventListener('ended', this.hideVideo);
          }
          if (isActive && iphoneVideo) {
            let video = iphoneVideo as HTMLMediaElement;
            video.muted = true;
            video.play();
            video.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    metricSync
      .fromTo(
        '[data-target="metrics-apple-watch"]',
        {
          scale: 1.95,
          opacity: 0.125,
        },
        {
          opacity: 1,
        }
      )
      .to('[data-target="metrics-apple-watch"]', {
        scale: 1,
        delay: 0.25,
      })
      .to('[data-target="metrics-devices"]', {
        xPercent: -35,
      })
      .from(
        '[data-target="metrics-iphone"]',
        {
          x: 80,
          opacity: 0,
          delay: 0.25,
        },
        0.75
      )
      .from(
        '[data-target="metrics-sync-intro"]',
        {
          y: 60,
          opacity: 0,
        },
        0.75
      );

    const milestone = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-milestone"]',
        start: '-=100 center',
        end: 'center center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const ipadReveal = util.calculateScroll(progress);
          const milestoneReveal = util.calculateScroll(progress, 2, 4);
          if (this.metricsIpad) {
            this.metricsIpad.style.setProperty('--progress-start', `${ipadReveal.start}%`);
            this.metricsIpad.style.setProperty('--progress-end', `${ipadReveal.end}%`);
          }
          if (this.milestoneIntro) {
            this.milestoneIntro.style.setProperty('--progress-start', `${milestoneReveal.start}%`);
            this.milestoneIntro.style.setProperty('--progress-end', `${milestoneReveal.end}%`);
          }
        },
      },
    });

    milestone
      .fromTo(
        '[data-target="metrics-ipad"]',
        {
          scale: 0.94,
          opacity: 0.25,
        },
        {
          scale: 1,
          opacity: 1,
        }
      )
      .from(
        '[data-target="metrics-milestone-intro"]',
        {
          opacity: 0,
          y: -80,
        },
        0.45
      );

    const competition = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-competition"]',
        start: '-=100 center',
        end: 'center center',
        toggleActions: 'play pause resume reverse',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const appleTvReveal = util.calculateScroll(progress);
          const competitionReveal = util.calculateScroll(progress, 2, 4);
          if (this.metricsAppleTv) {
            this.metricsAppleTv.style.setProperty('--progress-start', `${appleTvReveal.start}%`);
            this.metricsAppleTv.style.setProperty('--progress-end', `${appleTvReveal.end}%`);
          }
          if (this.competitionIntro) {
            this.competitionIntro.style.setProperty('--progress-start', `${competitionReveal.start}%`);
            this.competitionIntro.style.setProperty('--progress-end', `${competitionReveal.end}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && appleTvVideo) {
            let video = appleTvVideo as HTMLMediaElement;
            video.muted = true;
            video.play();
            video.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    competition
      .fromTo(
        '[data-target="metrics-apple-tv"]',
        {
          scale: 0.94,
          opacity: 0.25,
        },
        {
          scale: 1,
          opacity: 1,
        }
      )
      .from(
        '[data-target="metrics-competition-intro"]',
        {
          opacity: 0,
          y: -60,
        },
        0.45
      );
  },
};

export default metrics;

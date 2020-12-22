import gsap from 'gsap';
import util from './utility';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = {
  hero: document.querySelector<HTMLElement>('[data-target="metrics-hero"]'),
  heroContent: document.querySelector<HTMLElement>('[data-target="metrics-content"]'),
  heroMetrics: document.querySelector<HTMLElement>('[data-target="fitness-metrics"]'),
  metricSync: document.querySelector<HTMLElement>('[data-target="metrics-heart-rate"]'),
  milestoneContent: document.querySelector<HTMLElement>('[data-target="metrics-milestone"]'),
  competitionContent: document.querySelector<HTMLElement>('[data-target="metrics-competition"]'),
  processData: function (metricsData: any) {
    this.renderHero(metricsData.primary);
    this.renderMetricSync(metricsData.primary);
    this.renderValueContent(metricsData.primary);
    this.renderAnimations();
  },
  renderHero: function (metricsData: any) {
    const renders = {
      shadow: util.createElement('figure', 'c-section-hero__shadow'),
      image: util.createElement('figure', 'c-section-hero__image'),
    };
    if (this.hero) {
      util.renderImage(renders.shadow, metricsData.metric_hero.shadow.url);
      util.renderImage(renders.image, metricsData.metrics_hero.url, metricsData.metrics_hero.mask.url);
      this.hero.prepend(renders.shadow, renders.image);
      if (this.heroMetrics) {
        Array.from(this.heroMetrics.children).forEach((metric) => {
          const data = metric.getAttribute('data-target');
          switch (true) {
            case data === 'metrics-time':
              const timeMetric = util.createMetric('c-metric--time', 'c-metric--time-icon', 'metrics-time-metric');
              util.renderImage(timeMetric.metric, metricsData.time_metric.url);
              util.renderImage(timeMetric.metric_icon, metricsData.time_metric.icon.url);
              metric.append(timeMetric.metric, timeMetric.metric_icon);
              break;
            case data === 'metrics-bpm':
              const bpmMetric = util.createMetric('c-metric--bpm', 'c-metric--bpm-icon', 'metrics-bpm-metric');
              util.renderImage(bpmMetric.metric, metricsData.bpm_metric.url);
              util.renderImage(bpmMetric.metric_icon, metricsData.bpm_metric.metric_icon.url);
              metric.append(bpmMetric.metric, bpmMetric.metric_icon);
              break;
            case data === 'metrics-calories':
              const caloriesMetric = util.createMetric(
                'c-metric--calories',
                'c-metric--calories-icon',
                'metrics-calories-metric'
              );
              util.renderImage(caloriesMetric.metric, metricsData.calories_metric.url);
              util.renderImage(caloriesMetric.metric_icon, metricsData.calories_metric.metric_icon.url);
              metric.append(caloriesMetric.metric, caloriesMetric.metric_icon);
              break;
          }
        });
      }
    }
    if (this.heroContent) {
      Array.from(this.heroContent.children).forEach((item) => {
        switch (true) {
          case item.localName === 'h2':
            item.textContent = metricsData.overline[0].text;
            break;
          case item.localName === 'h3':
            item.textContent = metricsData.title[0].text;
            break;
          case item.localName === 'p':
            item.textContent = metricsData.intro_copy[0].text;
            break;
        }
      });
    }
  },
  renderMetricSync: function (metricsData: any) {
    const renders = {
      appleWatch: {
        container: util.createElement('div', 'c-apple-watch', 'metrics-watch'),
        reveal: util.createElement('figure', 'c-apple-watch__mock-dimmed', 'metrics-watch-reveal'),
        image: util.createElement('figure', 'c-apple-watch__mock'),
        screen: {
          container: util.createElement('div', 'c-apple-watch-screen'),
          static: util.createElement('figure', 'c-apple-watch-screen__static'),
          video: util.createVideoElement('video', 'c-apple-watch-screen__video', 'metrics-watch-video'),
          videoSrc: './assets/metrics_watch.mp4',
        },
      },
      iphone: {
        container: util.createElement('div', 'c-iphone c-iphone--landscape', 'metrics-iphone'),
        reveal: util.createElement('figure', 'c-iphone__mock-dimed', 'metrics-iphone-reveal'),
        image: util.createElement('figure', 'c-iphone__mock'),
        screen: {
          container: util.createElement('div', 'c-iphone-screen'),
          static: util.createElement('figure', 'c-iphone-screen__static'),
          video: util.createVideoElement('video', 'c-iphone-screen__video', 'metrics-iphone-video'),
          videoSrc: './assets/metrics_iphone.mp4',
        },
      },
    };

    if (this.metricSync) {
      Array.from(this.metricSync.children).forEach((metric) => {
        const data = metric.getAttribute('data-target');
        switch (true) {
          case data === 'metrics-heart-rate-intro':
            metric.innerHTML = metricsData.sub_intro_copy[0].text;
            break;
          case data === 'metrics-heart-rate-renders':
            // watch
            util.renderImage(
              renders.appleWatch.reveal,
              metricsData.metrics_watch.reveal.url,
              metricsData.metrics_watch.mask.url
            );
            util.renderImage(
              renders.appleWatch.image,
              metricsData.metrics_watch.url,
              metricsData.metrics_watch.mask.url
            );
            util.renderVideo(
              renders.appleWatch.screen.static,
              renders.appleWatch.screen.video,
              metricsData.metrics_watch.static.url,
              renders.appleWatch.screen.videoSrc
            );

            renders.appleWatch.screen.container.append(
              renders.appleWatch.screen.static,
              renders.appleWatch.screen.video
            );
            renders.appleWatch.container.append(
              renders.appleWatch.image,
              renders.appleWatch.reveal,
              renders.appleWatch.screen.container
            );
            // iphone
            util.renderImage(
              renders.iphone.reveal,
              metricsData.metrics_iphone.reveal.url,
              metricsData.metrics_iphone.mask.url
            );
            util.renderImage(renders.iphone.image, metricsData.metrics_iphone.url, metricsData.metrics_iphone.mask.url);
            util.renderVideo(
              renders.iphone.screen.static,
              renders.iphone.screen.video,
              metricsData.metrics_iphone.static.url,
              renders.iphone.screen.videoSrc
            );

            renders.iphone.screen.container.append(renders.iphone.screen.static, renders.iphone.screen.video);
            renders.iphone.container.append(
              renders.iphone.image,
              renders.iphone.reveal,
              renders.iphone.screen.container
            );

            metric.append(renders.appleWatch.container, renders.iphone.container);
            break;
        }
      });
    }
  },
  renderValueContent: function (metricsData: any) {
    const renders = {
      ipad: {
        reveal: util.createElement('figure', 'c-ipad__mock-dimmed', 'metrics-ipad-reveal'),
        image: util.createElement('figure', 'c-ipad__mock'),
      },
      tv: {
        reveal: util.createElement('figure', 'c-apple-tv__mock-dimmed', 'metrics-tv-reveal'),
        image: util.createElement('figure', 'c-apple-tv__mock'),
        screen: {
          container: util.createElement('div', 'c-apple-tv-screen'),
          static: util.createElement('figure', 'c-apple-tv-screen__static'),
          video: util.createVideoElement('video', 'c-apple-tv-screen__video', 'metrics-tv-video'),
          videoSrc: './assets/metrics_tv.mp4',
        },
      },
    };
    util.renderImage(renders.ipad.reveal, metricsData.metrics_ipad.reveal.url, metricsData.metrics_ipad.mask.url);
    util.renderImage(renders.ipad.image, metricsData.metrics_ipad.url, metricsData.metrics_ipad.mask.url);

    if (this.milestoneContent && this.milestoneContent.firstElementChild && this.milestoneContent.lastElementChild) {
      this.milestoneContent.firstElementChild.append(renders.ipad.image, renders.ipad.reveal);
      this.milestoneContent.lastElementChild.innerHTML = metricsData.milestone_intro[0].text;
    }

    util.renderImage(renders.tv.reveal, metricsData.metrics_tv.reveal.url, metricsData.metrics_tv.mask.url);
    util.renderImage(renders.tv.image, metricsData.metrics_tv.url, metricsData.metrics_tv.mask.url);
    util.renderVideo(
      renders.tv.screen.static,
      renders.tv.screen.video,
      metricsData.metrics_tv.static.url,
      renders.tv.screen.videoSrc
    );
    renders.tv.screen.container.append(renders.tv.screen.static, renders.tv.screen.video);

    if (
      this.competitionContent &&
      this.competitionContent.firstElementChild &&
      this.competitionContent.lastElementChild
    ) {
      this.competitionContent.firstElementChild.append(
        renders.tv.image,
        renders.tv.reveal,
        renders.tv.screen.container
      );
      this.competitionContent.lastElementChild.innerHTML = metricsData.competition_intro[0].text;
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const appleWatch = document.querySelector<HTMLElement>('[data-target="metrics-watch"]');
    const iphone = document.querySelector<HTMLElement>('[data-target="metrics-iphone"]');
    const ipad = document.querySelector<HTMLElement>('[data-target="metrics-ipad"]');
    const appleTv = document.querySelector<HTMLElement>('[data-target="metrics-tv"]');
    const watchScreen = document.querySelector<HTMLMediaElement>('[data-target="metrics-watch-video"]');
    const iphoneScreen = document.querySelector<HTMLMediaElement>('[data-target="metrics-iphone-video"]');
    const tvScreen = document.querySelector<HTMLMediaElement>('[data-target="metrics-tv-video"]');

    const heroMetrics = gsap.timeline({
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

    heroMetrics
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

    const metricSync = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-heart-rate"]',
        toggleActions: 'play pause resume reverse',
        scrub: 0.45,
        start: 'top center',
        end: 'center center',
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          if (appleWatch && iphone) {
            let endProgress = progress * 2;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            appleWatch.style.setProperty('--progress-start', `${progress}%`);
            appleWatch.style.setProperty('--progress-end', `${endProgress}%`);
            iphone.style.setProperty('--progress-start', `${progress}%`);
            iphone.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive && watchScreen && iphoneScreen) {
            watchScreen.muted = true;
            iphoneScreen.muted = true;
            watchScreen.play();
            iphoneScreen.play();
            watchScreen.addEventListener('ended', this.hideVideo);
            iphoneScreen.addEventListener('ended', this.hideVideo);
          } else {
            if (watchScreen && iphoneScreen) {
              watchScreen.pause();
              iphoneScreen.pause();
            }
          }
        },
      },
    });

    metricSync
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
      )
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

    const milestone = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-milestone"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.45,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          if (ipad) {
            let endProgress = progress * 2;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            ipad.style.setProperty('--progress-start', `${progress}%`);
            ipad.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
      },
    });

    milestone
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

    const competition = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-competition"]',
        start: '-=100 center',
        end: 'bottom center',
        toggleActions: 'play pause resume reverse',
        scrub: 0.45,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          if (appleTv) {
            let endProgress = progress * 2;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            appleTv.style.setProperty('--progress-start', `${progress}%`);
            appleTv.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onToggle: (self) => {
          if (self.isActive && tvScreen) {
            tvScreen.muted = true;
            tvScreen.play();
            tvScreen.addEventListener('ended', this.hideVideo);
          } else {
            if (tvScreen) {
              tvScreen.pause();
            }
          }
        },
      },
    });

    competition
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
  },
};

export default metrics;

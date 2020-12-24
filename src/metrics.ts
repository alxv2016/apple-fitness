import gsap from 'gsap';
import util from './utility';

const metrics = {
  deviceSyncUp: document.querySelector<HTMLElement>('[data-target="device-sync-up"]'),
  hero: document.querySelector<HTMLElement>('[data-target="metrics-hero"]'),
  heroContent: document.querySelector<HTMLElement>('[data-target="metrics-content"]'),
  heroMetrics: document.querySelector<HTMLElement>('[data-target="fitness-metrics"]'),
  metricSync: document.querySelector<HTMLElement>('[data-target="metrics-heart-rate"]'),
  milestoneContent: document.querySelector<HTMLElement>('[data-target="metrics-milestone"]'),
  competitionContent: document.querySelector<HTMLElement>('[data-target="metrics-competition"]'),
  processData(metricsData: any) {
    this.renderHero(metricsData.primary);
    this.renderMetricSync(metricsData.primary);
    this.renderValueContent(metricsData.primary);
    this.renderAnimations();
  },
  renderHero(metricsData: any) {
    const renders = {
      shadow: util.createElement('figure', 'c-section-hero__shadow'),
      image: util.createElement('figure', 'c-section-hero__image'),
    };
    if (this.hero) {
      util.renderImage(renders.shadow, metricsData.metrics_hero.shadow.url);
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
  renderMetricSync(metricsData: any) {
    const renders = {
      appleWatch: {
        container: util.createElement('div', 'c-apple-watch', 'metrics-watch'),
        image: util.createElement('figure', 'c-apple-watch__mock'),
        screen: {
          container: util.createElement('div', 'c-apple-watch-screen'),
          static: util.createElement('figure', 'c-apple-watch-screen__static'),
          video: util.createVideoElement('video', 'c-apple-watch-screen__video', 'metrics-watch-video'),
          videoSrc: require('./assets/metrics_watch.mp4'),
        },
      },
      iphone: {
        container: util.createElement('div', 'c-iphone c-iphone--landscape', 'metrics-iphone'),
        image: util.createElement('figure', 'c-iphone__mock'),
        screen: {
          container: util.createElement('div', 'c-iphone-screen'),
          static: util.createElement('figure', 'c-iphone-screen__static'),
          video: util.createVideoElement('video', 'c-iphone-screen__video', 'metrics-iphone-video'),
          videoSrc: require('./assets/metrics_iphone.mp4'),
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
            renders.appleWatch.container.append(renders.appleWatch.image, renders.appleWatch.screen.container);
            // iphone
            util.renderImage(renders.iphone.image, metricsData.metrics_iphone.url, metricsData.metrics_iphone.mask.url);
            util.renderVideo(
              renders.iphone.screen.static,
              renders.iphone.screen.video,
              metricsData.metrics_iphone.static.url,
              renders.iphone.screen.videoSrc
            );

            renders.iphone.screen.container.append(renders.iphone.screen.static, renders.iphone.screen.video);
            renders.iphone.container.append(renders.iphone.image, renders.iphone.screen.container);

            metric.append(renders.appleWatch.container, renders.iphone.container);
            break;
        }
      });
    }
  },
  renderValueContent(metricsData: any) {
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
          videoSrc: require('./assets/metrics_tv.mp4'),
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
    const appleWatchVideo = document.querySelector<HTMLMediaElement>('[data-target="metrics-watch-video"]');
    const iphoneVideo = document.querySelector<HTMLMediaElement>('[data-target="metrics-iphone-video"]');
    const appleTvVideo = document.querySelector<HTMLMediaElement>('[data-target="metrics-tv-video"]');

    const heroMetrics = gsap.timeline({
      defaults: {
        ease: 'none',
        stagger: 0.25,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="metrics-hero"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.deviceSyncUp) {
            this.deviceSyncUp.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.deviceSyncUp.style.setProperty('--progress-end', `${endProgress}%`);
          }
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.hero.style.setProperty('--progress-end', `${endProgress}%`);
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
        scrub: 0.65,
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
        scrub: 0.75,
        start: '-=300 center',
        end: 'bottom center',
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (appleWatch && iphone) {
            appleWatch.style.setProperty('--progress-start', `${scrollProgress}%`);
            appleWatch.style.setProperty('--progress-end', `${endProgress}%`);
            iphone.style.setProperty('--progress-start', `${scrollProgress}%`);
            iphone.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && appleWatchVideo) {
            appleWatchVideo.muted = true;
            appleWatchVideo.play();
            appleWatchVideo.addEventListener('ended', this.hideVideo);
          }
          if (isActive && iphoneVideo) {
            iphoneVideo.muted = true;
            iphoneVideo.play();
            iphoneVideo.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    metricSync
      .fromTo(
        '[data-target="metrics-heart-rate-renders"]',
        {
          scale: 2.45,
          opacity: 0.25,
        },
        {
          xPercent: -35,
          scale: 1,
          opacity: 1,
        }
      )
      .from(
        '[data-target="metrics-iphone"]',
        {
          xPercent: 25,
          opacity: 0,
        },
        0.125
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
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (ipad) {
            ipad.style.setProperty('--progress-start', `${scrollProgress}%`);
            ipad.style.setProperty('--progress-end', `${endProgress}%`);
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
          y: -60,
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
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (appleTv) {
            appleTv.style.setProperty('--progress-start', `${scrollProgress}%`);
            appleTv.style.setProperty('--progress-end', `${endProgress}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && appleTvVideo) {
            appleTvVideo.muted = true;
            appleTvVideo.play();
            appleTvVideo.addEventListener('ended', this.hideVideo);
          }
        },
      },
    });

    competition
      .fromTo(
        '[data-target="metrics-tv"]',
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

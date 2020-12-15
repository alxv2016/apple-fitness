import util from './utility';

const metrics = {
  processData: function (metricsData: any) {
    this.renderHero(metricsData.primary);
    this.renderHeroContent(metricsData.primary);
    this.renderHeartRateContent(metricsData.primary);
    this.renderValueContent(metricsData.primary);
  },
  createMetric: function (metricClass: string, iconClass: string, dataName: string) {
    const imageSet = {
      metric: util.createElement('figure', `metrics-figure ${metricClass}`, dataName),
      metric_icon: util.createElement('figure', `metrics-figure ${iconClass}`, dataName),
    };
    return imageSet;
  },
  renderHero: function (metricsData: any) {
    const hero = document.querySelector('[data-target="metrics-hero"]');
    if (hero) {
      const imageSet = {
        shadow: util.createElement('figure', 'metrics-hero__shadow'),
        image: util.createElement('figure', 'metrics-hero__image'),
      };
      util.setBackgroundImage(imageSet.shadow, metricsData.metrics_hero.shadow.url);
      util.setBackgroundImage(imageSet.image, metricsData.metrics_hero.url);
      util.setImageMask(imageSet.image, metricsData.metrics_hero.mask.url);
      hero.prepend(imageSet.image, imageSet.shadow);
      const fitnessMetrics = document.querySelector('[data-target="fitness-metrics"]');
      if (fitnessMetrics) {
        Array.from(fitnessMetrics.children).forEach((metric) => {
          const data = metric.getAttribute('data-target');
          switch (true) {
            case data === 'metrics-time':
              const timeMetric = this.createMetric('metrics-time__metric', 'metrics-time__icon', 'metrics-time-metric');
              util.setBackgroundImage(timeMetric.metric, metricsData.time_metric.url);
              util.setBackgroundImage(timeMetric.metric_icon, metricsData.time_metric.icon.url);
              metric.append(timeMetric.metric, timeMetric.metric_icon);
              break;
            case data === 'metrics-bpm':
              const bpmMetric = this.createMetric('metrics-bpm__metric', 'metrics-bpm__icon', 'metrics-bpm-metric');
              util.setBackgroundImage(bpmMetric.metric, metricsData.bpm_metric.url);
              util.setBackgroundImage(bpmMetric.metric_icon, metricsData.bpm_metric.metric_icon.url);
              metric.append(bpmMetric.metric, bpmMetric.metric_icon);
              break;
            case data === 'metrics-calories':
              const caloriesMetric = this.createMetric(
                'metrics-calories__metric',
                'metrics-calories__icon',
                'metrics-calories-metric'
              );
              util.setBackgroundImage(caloriesMetric.metric, metricsData.calories_metric.url);
              util.setBackgroundImage(caloriesMetric.metric_icon, metricsData.calories_metric.metric_icon.url);
              metric.append(caloriesMetric.metric, caloriesMetric.metric_icon);
              break;
          }
        });
      }
    }
  },
  renderHeroContent: function (metricsData: any) {
    const content = document.querySelector('[data-target="metrics-content"]');
    const contentSet = {
      h2: util.createElement('h2', 'title-overline', 'metrics-intro'),
      h3: util.createElement('h3', 'title-display title--contained', 'metrics-intro'),
      p: util.createElement('p', 'large-print compact--print', 'metrics-intro'),
    };
    contentSet.h2.textContent = metricsData.overline[0].text;
    contentSet.h3.textContent = metricsData.title[0].text;
    contentSet.p.textContent = metricsData.intro_copy[0].text;
    if (content) {
      content.append(contentSet.h2, contentSet.h3, contentSet.p);
    }
  },
  renderValueContent: function (metricsData: any) {
    console.log(metricsData);
    const milestoneContent: HTMLElement | null = document.querySelector('[data-target="metrics-milestone"]');
    const competitionContent: HTMLElement | null = document.querySelector('[data-target="metrics-competition"]');

    const renders = {
      ipad: {
        reveal: util.createElement('figure', 'metrics-ipad__reveal', 'metrics-ipad-reveal'),
        render: util.createElement('figure', 'metrics-ipad__render'),
      },
      tv: {
        screen: util.createElement('div', 'metrics-tv-screen'),
        reveal: util.createElement('figure', 'metrics-tv__reveal', 'metrics-tv-reveal'),
        render: util.createElement('figure', 'metrics-tv__render'),
        static: util.createElement('figure', 'metrics-tv-screen__static'),
        video: util.createVideoElement('video', 'metrics-tv-screen__video', 'metrics-tv-video'),
      },
    };
    util.setBackgroundImage(renders.ipad.reveal, metricsData.metrics_ipad.reveal.url);
    util.setBackgroundImage(renders.ipad.render, metricsData.metrics_ipad.url);
    util.setImageMask(renders.ipad.reveal, metricsData.metrics_ipad.mask.url);
    util.setImageMask(renders.ipad.render, metricsData.metrics_ipad.mask.url);
    if (milestoneContent && milestoneContent.firstElementChild) {
      milestoneContent.firstElementChild.append(renders.ipad.render, renders.ipad.reveal);
    }
    if (milestoneContent && milestoneContent.lastElementChild) {
      milestoneContent.lastElementChild.innerHTML = metricsData.milestone_intro[0].text;
    }

    util.setBackgroundImage(renders.tv.reveal, metricsData.metrics_tv.reveal.url);
    util.setBackgroundImage(renders.tv.static, metricsData.metrics_tv.static.url);
    util.setBackgroundImage(renders.tv.render, metricsData.metrics_tv.url);
    util.setImageMask(renders.tv.reveal, metricsData.metrics_tv.mask.url);
    util.setImageMask(renders.tv.render, metricsData.metrics_tv.mask.url);
    renders.tv.video.src = require('./assets/metrics_tv.mp4');
    renders.tv.screen.append(renders.tv.static, renders.tv.video);
    if (competitionContent && competitionContent.firstElementChild) {
      competitionContent.firstElementChild.append(renders.tv.render, renders.tv.reveal, renders.tv.screen);
    }
    if (competitionContent && competitionContent.lastElementChild) {
      competitionContent.lastElementChild.innerHTML = metricsData.competition_intro[0].text;
    }
  },
  renderHeartRateContent: function (metricsData: any) {
    const heartRateContent = document.querySelector('[data-target="metrics-heart-rate"]');
    const imageRenders = {
      watch: {
        container: util.createElement('div', 'metrics-watch', 'metrics-watch'),
        screen: util.createElement('div', 'metrics-watch-screen'),
        reveal: util.createElement('figure', 'metrics-watch__reveal', 'metrics-watch-reveal'),
        render: util.createElement('figure', 'metrics-watch__render'),
        static: util.createElement('figure', 'metrics-watch-screen__static'),
        video: util.createVideoElement('video', 'metrics-watch-screen__video', 'metrics-watch-video'),
      },
      iphone: {
        container: util.createElement('div', 'metrics-iphone', 'metrics-iphone'),
        screen: util.createElement('div', 'metrics-iphone-screen'),
        reveal: util.createElement('figure', 'metrics-iphone__reveal', 'metrics-iphone-reveal'),
        render: util.createElement('figure', 'metrics-iphone__render'),
        static: util.createElement('figure', 'metrics-iphone-screen__static'),
        video: util.createVideoElement('video', 'metrics-iphone-screen__video', 'metrics-iphone-video'),
      },
    };

    if (heartRateContent) {
      Array.from(heartRateContent.children).forEach((metric) => {
        const data = metric.getAttribute('data-target');
        switch (true) {
          case data === 'metrics-heart-rate-intro':
            metric.innerHTML = metricsData.sub_intro_copy[0].text;
            break;
          case data === 'metrics-heart-rate-renders':
            // watch
            util.setBackgroundImage(imageRenders.watch.reveal, metricsData.metrics_watch.reveal.url);
            util.setBackgroundImage(imageRenders.watch.render, metricsData.metrics_watch.url);
            util.setBackgroundImage(imageRenders.watch.static, metricsData.metrics_watch.static.url);
            util.setImageMask(imageRenders.watch.reveal, metricsData.metrics_watch.mask.url);
            util.setImageMask(imageRenders.watch.render, metricsData.metrics_watch.mask.url);

            imageRenders.watch.screen.append(imageRenders.watch.video, imageRenders.watch.static);
            imageRenders.watch.container.append(
              imageRenders.watch.render,
              imageRenders.watch.reveal,
              imageRenders.watch.screen
            );
            imageRenders.watch.video.src = require('./assets/metrics_watch.mp4');

            // iphone
            util.setBackgroundImage(imageRenders.iphone.reveal, metricsData.metrics_iphone.reveal.url);
            util.setBackgroundImage(imageRenders.iphone.render, metricsData.metrics_iphone.url);
            util.setBackgroundImage(imageRenders.iphone.static, metricsData.metrics_iphone.static.url);
            util.setImageMask(imageRenders.iphone.reveal, metricsData.metrics_iphone.mask.url);
            util.setImageMask(imageRenders.iphone.render, metricsData.metrics_iphone.mask.url);

            imageRenders.iphone.screen.append(imageRenders.iphone.video, imageRenders.iphone.static);
            imageRenders.iphone.container.append(
              imageRenders.iphone.reveal,
              imageRenders.iphone.render,
              imageRenders.iphone.screen
            );
            imageRenders.iphone.video.src = require('./assets/metrics_iphone.mp4');
            metric.append(imageRenders.watch.container, imageRenders.iphone.container);
            break;
        }
      });
    }
  },
};

export default metrics;

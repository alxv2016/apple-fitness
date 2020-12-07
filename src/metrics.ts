import util from './utility';

const metrics = {
  processData: function (metricsData: any) {
    this.renderHero(metricsData.primary);
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
      console.log(fitnessMetrics);
    }
  },
};

export default metrics;

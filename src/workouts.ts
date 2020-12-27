import gsap from 'gsap';
import util from './utility';

const workouts = {
  metricsCompetition: document.querySelector<HTMLElement>('[data-target="metrics-competition"]'),
  hero: document.querySelector<HTMLElement>('[data-target="workouts-hero"]'),
  workoutsHeroMetrics: document.querySelector<HTMLElement>('[data-target="workouts-hero-metrics"]'),
  workoutsContent: document.querySelector<HTMLElement>('[data-target="workouts-content"]'),
  workoutIcons: document.querySelector<HTMLElement>('[data-target="workout-icons"]'),
  popularWorkouts: document.querySelector<HTMLElement>('[data-target="popular-workouts"]'),
  popularWorkoutsIntro: document.querySelector<HTMLElement>('[data-target="popular-workouts-intro"]'),
  backgroundHero: document.querySelector<HTMLElement>('[data-target="background-hero"]'),
  workoutsAnywhereHeadline: document.querySelector<HTMLElement>('[data-target="workouts-anywhere-headline"]'),
  workoutsAnywhereIntro: document.querySelector<HTMLElement>('[data-target="workouts-anywhere-intro"]'),
  workoutsSmartSuggestions: document.querySelector<HTMLElement>('[data-target="workouts-smart-suggestions"]'),
  workoutsSearch: document.querySelector<HTMLElement>('[data-target="workouts-search"]'),
  ipadSmartSuggestion: document.querySelector<HTMLElement>('[data-target="smart-suggestions-ipad"]'),
  ipadSearch: document.querySelector<HTMLElement>('[data-target="search-ipad"]'),
  processData(workoutsData: any) {
    console.log(workoutsData);
    this.renderHero(workoutsData.primary);
    this.renderWorkouts(workoutsData.items);
    this.renderWorkoutAnywhere(workoutsData.primary);
    this.renderValueContent(workoutsData.primary);
    this.renderAnimations();
  },
  renderHero(workoutsData: any) {
    const renders = {
      shadow: util.createElement('figure', 'c-section-hero__shadow'),
      image: util.createElement('figure', 'c-section-hero__image'),
      duoTone: util.createElement('figure', 'c-section-hero__duo-tone', 'workouts-hero-duo-tone'),
      metrics: {
        yoga: util.createElement('figure', 'c-metric c-metric--yoga', 'workouts-metric-yoga'),
        clock: util.createElement('figure', 'c-metric c-metric--clock', 'workouts-metric-clock'),
        music: util.createElement('figure', 'c-metric c-metric--music', 'workouts-metric-music'),
      },
    };
    if (this.hero) {
      util.renderImage(renders.shadow, workoutsData.hero.shadow.url);
      util.renderImage(renders.image, workoutsData.hero.url, workoutsData.hero.mask.url);
      util.renderImage(renders.duoTone, workoutsData.hero.duo_tone.url, workoutsData.hero.mask.url);
      this.hero.prepend(renders.shadow, renders.image, renders.duoTone);
    }
    if (this.workoutsHeroMetrics) {
      util.renderImage(renders.metrics.yoga, workoutsData.metric_yoga.url);
      util.renderImage(renders.metrics.clock, workoutsData.metric_clock.url);
      util.renderImage(renders.metrics.music, workoutsData.metric_music.url);
      this.workoutsHeroMetrics.append(renders.metrics.yoga, renders.metrics.clock, renders.metrics.music);
    }
    if (this.workoutsContent) {
      Array.from(this.workoutsContent.children).forEach((item) => {
        switch (true) {
          case item.localName === 'h2':
            item.textContent = workoutsData.overline[0].text;
            break;
          case item.localName === 'h3':
            item.textContent = workoutsData.title[0].text;
            break;
          case item.localName === 'p':
            item.textContent = workoutsData.headline_intro[0].text;
            break;
        }
      });
    }
    if (this.popularWorkoutsIntro) {
      this.popularWorkoutsIntro.innerHTML = workoutsData.popular_workouts[0].text;
    }
  },
  renderWorkouts(workoutsData: any) {
    console.log(workoutsData);
    const workouts = workoutsData.map((item: any) => {
      const workoutType = {
        id: item.workout_id,
        icon: {
          container: util.createElement('div', 'c-workout-icon'),
          video: util.createVideoElement('video', 'c-workout-icon__video', 'workout-icon-video'),
          videoSrc: require(`./assets/${item.workout_id}.mp4`),
          image: util.createElement('figure', 'c-workout-icon__static'),
        },
        label: util.createElement('p', 'c-workout__label'),
      };
      util.renderVideo(
        workoutType.icon.image,
        workoutType.icon.video,
        item.workout_icon.url,
        workoutType.icon.videoSrc
      );
      workoutType.label.textContent = item.workout_label;
      workoutType.icon.container.append(workoutType.icon.image, workoutType.icon.video);
      return workoutType;
    });
    if (this.workoutIcons) {
      Array.from(this.workoutIcons.children).forEach((item, i) => {
        item.append(workouts[i].icon.container, workouts[i].label);
      });
    }
  },
  renderWorkoutAnywhere(workoutsData: any) {
    const renders = {
      container: util.createElement('div', 'c-background-hero__container'),
      media: util.createElement('div', 'c-background-hero-media'),
      image: util.createElement('figure', 'c-background-hero-media__static'),
      video: util.createVideoElement('video', 'c-background-hero-media__video', 'background-hero-video'),
      videoSrc: require('./assets/workout_anywhere.mp4'),
    };
    util.renderVideo(renders.image, renders.video, workoutsData.anywhere_anytime.url, renders.videoSrc);
    renders.media.append(renders.image, renders.video);
    renders.container.append(renders.media);
    if (this.backgroundHero) {
      this.backgroundHero.append(renders.container);
    }
    if (this.workoutsAnywhereHeadline) {
      this.workoutsAnywhereHeadline.textContent = workoutsData.anywhere_headling[0].text;
    }
    if (this.workoutsAnywhereIntro) {
      this.workoutsAnywhereIntro.textContent = workoutsData.anywhere_intro[0].text;
    }
  },
  renderValueContent(workoutsData: any) {
    const renders = {
      ipadSmartSuggestions: {
        image: util.createElement('figure', 'c-ipad__mock'),
      },
      ipadSearch: {
        image: util.createElement('figure', 'c-ipad__mock'),
      },
    };
    util.renderImage(
      renders.ipadSmartSuggestions.image,
      workoutsData.smart_suggestions.url,
      workoutsData.smart_suggestions.mask.url
    );
    util.renderImage(renders.ipadSearch.image, workoutsData.search.url, workoutsData.search.mask.url);
    if (this.workoutsSmartSuggestions) {
      Array.from(this.workoutsSmartSuggestions.children).forEach((item) => {
        const data = item.getAttribute('data-target');
        if (data === 'smart-suggestions-ipad') {
          item.append(renders.ipadSmartSuggestions.image);
        }
        if (data === 'smart-suggestions-intro') {
          item.innerHTML = workoutsData.suggestions_intro[0].text;
        }
      });
    }
    if (this.workoutsSearch) {
      Array.from(this.workoutsSearch.children).forEach((item) => {
        const data = item.getAttribute('data-target');
        if (data === 'search-ipad') {
          item.append(renders.ipadSearch.image);
        }
        if (data === 'search-intro') {
          item.innerHTML = workoutsData.search_intro[0].text;
        }
      });
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const workoutIconVideos = document.querySelectorAll('[data-target="workout-icon-video"]');
    const backgroundHeroVideo = document.querySelector<HTMLMediaElement>('[data-target="background-hero-video"]');

    const workoutsHero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-hero"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const competitionHide = util.calculateScroll(progress, 3, 20);
          const heroReveal = util.calculateScroll(progress, 4);
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${heroReveal.start}%`);
            this.hero.style.setProperty('--progress-end', `${heroReveal.end}%`);
          }
          if (this.metricsCompetition) {
            this.metricsCompetition.style.setProperty('--progress-start', `${competitionHide.start}%`);
            this.metricsCompetition.style.setProperty('--progress-end', `${competitionHide.end}%`);
          }
        },
      },
    });

    workoutsHero
      .to('[data-target="workouts-hero-duo-tone"]', {
        opacity: 0,
        delay: 0.025,
      })
      .to(
        '[data-target="workouts-metric-music"]',
        {
          yPercent: -160,
        },
        0
      )
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
        scrub: 0.65,
        start: '-=400 center',
        end: 'center center',
      },
    });

    const workoutIcons = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="popular-workouts"]',
        scrub: 0.65,
        start: '-=200 center',
        end: 'center center',
        onEnter: ({isActive}) => {
          if (isActive) {
            Array.from(workoutIconVideos).forEach((video: any) => {
              video.muted = true;
              video.play();
              video.addEventListener('ended', this.hideVideo);
            });
          }
        },
      },
    });

    workoutIcons
      .from('[data-target="workout-hiit"]', {
        scale: 2.25,
        opacity: 0,
      })
      .from(
        '[data-target="workout"]',
        {
          scale: 0.75,
          opacity: 0,
        },
        0.4
      )
      .from('[data-target="popular-workouts-intro"]', {
        opacity: 0,
        y: 40,
      });

    const backgroundHero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-anywhere"]',
        start: '-=200 center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const workoutsIconsHide = util.calculateScroll(progress, 4, 20);
          const backgroundHeroReveal = util.calculateScroll(progress);
          if (this.popularWorkouts) {
            this.popularWorkouts.style.setProperty('--progress-start', `${workoutsIconsHide.start}%`);
            this.popularWorkouts.style.setProperty('--progress-end', `${workoutsIconsHide.end}%`);
          }
          if (this.backgroundHero) {
            this.backgroundHero.style.setProperty('--progress-start', `${backgroundHeroReveal.start}%`);
            this.backgroundHero.style.setProperty('--progress-end', `${backgroundHeroReveal.end}%`);
          }
        },
        onEnter: ({isActive}) => {
          if (isActive && backgroundHeroVideo) {
            backgroundHeroVideo.muted = true;
            backgroundHeroVideo.loop = true;
            backgroundHeroVideo.play();
            backgroundHeroVideo.addEventListener('ended', this.hideVideo);
          } else {
            if (backgroundHeroVideo) {
              backgroundHeroVideo.pause();
            }
          }
        },
      },
    });

    backgroundHero
      .from('[data-target="workouts-anywhere-headline"]', {
        opacity: 0,
        y: 80,
      })
      .from(
        '[data-target="workouts-anywhere-intro"]',
        {
          opacity: 0,
          y: 80,
        },
        0.45
      );

    const smartSuggestions = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-smart-suggestions"]',
        start: '-=100 center',
        end: 'center center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const smartSuggestions = document.querySelector<HTMLElement>('[data-target="smart-suggestions-intro"]');
          const ipadReveal = util.calculateScroll(progress);
          const smartSuggestionsReveal = util.calculateScroll(progress, 2, 4);
          if (this.ipadSmartSuggestion) {
            this.ipadSmartSuggestion.style.setProperty('--progress-start', `${ipadReveal.start}%`);
            this.ipadSmartSuggestion.style.setProperty('--progress-end', `${ipadReveal.end}%`);
          }
          if (smartSuggestions) {
            smartSuggestions.style.setProperty('--progress-start', `${smartSuggestionsReveal.start}%`);
            smartSuggestions.style.setProperty('--progress-end', `${smartSuggestionsReveal.end}%`);
          }
        },
      },
    });

    smartSuggestions
      .fromTo(
        '[data-target="smart-suggestions-ipad"]',
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
        '[data-target="smart-suggestions-intro"]',
        {
          opacity: 0,
          y: -80,
        },
        0.45
      );

    const workoutsSearch = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-search"]',
        start: '-=100 center',
        end: 'center center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const searchIntro = document.querySelector<HTMLElement>('[data-target="search-intro"]');
          const ipadReveal = util.calculateScroll(progress);
          const searchIntroReveal = util.calculateScroll(progress, 2, 4);
          if (this.ipadSearch) {
            this.ipadSearch.style.setProperty('--progress-start', `${ipadReveal.start}%`);
            this.ipadSearch.style.setProperty('--progress-end', `${ipadReveal.end}%`);
          }
          if (searchIntro) {
            searchIntro.style.setProperty('--progress-start', `${searchIntroReveal.start}%`);
            searchIntro.style.setProperty('--progress-end', `${searchIntroReveal.end}%`);
          }
        },
      },
    });

    workoutsSearch
      .fromTo(
        '[data-target="search-ipad"]',
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
        '[data-target="search-intro"]',
        {
          opacity: 0,
          y: -80,
        },
        0.45
      );
  },
};

export default workouts;

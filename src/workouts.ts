import gsap from 'gsap';
import util from './utility';

const workouts = {
  previous: util.selectElement('[data-target="metrics-competition"]'),
  hero: util.selectElement('[data-target="workouts-hero"]'),
  heroMetrics: util.selectElement('[data-target="workouts-hero-metrics"]'),
  workoutsContent: util.selectElement('[data-target="workouts-content"]'),
  workoutIcons: util.selectElements('[data-target="workout-icon"]'),
  workoutIconLabels: util.selectElements('[data-target="workout-icon-label"]'),
  popularWorkouts: util.selectElement('[data-target="popular-workouts"]'),
  popularWorkoutsIntro: util.selectElement('[data-target="popular-workouts-intro"]'),

  backgroundHero: document.querySelector<HTMLElement>('[data-target="background-hero"]'),
  workoutsAnywhereHeadline: document.querySelector<HTMLElement>('[data-target="workouts-anywhere-headline"]'),
  workoutsAnywhereIntro: document.querySelector<HTMLElement>('[data-target="workouts-anywhere-intro"]'),
  workoutsSmartSuggestions: document.querySelector<HTMLElement>('[data-target="workouts-smart-suggestions"]'),
  workoutsSearch: document.querySelector<HTMLElement>('[data-target="workouts-search"]'),
  ipadSmartSuggestion: document.querySelector<HTMLElement>('[data-target="smart-suggestions-ipad"]'),
  ipadSearch: document.querySelector<HTMLElement>('[data-target="search-ipad"]'),
  processData(workoutsData: any) {
    this.renderHero(workoutsData.primary);
    this.renderWorkoutIcons(workoutsData.items);
    // this.renderWorkoutAnywhere(workoutsData.primary);
    // this.renderValueContent(workoutsData.primary);
    this.renderAnimations();
  },
  renderHero(workoutsData: any) {
    if (this.hero) {
      const el1 = util.renderImage(this.hero.firstElementChild as HTMLElement)(workoutsData.hero.shadow.url);
      const el2 = util.renderImage(this.hero.firstElementChild?.nextElementSibling as HTMLElement)(
        workoutsData.hero.url,
        workoutsData.hero.mask.url
      );
      const el3 = util.renderImage(this.hero.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement)(
        workoutsData.hero.duo_tone.url,
        workoutsData.hero.mask.url
      );
      this.hero.prepend(el1, el2, el3);
    }
    if (this.heroMetrics) {
      const metric1 = util.renderImage(this.heroMetrics.firstElementChild as HTMLElement)(workoutsData.metric_yoga.url);
      const metric2 = util.renderImage(this.heroMetrics.firstElementChild?.nextElementSibling as HTMLElement)(
        workoutsData.metric_clock.url
      );
      const metric3 = util.renderImage(
        this.heroMetrics.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement
      )(workoutsData.metric_music.url);
      this.heroMetrics.append(metric1, metric2, metric3);
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
  renderWorkoutIcons(workoutsData: any) {
    if (this.workoutIcons) {
      this.workoutIcons.forEach((icon, i) => {
        console.log(icon);
        const el = util.renderImage(icon.firstElementChild as HTMLElement)(workoutsData[i].workout_icon.url);
        icon.prepend(el);
        if (icon.lastElementChild) {
          const videoEl = icon.lastElementChild as HTMLMediaElement;
          videoEl.src = require(`./assets/${workoutsData[i].workout_id}.mp4`);
        }
      });
    }
    if (this.workoutIconLabels) {
      this.workoutIconLabels.forEach((label, i) => {
        label.textContent = workoutsData[i].workout_label;
      });
    }
  },
  // renderWorkoutAnywhere(workoutsData: any) {
  //   const renders = {
  //     container: util.createElement('div', 'c-background-hero__container'),
  //     media: util.createElement('div', 'c-background-hero-media'),
  //     image: util.createElement('figure', 'c-background-hero-media__static'),
  //     video: util.createVideoElement('video', 'c-background-hero-media__video', 'background-hero-video'),
  //     videoSrc: require('./assets/workout_anywhere.mp4'),
  //   };
  //   util.renderVideo(renders.image, renders.video, workoutsData.anywhere_anytime.url, renders.videoSrc);
  //   renders.media.append(renders.image, renders.video);
  //   renders.container.append(renders.media);
  //   if (this.backgroundHero) {
  //     this.backgroundHero.append(renders.container);
  //   }
  //   if (this.workoutsAnywhereHeadline) {
  //     this.workoutsAnywhereHeadline.textContent = workoutsData.anywhere_headling[0].text;
  //   }
  //   if (this.workoutsAnywhereIntro) {
  //     this.workoutsAnywhereIntro.textContent = workoutsData.anywhere_intro[0].text;
  //   }
  // },
  // renderValueContent(workoutsData: any) {
  //   const renders = {
  //     ipadSmartSuggestions: {
  //       image: util.createElement('figure', 'c-ipad__mock'),
  //     },
  //     ipadSearch: {
  //       image: util.createElement('figure', 'c-ipad__mock'),
  //     },
  //   };
  //   util.renderImage(
  //     renders.ipadSmartSuggestions.image,
  //     workoutsData.smart_suggestions.url,
  //     workoutsData.smart_suggestions.mask.url
  //   );
  //   util.renderImage(renders.ipadSearch.image, workoutsData.search.url, workoutsData.search.mask.url);
  //   if (this.workoutsSmartSuggestions) {
  //     Array.from(this.workoutsSmartSuggestions.children).forEach((item) => {
  //       const data = item.getAttribute('data-target');
  //       if (data === 'smart-suggestions-ipad') {
  //         item.append(renders.ipadSmartSuggestions.image);
  //       }
  //       if (data === 'smart-suggestions-intro') {
  //         item.innerHTML = workoutsData.suggestions_intro[0].text;
  //       }
  //     });
  //   }
  //   if (this.workoutsSearch) {
  //     Array.from(this.workoutsSearch.children).forEach((item) => {
  //       const data = item.getAttribute('data-target');
  //       if (data === 'search-ipad') {
  //         item.append(renders.ipadSearch.image);
  //       }
  //       if (data === 'search-intro') {
  //         item.innerHTML = workoutsData.search_intro[0].text;
  //       }
  //     });
  //   }
  // },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const workoutIconVideos = util.selectElements('[data-target="workout-icon-video"]');
    const backgroundHeroVideo = document.querySelector<HTMLMediaElement>('[data-target="background-hero-video"]');

    const hero = gsap.timeline({
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
      .to('[data-target="workouts-hero-duo-tone"]', {
        opacity: 0,
        delay: 0.25,
      })
      .from('[data-target="workouts-intro"]', {
        stagger: 0.25,
        opacity: 0,
        y: 60,
      });

    const heroMetrics = gsap.timeline({
      defaults: {
        ease: 'none',
        duration: 6,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-hero"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
      },
    });

    heroMetrics
      .fromTo(
        '[data-target="metric-music"]',
        {
          yPercent: 0,
          opacity: 0.45,
        },
        {
          yPercent: -180,
          opacity: 1,
        },
        0.65
      )
      .from(
        '[data-target="metric-clock"]',
        {
          yPercent: -10,
          opacity: 0,
        },
        0.45
      )
      .fromTo(
        '[data-target="metric-yoga"]',
        {
          yPercent: 0,
          opacity: 0,
        },
        {
          yPercent: 100,
          opacity: 1,
        },
        0.65
      );

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
            workoutIconVideos.forEach((iconVideo: Element) => {
              let video = iconVideo as HTMLMediaElement;
              video.muted = true;
              video.play();
              video.addEventListener('ended', this.hideVideo);
            });
          }
        },
      },
    });

    workoutIcons
      .from('[data-workout="hiit"]', {
        scale: 2.25,
        opacity: 0,
      })
      .from(
        '[data-workout="other"]',
        {
          scale: 0.75,
          opacity: 0,
        },
        0.4
      )
      .from('[data-target="workout-icon-label"]', {
        opacity: 0,
      })
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

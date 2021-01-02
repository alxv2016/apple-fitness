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
  backgroundHero: util.selectElement('[data-target="background-hero"]'),
  backgroundMedia: util.selectElement('[data-target="background-media"]'),
  workoutsAnywhereHeadline: util.selectElement('[data-target="workouts-anywhere-headline"]'),
  workoutsAnywhereIntro: util.selectElement('[data-target="workouts-anywhere-intro"]'),
  ipadSmartSuggestion: util.selectElement('[data-target="smart-suggestions-ipad"]'),
  ipadSearch: util.selectElement('[data-target="search-ipad"]'),
  processData(workoutsData: any) {
    this.renderHero(workoutsData.primary);
    this.renderWorkoutIcons(workoutsData.items);
    this.renderWorkoutAnywhere(workoutsData.primary);
    this.renderValueContent(workoutsData.primary);
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
  renderWorkoutAnywhere(workoutsData: any) {
    if (this.backgroundMedia) {
      const el = util.renderImage(this.backgroundMedia.firstElementChild as HTMLElement)(
        workoutsData.anywhere_anytime.url
      );
      this.backgroundMedia.prepend(el);
      if (this.backgroundMedia.lastElementChild) {
        const videoEl = this.backgroundMedia.lastElementChild as HTMLMediaElement;
        videoEl.src = require('./assets/workout_anywhere.mp4');
      }
    }
    if (this.workoutsAnywhereHeadline) {
      this.workoutsAnywhereHeadline.textContent = workoutsData.anywhere_headling[0].text;
    }
    if (this.workoutsAnywhereIntro) {
      this.workoutsAnywhereIntro.textContent = workoutsData.anywhere_intro[0].text;
    }
  },
  renderValueContent(workoutsData: any) {
    if (this.ipadSmartSuggestion) {
      const el = util.renderImage(this.ipadSmartSuggestion.firstElementChild as HTMLElement)(
        workoutsData.smart_suggestions.url,
        workoutsData.smart_suggestions.mask.url
      );
      this.ipadSmartSuggestion.prepend(el);
      if (this.ipadSmartSuggestion.nextElementSibling) {
        let el = this.ipadSmartSuggestion.nextElementSibling as HTMLElement;
        el.innerHTML = workoutsData.suggestions_intro[0].text;
      }
    }

    if (this.ipadSearch) {
      const el = util.renderImage(this.ipadSearch.firstElementChild as HTMLElement)(
        workoutsData.search.url,
        workoutsData.search.mask.url
      );
      this.ipadSearch.prepend(el);
      if (this.ipadSearch.nextElementSibling) {
        let el = this.ipadSearch.nextElementSibling as HTMLElement;
        el.innerHTML = workoutsData.search_intro[0].text;
      }
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const workoutIconVideos = util.selectElements('[data-target="workout-icon-video"]');
    const backgroundHeroVideo = util.selectElement('[data-target="background-hero-video"]');

    const hero = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-hero"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.65,
        onEnter: ({isActive}) => {
          if (isActive && this.previous) {
            this.previous.classList.add('l-content--hide');
          }
          if (isActive && this.hero) {
            let el = this.hero.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement;
            el.classList.add('l-hero--reveal');
          }
        },
        onUpdate: ({progress}) => {
          const previous = util.calculateScroll(progress, 3, 20);
          const heroReveal = util.calculateScroll(progress, 4);
          if (this.previous) {
            this.previous.style.setProperty('--end-progress-start', `${previous.start}%`);
            this.previous.style.setProperty('--end-progress-end', `${previous.end}%`);
          }
          if (this.hero) {
            let el = this.hero.firstElementChild?.nextElementSibling?.nextElementSibling as HTMLElement;
            el.style.setProperty('--progress-start', `${heroReveal.start}%`);
            el.style.setProperty('--progress-end', `${heroReveal.end}%`);
          }
        },
      },
    });

    hero
      .to('[data-target="workouts-hero-duo-tone"]', {
        opacity: 0,
        delay: 0.45,
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
        duration: 4,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="popular-workouts"]',
        scrub: 0.65,
        start: 'top center',
        end: '450 center',
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
      .from('[data-workout="other"]', {
        scale: 0.75,
        opacity: 0,
      })
      .from(
        '[data-target="workout-icon-label"]',
        {
          opacity: 0,
        },
        4
      )
      .from(
        '[data-target="popular-workouts-intro"]',
        {
          opacity: 0,
          y: 40,
        },
        4
      );

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
          const previous = util.calculateScroll(progress, 4, 20);
          const backgroundHeroReveal = util.calculateScroll(progress);
          if (this.popularWorkouts) {
            this.popularWorkouts.style.setProperty('--end-progress-start', `${previous.start}%`);
            this.popularWorkouts.style.setProperty('--end-progress-end', `${previous.end}%`);
          }
          if (this.backgroundHero) {
            let el = this.backgroundHero.firstElementChild as HTMLElement;
            el.style.setProperty('--progress-start', `${backgroundHeroReveal.start}%`);
            el.style.setProperty('--progress-end', `${backgroundHeroReveal.end}%`);
          }
        },
        onEnter: ({isActive}) => {
          let video = backgroundHeroVideo as HTMLMediaElement;
          if (isActive && this.popularWorkouts) {
            this.popularWorkouts.classList.add('l-content--hide');
          }
          if (isActive && this.backgroundHero) {
            let el = this.backgroundHero.firstElementChild as HTMLElement;
            el.classList.add('l-background--reveal');
          }
          if (isActive && backgroundHeroVideo) {
            video.muted = true;
            video.loop = true;
            video.play();
            video.addEventListener('ended', this.hideVideo);
            util.videoControl(video);
          } else {
            if (backgroundHeroVideo) {
              video.pause();
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
        duration: 4,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-smart-suggestions"]',
        start: '-=100 center',
        end: '450 center',
        scrub: 0.65,
        onEnter: ({isActive}) => {
          const smartSuggestions = this.ipadSmartSuggestion?.nextElementSibling as HTMLElement;
          if (isActive && this.ipadSmartSuggestion) {
            let el = this.ipadSmartSuggestion.firstElementChild as HTMLMediaElement;
            el.classList.add('l-device--reveal');
          }
          if (isActive && smartSuggestions) {
            smartSuggestions.classList.add('l-content--reveal');
          }
        },
        onUpdate: ({progress}) => {
          const smartSuggestions = this.ipadSmartSuggestion?.nextElementSibling as HTMLElement;
          const ipadReveal = util.calculateScroll(progress);
          const smartSuggestionsReveal = util.calculateScroll(progress, 2, 4);
          if (this.ipadSmartSuggestion) {
            let el = this.ipadSmartSuggestion.firstElementChild as HTMLMediaElement;
            el.style.setProperty('--progress-start', `${ipadReveal.start}%`);
            el.style.setProperty('--progress-end', `${ipadReveal.end}%`);
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
          scale: 0.92,
          opacity: 0.125,
        },
        {
          scale: 1,
          opacity: 1,
        }
      )
      .from('[data-target="smart-suggestions-intro"]', {
        opacity: 0,
        y: -80,
      });

    const workoutsSearch = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-search"]',
        start: '-=100 center',
        end: '450 center',
        scrub: 0.65,
        onEnter: ({isActive}) => {
          const searchIntro = this.ipadSearch?.nextElementSibling as HTMLElement;
          if (isActive && this.ipadSearch) {
            let el = this.ipadSearch.firstElementChild as HTMLElement;
            el.classList.add('l-device--reveal');
          }
          if (isActive && searchIntro) {
            searchIntro.classList.add('l-content--reveal');
          }
        },
        onUpdate: ({progress}) => {
          const searchIntro = this.ipadSearch?.nextElementSibling as HTMLElement;
          const ipadReveal = util.calculateScroll(progress);
          const searchIntroReveal = util.calculateScroll(progress, 2, 4);
          if (this.ipadSearch) {
            let el = this.ipadSearch.firstElementChild as HTMLElement;
            el.style.setProperty('--progress-start', `${ipadReveal.start}%`);
            el.style.setProperty('--progress-end', `${ipadReveal.end}%`);
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
          scale: 0.92,
          opacity: 0.125,
        },
        {
          scale: 1,
          opacity: 1,
        }
      )
      .from('[data-target="search-intro"]', {
        opacity: 0,
        y: -80,
      });
  },
};

export default workouts;

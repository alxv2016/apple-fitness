import gsap from 'gsap';
import util from './utility';

const workouts = {
  hero: document.querySelector<HTMLElement>('[data-target="workouts-hero"]'),
  workoutsHeroMetrics: document.querySelector<HTMLElement>('[data-target="workouts-hero-metrics"]'),
  workoutsContent: document.querySelector<HTMLElement>('[data-target="workouts-content"]'),
  workoutIcons: document.querySelector<HTMLElement>('[data-target="workout-icons"]'),
  popularWorkoutsIntro: document.querySelector<HTMLElement>('[data-target="popular-workouts-intro"]'),
  backgroundHero: document.querySelector<HTMLElement>('[data-target="background-hero"]'),
  processData(workoutsData: any) {
    console.log(workoutsData);
    this.renderHero(workoutsData.primary);
    this.renderWorkouts(workoutsData.items);
    this.renderWorkoutAnywhere(workoutsData.primary);
    this.renderAnimations();
  },
  renderHero(workoutsData: any) {
    const renders = {
      shadow: util.createElement('figure', 'c-section-hero__shadow'),
      image: util.createElement('figure', 'c-section-hero__image'),
      metrics: {
        yoga: util.createElement('figure', 'c-metric c-metric--yoga', 'workouts-metric-yoga'),
        clock: util.createElement('figure', 'c-metric c-metric--clock', 'workouts-metric-clock'),
        music: util.createElement('figure', 'c-metric c-metric--music', 'workouts-metric-music'),
      },
    };
    if (this.hero) {
      util.renderImage(renders.shadow, workoutsData.hero.shadow.url);
      util.renderImage(renders.image, workoutsData.hero.url, workoutsData.hero.mask.url);
      this.hero.prepend(renders.shadow, renders.image);
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
      image: util.createElement('figure', 'c-background-hero-static'),
      video: util.createVideoElement('video', 'c-background-hero-video', 'background-hero-video'),
      videoSrc: require('./assets/workout_anywhere.mp4'),
    };
    util.renderVideo(renders.image, renders.video, workoutsData.anywhere_anytime.url, renders.videoSrc);
    renders.container.append(renders.image, renders.video);
    if (this.backgroundHero) {
      this.backgroundHero.append(renders.container);
    }
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  renderAnimations() {
    const workoutIconVideos = document.querySelectorAll('[data-target="workout-icon-video"]');
    const backgroundHeroVideo = document.querySelector<HTMLMediaElement>('[data-target="background-hero-video"]');

    const backgroundHero = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-anywhere"]',
        start: 'top center',
        end: 'center center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.backgroundHero) {
            this.backgroundHero.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.backgroundHero.style.setProperty('--progress-end', `${endProgress}%`);
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

    backgroundHero.from('[data-target="workouts-anywhere"]', {
      opacity: 0,
    });

    const workoutsHero = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-hero"]',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const scrollProgress = Math.floor(progress * 100);
          let endProgress = scrollProgress * 2;
          endProgress > 100 ? (endProgress = 100) : endProgress;
          if (this.hero) {
            this.hero.style.setProperty('--progress-start', `${scrollProgress}%`);
            this.hero.style.setProperty('--progress-end', `${endProgress}%`);
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

    const workoutIcons = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="popular-workouts"]',
        scrub: 0.65,
        start: 'top center',
        end: 'bottom center',
        // onUpdate: ({progress}) => {
        //   const scrollProgress = Math.floor(progress * 100);
        //   let endProgress = scrollProgress * 2;
        //   endProgress > 100 ? (endProgress = 100) : endProgress;
        //   if (appleWatch && iphone) {
        //     appleWatch.style.setProperty('--progress-start', `${scrollProgress}%`);
        //     appleWatch.style.setProperty('--progress-end', `${endProgress}%`);
        //     iphone.style.setProperty('--progress-start', `${scrollProgress}%`);
        //     iphone.style.setProperty('--progress-end', `${endProgress}%`);
        //   }
        // },
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
          //stagger: 0.25,
          scale: 0.75,
          opacity: 0,
        },
        0.095
      );
  },
};

export default workouts;

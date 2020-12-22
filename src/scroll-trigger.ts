const scrollTrigger = {
  initScrollTrigger() {
    this.workoutsSection();
  },
  hideVideo(ev: any) {
    ev.target.removeEventListener('ended', this.hideVideo);
  },
  workoutsSection: function () {
    const workoutsHero = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="workouts-hero"]',
        start: '-=100 center',
        end: 'bottom center',
        scrub: 0.75,
        onUpdate: (self) => {
          const progress = Math.floor(self.progress * 100);
          const heroReveal = document.querySelector<HTMLElement>('[data-target="workouts-hero"]');
          if (heroReveal) {
            let endProgress = progress * 6;
            endProgress > 100 ? (endProgress = 100) : endProgress;
            heroReveal.style.setProperty('--progress-start', `${progress}%`);
            heroReveal.style.setProperty('--progress-end', `${endProgress}%`);
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
  },
};

export default scrollTrigger;

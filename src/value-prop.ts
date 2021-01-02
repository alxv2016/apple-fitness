import util from './utility';
import {gsap} from 'gsap';

const valueProp = {
  heroTitle: document.querySelector<HTMLElement>('[data-target="hero-title"]'),
  heroContent: document.querySelector<HTMLElement>('[data-target="hero-content"]'),
  processData(valueData: any) {
    this.renderValueProp(valueData);
    this.renderAnimations();
  },
  renderValueProp: function (heroData: any) {
    if (this.heroContent) {
      const heading = this.heroContent.querySelector('[data-target="hero-title"]');
      const valueProps = this.heroContent.querySelectorAll('[data-target="value-prop"]');
      if (heading) {
        heading.textContent = heroData.primary.value_headline[0].text;
      }
      if (valueProps) {
        valueProps.forEach((item, i) => {
          if (item.firstElementChild) {
            item.firstElementChild.textContent = heroData.items[i].value_prop[0].text;
          }
        });
      }
    }
  },
  renderAnimations() {
    const heroContent = gsap.timeline({
      defaults: {
        ease: 'ease',
        opacity: 0,
      },
      scrollTrigger: {
        markers: false,
        trigger: '[data-trigger="hero-content"]',
        start: '-=600 center',
        end: 'bottom center',
        scrub: 0.65,
        onUpdate: ({progress}) => {
          const contentReveal = util.calculateScroll(progress, 1.6, 0);
          if (this.heroContent) {
            this.heroContent.classList.add('l-content--reveal');
            this.heroContent.style.setProperty('--progress-start', `${contentReveal.start}%`);
            this.heroContent.style.setProperty('--progress-end', `${contentReveal.end}%`);
          }
        },
      },
    });

    heroContent
      .from('[data-target="value-prop"]', {
        yPercent: 200,
        stagger: 0.25,
      })
      .from('[data-target="pricing-grid"]', {
        yPercent: 40,
      });
  },
};
export default valueProp;

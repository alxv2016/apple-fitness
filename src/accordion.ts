class Accordion {
  accordionHeaders: NodeListOf<Element>;
  accordionPanels: NodeListOf<Element>;
  expanded: boolean;
  constructor() {
    this.accordionHeaders = document.querySelectorAll('[data-target="accordion-header"]');
    this.accordionPanels = document.querySelectorAll('[data-target="accordion-panel"]');
    this.expanded = false;
    this.togglePanel = this.togglePanel.bind(this);
    this.initAccordion();
  }

  initAccordion() {
    if (this.accordionPanels) {
      this.accordionPanels.forEach((panel) => {
        panel.setAttribute('style', 'height: 0; visibility: hidden;');
      });
    }
    if (this.accordionHeaders) {
      this.accordionHeaders.forEach((header, i) => {
        header.firstElementChild?.setAttribute('aria-expanded', `${this.expanded}`);
        header.firstElementChild?.addEventListener('click', (ev) => {
          this.togglePanel(ev, i);
        });
      });
    }
  }

  togglePanel(ev: any, i: number) {
    const panelHeight = this.accordionPanels[i].scrollHeight;
    if (ev.target.getAttribute('aria-expanded') === 'true') {
      ev.target.setAttribute('aria-expanded', this.expanded);
      ev.target.classList.remove('is-opened');
      this.accordionPanels[i].setAttribute('style', 'height: 0; visibility: hidden;');
    } else {
      ev.target.setAttribute('aria-expanded', !this.expanded);
      ev.target.classList.add('is-opened');
      this.accordionPanels[i].setAttribute('style', `height: ${panelHeight}px; visibility: visible;`);
    }
  }
}
const accordion = {
  initAccordion: () => {
    return new Accordion();
  },
};

export default accordion;

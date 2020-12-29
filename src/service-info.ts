const serviceInfo = {
  serviceIntro: document.querySelector<HTMLElement>('[data-target="service-intro"]'),
  serviceHeadings: document.querySelectorAll<HTMLElement>('[data-target="service-heading"]'),
  serviceContents: document.querySelectorAll<HTMLElement>('[data-target="service-content"]'),
  processData(serviceData: any) {
    this.renderServiceIntro(serviceData.primary);
    this.renderAccordionContent(serviceData.items);
  },
  renderServiceIntro(serviceData: any) {
    if (this.serviceIntro) {
      this.serviceIntro.textContent = serviceData.more_info_title[0].text;
    }
  },
  renderAccordionContent(serviceData: any) {
    console.log(serviceData);
    if (this.serviceHeadings) {
      this.serviceHeadings.forEach((heading, i) => {
        const accordionHeading = document.createTextNode(serviceData[i].topic[0].text);
        heading.prepend(accordionHeading);
      });
    }
    if (this.serviceContents) {
      this.serviceContents.forEach((content, i) => {
        content.textContent = serviceData[i].information[0].text;
      });
    }
  },
};

export default serviceInfo;

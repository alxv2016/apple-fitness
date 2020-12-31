const pricing = {
  pricingGrid: document.querySelector<HTMLElement>('[data-target="pricing-grid"]'),
  processData(pricingData: any) {
    this.renderPricing(pricingData.items);
  },
  renderPricing: function (pricingData: any) {
    if (this.pricingGrid) {
      const pricing = this.pricingGrid.querySelectorAll('[data-target="pricing-grid-item"]');
      pricing.forEach((node, i) => {
        Array.from(node.children).forEach((item) => {
          switch (true) {
            case item.localName === 'h2':
              item.textContent = pricingData[i].subheading[0].text;
              break;
            case item.localName === 'h3':
              item.innerHTML = pricingData[i].price[0].text;
              break;
            case item.localName === 'p':
              item.textContent = pricingData[i].description[0].text;
              break;
          }
        });
      });
    }
  },
};
export default pricing;

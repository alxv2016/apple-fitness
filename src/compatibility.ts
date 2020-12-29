import util from './utility';

const compatibility = {
  deviceCompatibility: document.querySelector<HTMLElement>('[data-target="device-compatibility"]'),
  deviceIcons: document.querySelectorAll<HTMLElement>('[data-target="device-icon"]'),
  processData(compatibilityData: any) {
    this.renderContent(compatibilityData.primary);
    this.renderIcons(compatibilityData.items);
  },
  renderContent(compatibilityData: any) {
    if (this.deviceCompatibility) {
      Array.from(this.deviceCompatibility.children).forEach((item) => {
        switch (true) {
          case item.localName === 'h2':
            item.textContent = compatibilityData.compatibility_title[0].text;
            break;
          case item.localName === 'p':
            item.textContent = compatibilityData.compatibility_intro[0].text;
            break;
        }
      });
    }
  },
  renderIcons(compatibilityData: any) {
    if (this.deviceIcons) {
      this.deviceIcons.forEach((item, i) => {
        if (item.firstElementChild) {
          const el = item.firstElementChild as HTMLElement;
          util.renderImage(el, compatibilityData[i].device_icon.url);
        }
        if (item.lastElementChild) {
          item.lastElementChild.textContent = compatibilityData[i].device_label;
        }
      });
    }
  },
};

export default compatibility;

const intro = {
  setBackgroundImage: function (element: HTMLElement, url: string) {
    element.style.backgroundImage = `url('${url}')`;
  },
  setImageMask: function (element: HTMLElement, url: string) {
    element.style.webkitMaskImage = `url('${url}')`;
    element.style.maskImage = `url('${url}')`;
  },
  createProductElement: function (element: string, className: string) {
    const el = document.createElement(element);
    el.className = className;
    return el;
  },
  renderWatchImages: function () {
    const watchContainer = document.querySelector<HTMLMediaElement>('[data-target="apple-watch"]');
    const videoContainer = document.querySelector<HTMLMediaElement>('[data-target="apple-watch"]');

    const imageSet = {
      shadow: this.createProductElement('figure', 'intro-watch__shadow'),
      image: this.createProductElement('figure', 'intro-watch__render'),
    };
  },
};

export default intro;

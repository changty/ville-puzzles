export class Clip {
  constructor(type, mime, src, callbacks) {
    this.type = type;
    this.mime = mime;
    this.src = src;
    this.callbacks = callbacks;
    this.playing = false;
    this.expanded = false;
  }

  render() {
    this.container = document.createElement("div");
    this.container.className = "media-container";

    this.playButton = document.createElement("div");
    this.playButton.className = "play-pause-button";
    this.playButton.classList.add(this.playing ? "pause" : "play");
    this.playButton.onclick = this.onPlayButtonPress.bind(this);

    this.progressBarContainer = document.createElement("div");
    this.progressBarContainer.className = "progress";
    this.progressBar = document.createElement("div");
    this.progressBar.className = "progressbar";
    this.progressBarContainer.appendChild(this.progressBar);

    this.media = document.createElement(this.type);
    this.media.src = this.src;
    this.media.type = this.mime;

    if (this.type === "video") {
      this.media.width = 300;
      this.expandButton = document.createElement("div");
      this.expandButton.className = "expand-button";
      this.expandButton.classList.add("expand");
      this.expandButton.onclick = this.onExpandButtonPress.bind(this);
    }

    this.processMedia();
    this.processProgressBar();

    const controlWrapper = document.createElement("div");
    controlWrapper.className = "controls";
    controlWrapper.appendChild(this.playButton);
    controlWrapper.appendChild(this.progressBarContainer);
    if (this.expandButton) controlWrapper.appendChild(this.expandButton);

    this.container.appendChild(this.media);
    this.container.appendChild(controlWrapper);

    return this.container;
  }

  onPlayButtonPress() {
    if (this.playing) this.media.pause();
    else this.media.play();
  }

  onExpandButtonPress() {
    if (this.expanded) {
      this.container.classList.remove("expanded");
      this.expandButton.classList.add("expand");
      this.expandButton.classList.remove("contract");
      this.expanded = false;
      this.media.width = 300;
    } else {
      this.container.classList.add("expanded");
      this.expandButton.classList.remove("expand");
      this.expandButton.classList.add("contract");
      this.media.width = 600;
      this.expanded = true;
    }

    // To force recalculation of the positions of the slotsS
    window.dispatchEvent(new Event("resize"));
  }

  processMedia() {
    const { media } = this;

    media.ontimeupdate = () => {
      const progress = media.currentTime / media.duration * 100;
      this.progressBar.style.width = progress + "%";
      if (media.currentTime == media.duration) {
        media.currentTimee = 0;
        this.progressBar.style.width = "0%";
        this.playButton.classList.remove("pause");
        this.playButton.classList.add("play");
      }
    };

    media.onplay = () => {
      this.playing = true;
      this.playButton.classList.add("pause");
      this.playButton.classList.remove("play");
    };

    media.onpause = () => {
      this.playing = false;
      this.playButton.classList.remove("pause");
      this.playButton.classList.add("play");
    };

    media.oncanplay = event => {
      if (typeof this.callbacks.oncanplay === "function") {
        this.callbacks.oncanplay(event);
      }
    };
  }

  processProgressBar() {
    this.progressBarContainer.onclick = processClickTouch.bind(this);
    this.progressBarContainer.ontouchstart = processClickTouch.bind(this);

    function processClickTouch(event) {
      const rect = this.progressBarContainer.getBoundingClientRect();

      this.media.currentTime =
        this.media.duration *
        ((event.clientX - rect.left) / (rect.right - rect.left));
    }
  }
}

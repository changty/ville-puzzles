export class BasePuzzle {
  /**
   * @param {object} options
   */

  constructor(options = {}) {
    this.state = {
      running: false,
      answer: null
    };

    this.elementSelectors = Object.assign(
      {
        parent: "#puzzle"
      },
      options.elementSelectors
    );

    this.render = this.render.bind(this);
  }

  sendAnswer() {}

  setup() {
    this.parentEl = document.querySelector(this.elementSelectors.parent);
    this.canvas = document.querySelector(this.elementSelectors.canvas);

    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
    }

    this.renderHTML();
  }

  start() {
    this.state.running = true;
    window.requestAnimationFrame(this.render);
  }

  pause() {
    this.state.running = false;
  }

  renderElement(type, id, inner) {
    const newEl = document.createElement(type);
    const oldEl = document.querySelector(`#${id}`);
    newEl.id = id;
    newEl.innerHTML = inner || "";
    if (oldEl) this.parentEl.removeChild(oldEl);
    this.parentEl.appendChild(newEl);
    return newEl;
  }

  renderHTML() {
    this.renderElement("h1", "puzzleName", this.name);
  }

  render() {
    if (this.state.running && this.canvas) {
      this.draw();
      window.requestAnimationFrame(this.render);
    } else if (!this.canvas) {
      console.warn("no canvas defined"); // eslint-disable-line no-console
    }
  }

  draw() {
    console.warn("draw() not defined"); // eslint-disable-line no-console
    this.state.running = false;
  }
}

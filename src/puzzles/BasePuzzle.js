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

    this.renderHTML();
  }

  start() {
    this.state.running = true;
    window.requestAnimationFrame(this.render);
  }

  pause() {
    this.state.running = false;
  }

  renderElement(type, id, inner, callback) {
    const newEl = document.createElement(type);
    const oldEl = document.querySelector(`#${id}`);
    newEl.id = id;
    newEl.innerHTML = inner || "";
    if (oldEl) this.parentEl.removeChild(oldEl);
    this.parentEl.appendChild(newEl);
    if (typeof callback === "function") return callback(newEl);
    else return newEl;
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

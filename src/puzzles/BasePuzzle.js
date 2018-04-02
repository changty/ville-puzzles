const defaultOptions = {
  "str-your-answer": "Vastauksesi",
  "str-check-answer": "Tarkista",
  "str-send-answer": "Lähetä",
  "str-select": "Valitse"
};

export class BasePuzzle {
  /**
   * @param {object} options
   */

  constructor(options = {}) {
    this.options = Object.assign(defaultOptions, options);

    this.state = {
      running: false,
      answer: null,
      answerSent: false
    };

    this.elementSelectors = Object.assign(
      {
        parent: "#puzzle"
      },
      this.options.elementSelectors
    );

    this.render = this.render.bind(this);
  }

  submit() {}

  sendAnswer() {
    window.alert(`Vastaus "${this.state.answer}" lähetetty!`);
    this.state.answerSent = true;
    this.renderHTML();
  }

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

  renderElement(type, id, inner, parent = this.parentEl) {
    const newEl = document.createElement(type);
    newEl.id = id;
    if (inner && inner.innerHTML) {
      newEl.appendChild(inner);
    } else if (inner instanceof Array) {
      inner.map(e => {
        newEl.appendChild(e);
      });
    } else {
      newEl.innerHTML = inner || "";
    }
    if (parent) {
      const oldEl = document.querySelector(`#${id}`);
      if (oldEl) parent.removeChild(oldEl);
      parent.appendChild(newEl);
    }
    return newEl;
  }

  renderHTML() {
    this.parentEl.innerHTML = "";
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

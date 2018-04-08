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
      answer: null,
      answerSent: false
    };

    this.name = options["str-name"];

    this.elementSelectors = Object.assign(
      {
        parent: "#puzzle"
      },
      this.options.elementSelectors
    );
  }

  onSubmit() {}

  sendAnswer(callback) {
    window.alert(`Vastaus "${this.state.answer}" lähetetty!`);
    this.setState({ answerSent: true }, callback);
  }

  setup() {
    this.parentEl = document.querySelector(this.elementSelectors.parent);

    this.renderHTML();
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

  setState(newState, callback) {
    const oldState = this.state;
    this.state = Object.assign({}, oldState, newState);
    if (typeof callback === "function") callback();
    else this.updateView();
  }

  updateView() {}
}

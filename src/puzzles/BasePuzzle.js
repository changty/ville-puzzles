const defaultOptions = {
  "str-answer-label": "Vastauksesi:",
  "str-check-answer": "Tarkista",
  "str-send-answer": "Lähetä",
  "str-answer-sent": "Vastaus lähetetty!",
  "str-select": "Valitse",
  "str-erase": "Poista"
};

export class BasePuzzle {
  /**
   * @param {object} options
   */

  constructor(options = {}) {
    this.options = Object.assign(defaultOptions, options);

    this.state = {
      answer: "",
      answerSent: false
    };

    this.elementSelectors = Object.assign(
      {
        parent: "#puzzle"
      },
      this.options.elementSelectors
    );
  }

  onSubmit() {}

  sendAnswer(callback) {
    window.alert(this.options["str-answer-sent"]);

    // TODO: Actually send "completeAnswer" to server
    const completeAnswer = JSON.stringify({
      setting: this.setting,
      options: this.options,
      answer: this.state.answer
    });

    // eslint-disable-next-line no-console
    console.log("Complete answer:", completeAnswer);

    this.setState({ answerSent: true }, callback);
  }

  setup() {
    this.parentEl = document.querySelector(this.elementSelectors.parent);
    this.renderHTML();
  }

  renderInner(el, inner) {
    if (inner instanceof HTMLElement || inner instanceof Text) {
      el.appendChild(inner);
    } else if (inner instanceof Array) {
      inner.forEach(i => {
        this.renderInner(el, i);
      });
    } else {
      el.innerText = inner || "";
    }
  }

  renderElement(type, id, inner, parent = this.parentEl) {
    const newEl = document.createElement(type);
    newEl.id = id;

    this.renderInner(newEl, inner);

    const oldEl = document.querySelector(`#${id}`);
    if (oldEl) oldEl.parentNode.removeChild(oldEl);

    if (parent) {
      parent.appendChild(newEl);
    }

    return newEl;
  }

  renderHTML() {
    this.parentEl.innerHTML = "";
    this.renderElement("h1", "puzzleName", this.options["str-name"]);
  }

  setState(newState, callback) {
    const oldState = this.state;
    this.state = Object.assign({}, oldState, newState);
    if (typeof callback === "function") callback();
    else this.updateView();
  }

  updateView() {}
}

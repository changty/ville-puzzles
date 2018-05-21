export class BasePuzzle {
  /**
   * @param {object} data
   */

  constructor(data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      if (e instanceof SyntaxError) {
        // eslint-disable-next-line no-console
        console.log(
          "SyntaxError while parsing settings. Using settings as is."
        );
      } else throw e;
    }

    this.setting = data.setting;
    this.locale = data.locale;

    this.state = {
      answer: "",
      answerSent: false
    };
  }

  onSubmit() {}

  sendAnswer(callback) {
    window.alert(this.locale.general["str-answer-sent"]);

    // TODO: Actually send "completeAnswer" to server
    const completeAnswer = JSON.stringify({
      setting: this.setting,
      locale: this.locale,
      answer: this.state.answer
    });

    // eslint-disable-next-line no-console
    console.log("Complete answer:", completeAnswer);

    this.setState({ answerSent: true }, callback);
  }

  setup() {
    this.parentEl = document.querySelector("#puzzle");
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
    this.renderElement("h1", "puzzleName", this.locale.specific["str-name"]);
  }

  setState(newState, callback) {
    const oldState = this.state;
    this.state = Object.assign({}, oldState, newState);
    if (typeof callback === "function") callback();
    else this.updateView();
  }

  updateView() {}
}

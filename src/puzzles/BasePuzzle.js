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
        parent: "#puzzle",
        name: "#puzzleName",
        description: "#puzzleDescription",
        question: "#puzzleQuestion",
        canvas: "#puzzleCanvas"
      },
      options.elementSelectors
    );

    this.render = this.render.bind(this);
  }

  submit(data) {
    console.log(data);
  }

  sendAnswer() {}

  checkAnswer() {}

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

  renderHTML() {
    // Name
    this.parentEl.querySelector(
      this.elementSelectors.name
    ).innerHTML = this.name;

    // Description
    this.parentEl.querySelector(
      this.elementSelectors.description
    ).innerHTML = this.description;

    // Question
    this.parentEl.querySelector(
      this.elementSelectors.question
    ).innerHTML = this.question;
  }

  render() {
    if (this.state.running && this.canvas) {
      this.draw();
      window.requestAnimationFrame(this.render);
    } else if (!this.canvas) {
      console.warn("no canvas defined");
    }
  }

  draw() {
    console.warn("draw() not defined");
    this.state.running = false;
  }
}

import { BasePuzzle } from "./BasePuzzle";

const defaultOptions = {
  "str-name": "Drag & Drop"
};

export class Puzzle3 extends BasePuzzle {
  constructor(setting, options) {
    /**
     * @param {object} setting
     * @param {object} options
     */
    super(Object.assign(defaultOptions, options));

    this.state.submitted = false;

    // this.name = "";
    // this.description = "";
    // this.question = "";

    // this.html.description = this.options["str-description"];
    // this.html.question = this.options["str-question"];

    this.setting = setting;

    this.setup();
  }

  checkAnswer() {}

  onSubmit() {
    if (!this.canSubmit()) return;
    this.setState({ submitted: true });
  }

  onSendAnswer() {
    if (!this.canSend()) return;
    this.sendAnswer();
  }

  canSubmit() {
    const { submitted } = this.state;
    return !submitted;
  }

  canSend() {
    const { answerSent } = this.state;
    return !answerSent;
  }

  updateView() {
    super.updateView();

    // this.updateAnswer();
    this.updateButtons();
  }

  updateButtons() {
    this.submitButton.disabled = !this.canSubmit();
    this.sendAnswerButton.disabled = !this.canSend();
  }

  renderHTML() {
    super.renderHTML();

    // Render "Tarkista"-button
    this.submitButton = this.renderElement(
      "button",
      "puzzleSubmit",
      this.options["str-check-answer"]
    );
    this.submitButton.onclick = this.onSubmit.bind(this);
    this.submitButton.disabled = true;

    // Render "Lähetä"-button
    this.sendAnswerButton = this.renderElement(
      "button",
      "puzzleSend",
      this.options["str-send-answer"]
    );
    this.sendAnswerButton.onclick = this.onSendAnswer.bind(this);
    this.sendAnswerButton.disabled = true;

    this.updateView();
  }
}

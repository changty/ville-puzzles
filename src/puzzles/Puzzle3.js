import { BasePuzzle } from "./BasePuzzle";

export class Puzzle3 extends BasePuzzle {
  constructor(options) {
    /**
     * @param {object} options
     */
    super(options);

    this.name = "";
    this.description = "";
    this.question = "";

    this.setting = {};

    this.setup();
  }

  submit() {}

  checkAnswer() {}

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.description);

    this.renderElement(
      "button",
      "puzzleSubmit",
      "Tarkista"
    ).onclick = this.submit;

    this.start();
  }
}

import { BasePuzzle } from "./BasePuzzle";

import "./Puzzle2.css";

const objectTypes = {
  101: "riverTopBot",
  102: "riverLeftRight",
  103: "riverDiagTopBot",
  104: "riverDiagBotTop",
  205: "bridgeTopBot",
  206: "bridgeLeftRight",
  207: "bridgeDiagTopBot",
  208: "bridgeDiagBotTop",
  301: "lake",
  302: "tree",
  303: "treestump",
  304: "mushroom"
};

function indexToRowCol(cols, idx) {
  return {
    row: Math.floor(idx / cols),
    col: Math.floor(idx % cols)
  };
}

const defaultOptions = {
  "str-name": "Majavakartta",
  "str-description":
    "Majavakartassa esineen paikka ilmaistaan kahdella suluissa olevalla numerolla. Ensin rivin numero ja sitten sarakkeen numero."
};

export class Puzzle2 extends BasePuzzle {
  constructor(setting, options = {}) {
    /**
     * @param {object} options
     */

    super(Object.assign(defaultOptions, options));

    this.setting = setting;

    this.indexToRowCol = indexToRowCol.bind(null, setting.cols);
    this.onSpotClick = this.onSpotClick.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);

    this.html.description = this.options["str-description"];
    this.html.question = this.options["str-question"];

    this.grid = Array(this.setting.rows * this.setting.cols)
      .fill(null) // Fill with nulls so we can use map()
      .map((_, idx) => {
        const rowCol = this.indexToRowCol(idx);
        return new Spot(
          rowCol.row,
          rowCol.col,
          this.setting.objects.find(
            o => o[0] === rowCol.row + 1 && o[1] === rowCol.col + 1
          )
        );
      });

    this.setup();
  }

  onSendAnswer() {
    if (!this.canSend()) return;
    this.sendAnswer();
  }

  onSpotClick(e, spot) {
    this.onAnswerChange(null, `rivi: ${spot.row}, sarake: ${spot.col}`);
  }

  onAnswerChange(e, newAnswer) {
    if (!this.canEditAnswer()) return;
    this.setState({ answer: e ? e.target.value : newAnswer || "" });
  }

  canSend() {
    const { answer, answerSent } = this.state;
    return !answerSent && answer.length > 0;
  }

  canEditAnswer() {
    const { answerSent } = this.state;
    return !answerSent;
  }

  updateView() {
    super.updateView();

    this.updateAnswer();
    this.updateButtons();
  }

  updateButtons() {
    this.sendAnswerButton.disabled = !this.canSend();
  }

  updateAnswer() {
    this.textArea.value = this.state.answer;
    this.textArea.disabled = !this.canEditAnswer();
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.html.description);

    this.renderElement("div", "puzzleGrid", this.renderGrid());

    this.renderElement("p", "puzzleQuestion", this.html.question);

    this.renderElement("p", "puzzleAnswerLabel", "Vastauksesi: ");

    this.renderElement("div", "puzzleInput", this.renderInputForm());

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

  renderGrid() {
    const gridElements = this.grid.map(spot =>
      spot.renderHTML({
        onClick: this.onSpotClick
      })
    );

    return this.renderElement("div", "gridWrapper", gridElements, null);
  }

  renderInputForm() {
    const textArea = document.createElement("textarea");
    textArea.onchange = this.onAnswerChange;
    textArea.onkeyup = this.onAnswerChange;
    this.textArea = textArea;
    return this.renderElement("form", "inputForm", [textArea], null);
  }
}

class Spot {
  constructor(row_0, col_0, objectType) {
    /**
     * @param {number} row_0 - 0-indexed row
     * @param {number} col_0 - 0-indexed col
     * @param {number} objectType
     */

    this.row_0 = row_0;
    this.row = row_0 + 1; // Human readable coordinate in 1-indexed system

    this.col_0 = col_0;
    this.col = col_0 + 1; // Human readable coordinate in 1-indexed system

    this.objectType = Array.isArray(objectType)
      ? objectType[2]
      : typeof objectType === "number" ? objectType : null;
  }

  renderHTML({ onClick }) {
    const el = document.createElement("div");
    el.className = "spot";
    if (this.objectType) el.classList.add(objectTypes[this.objectType]);
    else el.classList.add("empty");
    el.style.gridRow = this.row;
    el.style.gridColumn = this.col;
    el.innerHTML = this.objectType ? objectTypes[this.objectType] : "&bull;";
    el.onclick = e => onClick(e, this);
    return el;
  }

  toString() {
    return `${this.objectType ? objectTypes[this.objectType] : null} (${
      this.row
    }, ${this.col})`;
  }
}

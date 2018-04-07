import { BasePuzzle } from "./BasePuzzle";

import "./Puzzle1.css";
import "./ring.css";

export function makeCipherer(settings) {
  const { characterSet, key } = settings;
  const keys = /([+-])(\d+)/g.exec(key);
  const factor = keys[1] === "-" ? -parseInt(keys[2]) : parseInt(keys[2]);

  function cipherChar(c) {
    if (characterSet.indexOf(c) === -1) return c;
    let idx = characterSet.indexOf(c) + factor;
    if (idx < 0) idx += characterSet.length;
    else if (idx > characterSet.length - 1) idx -= characterSet.length;
    return characterSet[idx];
  }

  return function cipherer(message) {
    if (typeof message === "string") {
      if (message.length === 1) {
        return cipherChar(message.toUpperCase());
      } else {
        return message
          .toUpperCase()
          .split("")
          .map(cipherChar)
          .join("");
      }
    }
  };
}

export class Puzzle1 extends BasePuzzle {
  constructor(
    cipherMessage,
    setting,
    options = {
      "str-name": "Salakirjoitus",
      "str-description": `
        Majavat lähettävät tietoa erityistä salakirjoitusavainta käyttäen. 
        Jokainen kirjain vaihdetaan aakkosissa {{keyDesc}} olevaan kirjaimeen. <br> 
        Siis esim.. {{keyExample}}.`,
      "str-question": `Vastaanotettu viesti: {{cipherMessage}} <br> 
        <strong>Mikä oli viesti?</strong>`
    }
  ) {
    /**
     * @param {string} cipherMessage
     * @param {object} setting
     * @param {object} options
     */

    super(options);

    this.cipherMessage = cipherMessage;
    this.setting = setting;

    this.state.currentCharIdx = 0;
    this.state.selectedCharIdx = 0;
    this.state.answer = "";
    this.state.done = false;
    this.state.check = [];
    this.state.checked = false;

    this.ringRotationControl = 0;
    this.ringDegreePerChar = 360 / setting.characterSet.length;
    this.ringOldRotation = 0;

    this.cipher = makeCipherer(setting);

    this.name = options["str-name"];
    this.description = options["str-description"]
      .replace("{{keyDesc}}", setting.keyDesc)
      .replace("{{keyExample}}", setting.keyExample);

    this.setup();
  }

  onSubmit() {
    const check = this.checkAnswer(this.cipherMessage, this.state.answer);
    this.setState({ check, checked: true }, () => {
      this.updateAnswer();
      this.updateButtons();
    });
  }

  onSendAnswer() {
    this.sendAnswer(this.updateButtons.bind(this));
  }

  onPrevClick() {
    let { selectedCharIdx } = this.state;

    this.ringRotationControl -= 1;

    if (selectedCharIdx <= 0) {
      selectedCharIdx = this.setting.characterSet.length - 1;
    } else {
      selectedCharIdx -= 1;
    }

    this.setState({ selectedCharIdx }, this.updateRing.bind(this));
  }

  onNextClick() {
    let { selectedCharIdx } = this.state;

    this.ringRotationControl += 1;

    if (selectedCharIdx >= this.setting.characterSet.length - 1) {
      selectedCharIdx = 0;
    } else {
      selectedCharIdx += 1;
    }

    this.setState({ selectedCharIdx }, this.updateRing.bind(this));
  }

  onSelectClick() {
    let { currentCharIdx, answer } = this.state;
    answer += this.setting.characterSet[this.state.selectedCharIdx];
    currentCharIdx += 1;
    while (this.cipherMessage[currentCharIdx] === " ") {
      currentCharIdx += 1;
      answer += " ";
    }
    this.setState({ answer, currentCharIdx }, () => {
      this.updateQuestion();
      this.updateAnswer();
      this.updateButtons();
    });
  }

  updateRing() {
    const rotation = this.ringRotationControl * this.ringDegreePerChar;
    document.querySelector(
      "#puzzleRing #ringWrapper #characters"
    ).style.transform = `rotateY(${-rotation}deg)`;
  }

  updateQuestion() {
    document.querySelector("#puzzleQuestion").innerHTML = this.renderQuestion();
  }

  updateAnswer() {
    document.querySelector("#puzzleAnswer").innerHTML = this.renderAnswer();
  }

  updateButtons() {
    this.selectButton.disabled =
      this.state.answer.length >= this.cipherMessage.length;

    this.submitButton.disabled = this.state.checked;

    this.sendAnswerButton.disabled =
      !this.state.checked || this.state.answerSent;
  }

  checkAnswer(cipherMessage, answer) {
    return answer
      .toUpperCase()
      .split("")
      .map((c, idx) => this.checkCharacter(cipherMessage[idx], c));
  }

  checkCharacter(cipherChar, answerChar) {
    return cipherChar && answerChar && cipherChar === this.cipher(answerChar);
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.description);

    this.renderElement("p", "puzzleQuestion", this.renderQuestion());

    this.renderElement("div", "puzzleRing", this.renderCipherRing());

    this.renderElement("p", "puzzleAnswerLabel", "Vastauksesi: ");

    // Render answer
    this.renderElement("p", "puzzleAnswer");

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
  }

  renderQuestion() {
    const { currentCharIdx } = this.state;
    return this.options["str-question"].replace(
      "{{cipherMessage}}",
      this.cipherMessage
        .split("")
        .map(
          (c, idx) =>
            `<span class="characterSet ${
              idx === currentCharIdx ? "current-char" : ""
            }">${c}</span>`
        )
        .join("")
    );
  }

  renderAnswer() {
    const { answer, check, checked } = this.state;
    return checked
      ? answer
          .split("")
          .map(
            (c, idx) =>
              `<span class="${
                check[idx] ? "correct" : "incorrect"
              }">${c}</span>`
          )
          .join("")
      : answer;
  }

  renderCipherRing() {
    const charSet = this.renderElement(
      "ul",
      "characters",
      this.setting.characterSet
        .split("")
        .map(
          (c, idx) =>
            `<li class="characterSet char-${idx}" style="transform: rotateY(${idx *
              this.ringDegreePerChar}deg) translateZ(300px)">${c}</li>`
        )
        .join(""),
      null
    );

    const ringWrapper = this.renderElement("div", "ringWrapper", charSet, null);

    const prevButton = this.renderElement("button", "prevButton", "<<<", null);
    const nextButton = this.renderElement("button", "nextButton", ">>>", null);
    const selectButton = this.renderElement(
      "button",
      "selectButton",
      this.options["str-select"],
      null
    );

    prevButton.onclick = this.onPrevClick.bind(this);
    nextButton.onclick = this.onNextClick.bind(this);
    selectButton.onclick = this.onSelectClick.bind(this);

    const controls = this.renderElement("div", "controls", [
      prevButton,
      nextButton,
      selectButton
    ]);

    this.selectButton = selectButton;

    return [ringWrapper, controls];
  }
}

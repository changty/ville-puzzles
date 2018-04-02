import { BasePuzzle } from "./BasePuzzle";

import "./Puzzle1.css";

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
    this.state.selectedCharIdx = setting.characterSet.indexOf(cipherMessage[0]);
    this.state.answer = "";
    this.state.done = false;
    this.state.checked = false;

    this.cipher = makeCipherer(setting);

    this.name = options["str-name"];
    this.description = options["str-description"]
      .replace("{{keyDesc}}", setting.keyDesc)
      .replace("{{keyExample}}", setting.keyExample);

    this.setup();
  }

  submit() {
    const check = this.checkAnswer(this.cipherMessage, this.state.answer);

    function renderAnswer(answer) {
      return answer
        .split("")
        .map(
          (c, idx) =>
            `<span class="${check[idx] ? "correct" : "incorrect"}">${c}</span>`
        )
        .join("");
    }

    this.state.renderedAnswer = renderAnswer(this.state.answer);

    this.state.checked = true;

    this.renderHTML();
  }

  checkAnswer(cipherMessage, answer) {
    return answer
      .toUpperCase()
      .split("")
      .map((c, idx) => this.checkCharacter(cipherMessage[idx], c));
  }

  checkCharacter(cipherChar, answerChar) {
    if (cipherChar && answerChar && cipherChar === this.cipher(answerChar)) {
      return true;
    }
    return false;
  }

  onPrevClick() {
    if (this.state.selectedCharIdx <= 0) {
      this.state.selectedCharIdx = this.setting.characterSet.length - 1;
    } else {
      this.state.selectedCharIdx -= 1;
    }
    this.renderHTML();
  }

  onNextClick() {
    if (this.state.selectedCharIdx >= this.setting.characterSet.length - 1) {
      this.state.selectedCharIdx = 0;
    } else {
      this.state.selectedCharIdx += 1;
    }
    this.renderHTML();
  }

  onSelectClick() {
    this.state.answer += this.setting.characterSet[this.state.selectedCharIdx];
    this.state.currentCharIdx += 1;
    while (this.cipherMessage[this.state.currentCharIdx] === " ") {
      this.state.currentCharIdx += 1;
      this.state.answer += " ";
    }
    this.state.selectedCharIdx = this.setting.characterSet.indexOf(
      this.cipherMessage[this.state.currentCharIdx]
    );
    this.renderHTML();
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.description);

    this.renderElement("p", "puzzleQuestion", this.renderQuestion());

    this.renderElement("div", "puzzleRing", this.renderCipherRing());

    this.renderElement("p", "puzzleAnswerLabel", "Vastauksesi: ");

    this.renderElement(
      "p",
      "puzzleAnswer",
      this.state.checked ? this.state.renderedAnswer : this.state.answer
    );

    const checkAnswerButton = this.renderElement(
      "button",
      "puzzleSubmit",
      this.options["str-check-answer"]
    );

    if (!this.state.done || this.state.checked) {
      checkAnswerButton.disabled = true;
    } else {
      checkAnswerButton.onclick = this.submit.bind(this);
    }

    const sendAnswerButton = this.renderElement(
      "button",
      "puzzleSend",
      this.options["str-send-answer"]
    );

    if (this.state.answerSent || !this.state.done || !this.state.checked) {
      sendAnswerButton.disabled = true;
    } else {
      sendAnswerButton.onclick = this.sendAnswer.bind(this);
    }
  }

  renderQuestion() {
    return this.options["str-question"].replace(
      "{{cipherMessage}}",
      this.renderCipherMessageHTML()
    );
  }

  renderCipherMessageHTML() {
    return this.cipherMessage
      .split("")
      .map(
        (c, idx) =>
          `<span class="characterSet ${
            idx === this.state.currentCharIdx ? "current-char" : ""
          }">${c}</span>`
      )
      .join("");
  }

  renderCharacterSet() {
    return this.setting.characterSet
      .split("")
      .map(
        (c, idx) =>
          `<span class="characterSet ${
            idx === this.state.selectedCharIdx ? "current-char" : ""
          }">${c}</span>`
      )
      .join("");
  }

  renderCipherRing() {
    const charSet = this.renderElement(
      "div",
      "characters",
      this.renderCharacterSet(),
      null
    );

    if (this.state.currentCharIdx >= this.cipherMessage.length) {
      this.state.done = true;
    }

    const prevButton = this.renderElement("button", "prevButton", "<<<", null);
    const nextButton = this.renderElement("button", "nextButton", ">>>", null);
    const selectButton = this.renderElement(
      "button",
      "selectButton",
      this.options["str-select"],
      null
    );

    if (!this.state.done) {
      prevButton.onclick = this.onPrevClick.bind(this);
      nextButton.onclick = this.onNextClick.bind(this);
      selectButton.onclick = this.onSelectClick.bind(this);
    } else {
      prevButton.disabled = true;
      nextButton.disabled = true;
      selectButton.disabled = true;
    }

    return [charSet, prevButton, nextButton, selectButton];
  }
}

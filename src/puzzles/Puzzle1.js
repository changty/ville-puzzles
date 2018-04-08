import { BasePuzzle } from "./BasePuzzle";

import "./Puzzle1.css";

export function makeCipherer({ characterSet, key }) {
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

const defaultOptions = {
  "str-name": "Salakirjoitus",
  "str-description": `
    Majavat lähettävät tietoa erityistä salakirjoitusavainta käyttäen. 
    Jokainen kirjain vaihdetaan aakkosissa {{keyDesc}} olevaan kirjaimeen. <br> 
    Siis esim.. {{keyExample}}.`,
  "str-question": `Vastaanotettu viesti: {{cipherText}} <br> 
    <strong>Mikä oli viesti?</strong>`
};

export class Puzzle1 extends BasePuzzle {
  constructor(setting, options = {}) {
    /**
     * @param {object} setting
     * @param {object} options
     */
    super(Object.assign(defaultOptions, options));

    this.setting = setting;
    this.cipher = makeCipherer(setting);
    this.ringRotationControl = 0;
    this.ringDegreePerChar = 360 / setting.characterSet.length;

    this.state = {
      answer: "",
      check: [],
      currentCharIdx: 0,
      done: false,
      ringRotation: 0,
      selectedCharIdx: 0,
      submitted: false
    };

    this.html.description = this.options["str-description"]
      .replace("{{keyDesc}}", setting.keyDesc)
      .replace("{{keyExample}}", setting.keyExample);

    this.setup();
  }

  setup() {
    super.setup();
    document.onkeydown = this.onKeyPress.bind(this);
  }

  checkAnswer(cipherText, answer) {
    return answer
      .toUpperCase()
      .split("")
      .map((c, idx) => this.checkCharacter(cipherText[idx], c));
  }

  checkCharacter(cipherChar, answerChar) {
    return cipherChar && answerChar && cipherChar === this.cipher(answerChar);
  }

  onSubmit() {
    if (!this.canSubmit()) return;
    const { answer } = this.state;
    const { cipherText } = this.setting;
    const check = this.checkAnswer(cipherText, answer);
    this.setState({ check, submitted: true });
  }

  onSendAnswer() {
    if (!this.canSend()) return;
    this.sendAnswer();
  }

  onPrev() {
    let { ringRotation, selectedCharIdx } = this.state;
    const { characterSet } = this.setting;

    ringRotation -= 1;

    if (selectedCharIdx <= 0) {
      selectedCharIdx = characterSet.length - 1;
    } else {
      selectedCharIdx -= 1;
    }

    this.setState({ ringRotation, selectedCharIdx });
  }

  onNext() {
    let { ringRotation, selectedCharIdx } = this.state;
    const { characterSet } = this.setting;

    ringRotation += 1;

    if (selectedCharIdx >= characterSet.length - 1) {
      selectedCharIdx = 0;
    } else {
      selectedCharIdx += 1;
    }

    this.setState({ ringRotation, selectedCharIdx });
  }

  onErase() {
    if (!this.canErase()) return;

    let { answer, currentCharIdx } = this.state;
    const { cipherText } = this.setting;

    answer = answer.slice(0, -1);
    currentCharIdx -= 1;
    while (cipherText[currentCharIdx] === " ") {
      currentCharIdx -= 1;
      answer = answer.slice(0, -1);
    }

    this.setState({ answer, currentCharIdx });
  }

  onSelect() {
    if (!this.canSelect()) return;

    const { selectedCharIdx } = this.state;
    let { currentCharIdx, answer } = this.state;
    const { characterSet, cipherText } = this.setting;

    answer += characterSet[selectedCharIdx];
    currentCharIdx += 1;
    while (cipherText[currentCharIdx] === " ") {
      currentCharIdx += 1;
      answer += " ";
    }

    this.setState({ answer, currentCharIdx });
  }

  onKeyPress(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.onPrev();
        break;

      case "ArrowRight":
        this.onNext();
        break;

      case "Enter":
        this.onSelect();
        break;

      case "Backspace":
        this.onErase();
        break;

      default:
        return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
  }

  canSelect() {
    const { answer, submitted } = this.state;
    const { cipherText } = this.setting;

    return !submitted && answer.length < cipherText.length;
  }

  canErase() {
    const { answer, currentCharIdx, submitted } = this.state;
    return !submitted && answer.length > 0 && currentCharIdx > 0;
  }

  canSubmit() {
    const { answer, submitted } = this.state;
    return !submitted && answer.length > 0;
  }

  canSend() {
    const { answerSent, submitted } = this.state;
    return submitted && !answerSent;
  }

  updateView() {
    super.updateView();

    this.updateAnswer();
    this.updateButtons();
    this.updateQuestion();
    this.updateRing();
  }

  updateRing() {
    const { ringRotation, selectedCharIdx } = this.state;
    const rotation = ringRotation * this.ringDegreePerChar;

    // Update rotation
    document.querySelector(
      "#puzzleRing #ringWrapper #characters"
    ).style.transform = `rotateY(${-rotation}deg)`;

    // Update selected class
    // Use setTimeout so the class is set somewhat in sync with the animation
    setTimeout(() => {
      document
        .querySelectorAll("#puzzleRing #ringWrapper #characters .characterSet")
        .forEach((el, idx) => {
          if (idx === selectedCharIdx) {
            el.classList.add("current-char");
          } else {
            el.classList.remove("current-char");
          }
        });
    }, 60);
  }

  updateQuestion() {
    document.querySelector("#puzzleQuestion").innerHTML = this.renderQuestion();
  }

  updateAnswer() {
    document.querySelector("#puzzleAnswer").innerHTML = this.renderAnswer();
  }

  updateButtons() {
    this.eraseButton.disabled = !this.canErase();
    this.selectButton.disabled = !this.canSelect();
    this.submitButton.disabled = !this.canSubmit();
    this.sendAnswerButton.disabled = !this.canSend();
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.html.description);

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

    this.updateView();
  }

  renderQuestion() {
    const { currentCharIdx } = this.state;
    const { cipherText } = this.setting;
    return this.options["str-question"].replace(
      "{{cipherText}}",
      cipherText
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
    const { answer, check, submitted } = this.state;
    return submitted
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
    const { selectedCharIdx } = this.state;
    const { characterSet } = this.setting;

    const charSet = this.renderElement(
      "ul",
      "characters",
      characterSet
        .split("")
        .map(
          (c, idx) =>
            `<li class="characterSet char-${idx} ${
              idx === selectedCharIdx ? "current-char" : ""
            }" style="transform: rotateY(${idx *
              this.ringDegreePerChar}deg) translateZ(300px)">${c}</li>`
        )
        .join(""),
      null
    );

    const ringWrapper = this.renderElement("div", "ringWrapper", charSet, null);

    const eraseButton = this.renderElement(
      "button",
      "eraseButton",
      this.options["str-erase"],
      null
    );
    const prevButton = this.renderElement("button", "prevButton", "<<<", null);
    const nextButton = this.renderElement("button", "nextButton", ">>>", null);
    const selectButton = this.renderElement(
      "button",
      "selectButton",
      this.options["str-select"],
      null
    );

    eraseButton.disabled = true;

    eraseButton.onclick = this.onErase.bind(this);
    prevButton.onclick = this.onPrev.bind(this);
    nextButton.onclick = this.onNext.bind(this);
    selectButton.onclick = this.onSelect.bind(this);

    const controls = this.renderElement("div", "controls", [
      eraseButton,
      prevButton,
      nextButton,
      selectButton
    ]);

    this.eraseButton = eraseButton;
    this.selectButton = selectButton;

    return [ringWrapper, controls];
  }
}

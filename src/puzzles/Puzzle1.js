import { BasePuzzle } from "./BasePuzzle";
import { setVendorStyle } from "../lib/util";

import "./Puzzle1.css";

export class Puzzle1 extends BasePuzzle {
  constructor(data) {
    /**
     * @param {object} data
     */
    super(data);

    this.cipherer = new Cipherer(this.setting.characterSet, this.setting.key);
    this.setting.key = this.cipherer.factor;

    this.state = Object.assign(this.state, {
      answerCheck: [],
      currentCharIdx: 0,
      ringRotation: 0,
      selectedCharIdx: 0,
      submitted: false
    });

    this.setup();
  }

  setup() {
    super.setup();
    document.onkeydown = this.onKeyPress.bind(this);
  }

  cleanUp() {
    document.onkeydown = null;
  }

  onSubmit() {
    if (!this.canSubmit()) return;
    const { answer } = this.state;
    const { cipherText } = this.setting;
    const answerCheck = this.cipherer.checkMessage(cipherText, answer);
    this.setState({ answerCheck, submitted: true });
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
    const rotation = this.getRingRotation(ringRotation);

    // Update rotation
    const el = document.querySelector("#puzzleRing #characters");
    setVendorStyle(el, "transform", `rotateY(${-rotation}deg)`);

    // Update selected class
    // Use setTimeout so the class is set somewhat in sync with the animation
    setTimeout(() => {
      document
        .querySelectorAll("#puzzleRing #characters .characterSet")
        .forEach((c, idx) => {
          if (idx === selectedCharIdx) c.classList.add("current-char");
          else c.classList.remove("current-char");
        });
    }, 60);
  }

  updateQuestion() {
    const el = document.querySelector("#puzzleQuestion");
    el.innerHTML = ""; // Clear old content
    this.renderInner(el, this.renderQuestion());
  }

  updateAnswer() {
    const el = document.querySelector("#puzzleAnswer");
    el.innerHTML = ""; // Clear old content
    this.renderInner(el, this.renderAnswer());
  }

  updateButtons() {
    this.eraseButton.disabled = !this.canErase();
    this.selectButton.disabled = !this.canSelect();
    this.submitButton.disabled = !this.canSubmit();
    this.sendAnswerButton.disabled = !this.canSend();
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.renderDescription());
    this.renderElement("p", "puzzleQuestion", this.renderQuestion());
    this.renderElement("div", "puzzleRing", this.renderCipherRing());
    this.renderElement("p", "puzzleAnswer", this.renderAnswer());

    // "Tarkista"-button
    this.submitButton = this.renderElement(
      "button",
      "puzzleSubmit",
      this.locale.general["str-check-answer"]
    );
    this.submitButton.onclick = this.onSubmit.bind(this);
    this.submitButton.disabled = true;

    // "Lähetä"-button
    this.sendAnswerButton = this.renderElement(
      "button",
      "puzzleSend",
      this.locale.general["str-send-answer"]
    );
    this.sendAnswerButton.onclick = this.onSendAnswer.bind(this);
    this.sendAnswerButton.disabled = true;

    this.updateView();
  }

  renderDescription() {
    return [
      document.createTextNode(this.locale.specific["str-description"]),
      document.createElement("br"),
      document.createTextNode(this.locale.specific["str-key-description"]),
      document.createElement("br"),
      document.createTextNode(this.locale.specific["str-example-label"]),
      document.createTextNode(" "),
      document.createTextNode(this.renderExample())
    ];
  }

  renderQuestion() {
    const { currentCharIdx } = this.state;
    const { cipherText } = this.setting;

    const labelText = document.createTextNode(
      this.locale.specific["str-ciphertext-label"]
    );

    const label = [labelText, document.createTextNode(" ")];

    const chars = cipherText.split("").map((c, idx) => {
      const el = document.createElement("span");
      el.classList.add("cipher-char");
      if (idx === currentCharIdx) el.classList.add("current-char");
      el.innerText = c;
      return el;
    });

    const questionEl = document.createElement("strong");
    questionEl.innerText = this.locale.specific["str-question"];

    return [label, chars, document.createElement("br"), questionEl];
  }

  renderExample() {
    const { key, characterSet: cs } = this.setting;
    const len = cs.length;
    return [0, 1, len - 2, len - 1]
      .map(
        i => `${cs[rotatingIndex(len, i)]} → ${cs[rotatingIndex(len, i + key)]}`
      )
      .join(",");
  }

  renderAnswer() {
    const { answer, answerCheck, submitted } = this.state;

    const labelText = document.createTextNode(
      this.locale.general["str-answer-label"]
    );

    const label = [labelText, document.createTextNode(" ")];

    const chars = answer.split("").map((c, idx) => {
      const el = document.createElement("span");
      el.classList.add(answerCheck[idx] ? "correct" : "incorrect");
      el.innerText = c;
      return el;
    });

    const answerText = document.createTextNode(answer);

    return submitted ? [label, chars] : [label, answerText];
  }

  renderCipherRing() {
    const { characterSet } = this.setting;

    const radius = 300;

    const chars = characterSet.split("").map((c, idx) => {
      const rotation = this.getRingRotation(idx);
      const el = document.createElement("li");
      el.classList.add("characterSet");
      el.innerText = c;
      setVendorStyle(
        el,
        "transform",
        `rotateY(${rotation}deg) translateZ(${radius}px)`
      );
      return el;
    });

    const ring = this.renderElement("ul", "characters", chars, null);

    const ringWrapper = this.renderElement("div", "ringWrapper", ring, null);

    const eraseButton = this.renderElement(
      "button",
      "eraseButton",
      this.locale.general["str-erase"],
      null
    );
    const prevButton = this.renderElement("button", "prevButton", "<<<", null);
    const nextButton = this.renderElement("button", "nextButton", ">>>", null);
    const selectButton = this.renderElement(
      "button",
      "selectButton",
      this.locale.general["str-select"],
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

  getRingRotation(index) {
    return index * (360 / this.setting.characterSet.length);
  }
}

export class Cipherer {
  constructor(characterSet, key) {
    const keys = /([+-])(\d+)/g.exec(key);
    this.factor = keys[1] === "-" ? -parseInt(keys[2]) : parseInt(keys[2]);
    this.characterSet = characterSet;
  }

  cipherChar(c) {
    if (this.characterSet.indexOf(c) === -1) return c;
    const idx = rotatingIndex(
      this.characterSet.length,
      this.characterSet.indexOf(c) + this.factor
    );
    return this.characterSet[idx];
  }

  cipherMessage(m) {
    if (typeof m === "string") {
      return m
        .toUpperCase()
        .split("")
        .map(this.cipherChar.bind(this))
        .join("");
    }
  }

  checkCharacter(cipherChar, charToCheck) {
    return (
      cipherChar && charToCheck && cipherChar === this.cipherChar(charToCheck)
    );
  }

  checkMessage(cipherText, message) {
    return message
      .toUpperCase()
      .split("")
      .map((c, idx) => this.checkCharacter(cipherText[idx], c));
  }
}

function rotatingIndex(arrayLen, index) {
  if (index >= arrayLen) return index - arrayLen;
  if (index < 0) return index + arrayLen;
  return index;
}

window.Puzzle1 = Puzzle1;

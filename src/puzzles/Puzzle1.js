import { BasePuzzle } from "./BasePuzzle";

export class Puzzle1 extends BasePuzzle {
  constructor(cipherMessage, setting, options = {}) {
    /**
     * @param {string} cipherMessage
     * @param {object} setting
     * @param {object} options
     */

    super(options);

    this.cipherMessage = cipherMessage;
    this.setting = setting;

    this.name = "Salakirjoitus";

    this.description = `
      Majavat lähettävät tietoa erityistä salakirjoitusavainta käyttäen. 
      Jokainen kirjain vaihdetaan aakkosissa ${
        this.setting.desc
      } olevaan kirjaimeen. <br> 
      Siis esim.. ${this.setting.example}.`;

    this.question = `Vastaanotettu viesti: ${
      this.cipherMessage
    } <br> <strong>Mikä oli viesti?</strong>`;

    this.submit = this.submit.bind(this);

    this.setup();
  }

  submit() {
    const inputEl = document.querySelector("input#puzzleInput");
    const answerEl = document.querySelector("#puzzleAnswer");

    if (!inputEl.value) return;

    this.state.answer = inputEl.value;
    inputEl.value = "";

    const check = this.checkAnswer(this.cipherMessage, this.state.answer);

    function renderAnswer(answer) {
      return answer
        .split("")
        .map((c, idx) => {
          if (check[idx]) return `<span class="correct">${c}</span>`;
          else return `<span class="incorrect">${c}</span>`;
        })
        .join("");
    }

    const renderedAnswer = renderAnswer(this.state.answer);

    answerEl.innerHTML = `Vastauksesi: <strong>${renderedAnswer}</strong>`;
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

  cipher(c) {
    const { characterSet, key } = this.setting;
    const keys = /([+-])(\d+)/g.exec(key);
    const factor = keys[1] === "-" ? -parseInt(keys[2]) : parseInt(keys[2]);

    if (characterSet.indexOf(c) === -1) return c;
    let idx = characterSet.indexOf(c) + factor;
    if (idx < 0) idx += characterSet.length;
    else if (idx > characterSet.length - 1) idx -= characterSet.length;
    return characterSet[idx];
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.description);
    this.renderElement("p", "puzzleQuestion", this.question);
    this.renderElement("p", "puzzleAnswer");

    this.renderElement("input", "puzzleInput");
    this.renderElement(
      "button",
      "puzzleSubmit",
      "Tarkista"
    ).onclick = this.submit;
  }
}

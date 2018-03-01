import { BasePuzzle } from "./BasePuzzle";

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

class Spot {
  constructor(x, y) {
    /**
     * @param {number} x
     * @param {number} y
     */
    this.x = x;
    this.y = y;
  }
}

export class Puzzle2 extends BasePuzzle {
  constructor(options) {
    /**
     * @param {object} options
     */
    super(options);

    this.name = "Majavakartta";

    this.description =
      "Majavakartassa esineen paikka ilmaistaan kahdella suluissa olevalla numerolla. Ensin rivin numero ja sitten sarakkeen numero.";
    this.question = "";

    this.setting = Array(10).fill(Array(10).fill(null));
    this.setting[0][0] = objectTypes[301];

    this.state.matrix = Array(10)
      .fill(null)
      .map((_, x) =>
        Array(10)
          .fill(null)
          .map((_, y) => new Spot(x, y, this.setting[y][x]))
      );

    console.log(this.setting[1][0]);
    console.table(this.setting);
    console.table(this.state.matrix);

    this.submit = this.submit.bind(this);

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
  }
}

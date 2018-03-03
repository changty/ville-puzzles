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

    this.setting = {
      objects: [[1, 1, 301], [2, 5, 304], [3, 9, 302], [9, 6, 303]]
    };

    // const rows = 10;
    // const cols = 10;

    // const matrix = Array(rows * cols)
    //   .fill(null)
    //   .map((_, idx) => {
    //     const row_0 = idx / rows;
    //     const col_0 = idx % rows;
    //     return new Spot(
    //       row_0,
    //       col_0,
    //       this.setting.objects.find(
    //         o => o[0] === row_0 + 1 && o[1] === col_0 + 1
    //       )
    //     );
    //   });

    // console.log(matrix[0]);

    this.state.matrix = Array(10)
      .fill(null)
      .map((_, row_0) =>
        Array(10)
          .fill(null)
          .map(
            (_, col_0) =>
              new Spot(
                row_0,
                col_0,
                this.setting.objects.find(
                  o => o[0] === row_0 + 1 && o[1] === col_0 + 1
                )
              )
          )
      );

    this.submit = this.submit.bind(this);
    this.draw = this.draw.bind(this);
    this.canvasMouseHover = this.canvasMouseHover.bind(this);
    this.canvasMouseOut = this.canvasMouseOut.bind(this);
    this.canvasClick = this.canvasClick.bind(this);

    this.setup();
  }

  submit() {}

  checkAnswer() {}

  renderHTML() {
    super.renderHTML();

    this.renderElement("p", "puzzleDescription", this.description);

    this.renderElement("canvas", "puzzleCanvas", null, canvas => {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      canvas.width = 300;
      canvas.height = 300;
      canvas.onmousemove = this.canvasMouseHover;
      canvas.onmouseout = this.canvasMouseOut;
      canvas.onclick = this.canvasClick;
    });

    this.renderElement("br", "puzzleSpacing");

    this.renderElement(
      "button",
      "puzzleSubmit",
      "Tarkista"
    ).onclick = this.submit;

    this.start();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderMap();
  }

  renderMap() {
    this.state.matrix.forEach(cols =>
      cols.forEach(spot => {
        spot.render(
          this.ctx,
          this.ctx.canvas.clientWidth / 10,
          this.ctx.canvas.clientHeight / 10,
          this.mouseX,
          this.mouseY,
          this.state.lastClickedSpot
        );
      })
    );
  }

  canvasMouseHover(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  canvasMouseOut() {
    this.mouseX = -1;
    this.mouseY = -1;
  }

  canvasClick() {
    this.state.lastClickedSpot = null;
    this.state.matrix.forEach(cols =>
      cols.forEach(s => {
        if (s.isMouseHovering(this.mouseX, this.mouseY)) {
          this.state.lastClickedSpot = s;
          console.log(`Clicked on ${s.toString()}`);
        }
      })
    );
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

  render(ctx, w, h, mouseX, mouseY, lastClickedSpot) {
    const x = (this.x = this.col_0 * w);
    const y = (this.y = this.row_0 * h);
    this.rect = [x, y, w, h];

    if (this.isMouseHovering(mouseX, mouseY)) {
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(...this.rect);
    }

    if (
      lastClickedSpot &&
      lastClickedSpot.row === this.row &&
      lastClickedSpot.col === this.col
    ) {
      ctx.strokeStyle = "#AAAAAA";
      ctx.strokeRect(...this.rect);
    }

    switch (this.objectType) {
      case 301:
        // Lake
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(...this.rect);
        break;
      case 302:
        // Tree
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(...this.rect);
        break;
      case 303:
        // Treestump
        ctx.fillStyle = "#9fc600";
        ctx.fillRect(...this.rect);
        break;
      case 304:
        // Mushroom
        ctx.fillStyle = "#b26e1a";
        ctx.fillRect(...this.rect);
        break;
      default:
        ctx.fillStyle = "#aaaaaa";
        ctx.beginPath();
        ctx.arc(x + w / 2, y + h / 2, 5, 0, Math.PI + Math.PI * 4 / 2);
        ctx.fill();
    }

    ctx.fillStyle = "#000000";
  }

  isMouseHovering(mouseX, mouseY) {
    const [x, y, w, h] = this.rect;
    return mouseX >= x && mouseX < x + h && mouseY >= y && mouseY < y + w;
  }

  toString() {
    return `${this.objectType ? objectTypes[this.objectType] : null} (${
      this.row
    }, ${this.col})`;
  }
}

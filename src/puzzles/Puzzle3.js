import { BasePuzzle } from "./BasePuzzle";

import "./Puzzle3.css";

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

    this.setting = setting;

    this.state.submitted = false;

    this.slots = this.setting.slots.map(s => new Slot(20, s));

    const draggables = [
      { type: "image/png", content: "https://picsum.photos/200/100/?random" },
      { type: "image/png", content: "https://picsum.photos/200/200/?random" },
      { type: "image/png", content: "https://picsum.photos/100/100/?random" },
      {
        type: "video/youtube",
        content: "https://www.youtube.com/embed/tgbNymZ7vqY"
      },
      { type: "text/plain", content: "Drag me 1" },
      { type: "text/plain", content: "Drag me 2" },
      { type: "text/plain", content: "Drag me 3" }
      // <embed width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY">
    ];

    this.draggables = draggables.map((o, i) => new Draggable(o, i));

    // this.html.description = this.options["str-description"];
    // this.html.question = this.options["str-question"];

    this.setup();
  }

  setup() {
    super.setup();
    window.onresize = () => {
      this.updateSlotPositions(this.backgroundImage);
    };
  }

  cleanUp() {
    window.onresize = null;
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

  updateBackground() {}

  updateSlotPositions(imageEl) {
    const widthRatio = imageEl.offsetWidth / imageEl.naturalWidth;
    const heightRatio = imageEl.offsetHeight / imageEl.naturalHeight;
    this.slots.forEach(s => s.setPosition({ widthRatio, heightRatio }));
  }

  renderHTML() {
    super.renderHTML();

    this.renderElement("div", "background", this.renderBackground());

    const draggabblesContainer = this.renderElement(
      "div",
      "draggables-container",
      this.renderDraggables()
    );

    draggabblesContainer.ondragover = event => event.preventDefault();
    draggabblesContainer.ondrop = event => {
      event.preventDefault();
      const id = event.dataTransfer.getData("dragged-id");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el.Draggable) return;
      el.Draggable.setSlot(null);
      draggabblesContainer.appendChild(el);
    };

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

  renderBackground() {
    const el = document.createElement("img");
    el.src = this.setting.backgroundUrl;
    el.id = "background-image";
    el.onload = () => {
      this.updateSlotPositions(el);
      this.slots.forEach(s => el.parentNode.appendChild(s.el));
    };
    this.backgroundImage = el;
    return el;
  }

  renderDraggables() {
    return this.draggables.map(d => d.render());
  }
}

class Slot {
  constructor(size, position) {
    this.size = size;
    this.position = position;

    this.draggable = null;

    this.el = document.createElement("div");
    this.el.className = "slot";
    this.el.style.width = this.size + "px";
    this.el.style.height = this.size + "px";

    this.el.ondragover = this.onDragover.bind(this);
    this.el.ondrop = this.onDrop.bind(this);
    this.el.ondragenter = this.onDragEnter.bind(this);
    this.el.ondragleave = this.onDragLeave.bind(this);
  }

  setDraggable(newDraggable) {
    this.draggable = newDraggable;
  }

  setPosition({ widthRatio = 1, heightRatio = 1 }) {
    this.el.style.top = widthRatio * this.position.top - this.size / 2 + "px";
    this.el.style.left =
      heightRatio * this.position.left - this.size / 2 + "px";
  }

  render(ratios) {
    this.setPosition(ratios);
    return this.el;
  }

  onDragover(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();
    this.el.classList.remove("drag-hover");
    if (this.draggable) return; // Already occupied
    const id = event.dataTransfer.getData("dragged-id");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el.Draggable) return;
    el.Draggable.setSlot(this);
    this.el.appendChild(el);
  }

  onDragEnter() {
    this.el.classList.add("drag-hover");
  }

  onDragLeave() {
    this.el.classList.remove("drag-hover");
  }
}

class Draggable {
  constructor(options, idx) {
    this.slot = null;

    this.el = document.createElement("div");

    this.el.id = `draggable-${idx}`;
    this.el.className = "draggable";

    this.el.appendChild(this.renderContent(options));

    this.el.draggable = true;
    this.el.ondragstart = this.onDragStart.bind(this);
    this.el.ondragend = this.onDragEnd.bind(this);

    this.el.Draggable = this;
  }

  renderContent(options) {
    const { type, content } = options;
    let el;
    switch (type.split("/")[0]) {
      case "image":
        this.el.classList.add("loading");
        el = document.createElement("img");
        el.src = content;
        el.onload = () => {
          this.el.classList.remove("loading");
        };
        break;
      case "video":
        this.el.classList.add("loading");
        el = document.createElement("embed");
        el.src = content;
        el.width = 200 + "px";
        el.height = 100 + "px";
        el.onload = () => {
          this.el.classList.remove("loading");
        };
        this.el.classList.add("extra-space");
        break;
      case "text":
        el = document.createElement("p");
        el.innerHTML = content;
        break;
      default:
        el = document.createElement("p");
        el.innerHTML = "N/A";
    }
    return el;
  }

  render() {
    return this.el;
  }

  setSlot(newSlot) {
    if (this.slot) {
      // Moving out of this.slot
      this.slot.setDraggable(null);
    }
    if (newSlot) {
      // Moving into newSlot
      newSlot.setDraggable(this);
    }
    this.slot = newSlot;
  }

  onDragStart(event) {
    event.dataTransfer.setData("dragged-id", this.el.id);

    this.el.classList.add("dragging");
    this.el.classList.remove("in-slot");

    setTimeout(() => {
      // Needs to be in a timeout because otherwise element we are dragging
      // will be hidden as well
      this.el.classList.add("hide");
    }, 1);
  }

  onDragEnd() {
    this.el.classList.remove("dragging");
    if (this.slot) {
      this.el.classList.add("in-slot");
    }
    this.el.classList.remove("hide");
  }
}

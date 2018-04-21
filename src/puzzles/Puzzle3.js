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

    this.state = Object.assign(this.state, {
      answerCheck: [],
      submitted: false
    });

    this.slots = this.setting.slots.map(
      s => new Slot(s, { onChange: this.onAnswerChange.bind(this) })
    );

    this.draggables = this.setting.draggables.map(d => new Draggable(d));

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

  onSubmit() {
    if (!this.canSubmit()) return;
    const answerCheck = this.slots.map(s => s.check());
    this.setState({ answerCheck, submitted: true });
  }

  onSendAnswer() {
    if (!this.canSend()) return;
    this.sendAnswer();
  }

  onAnswerChange() {
    if (!this.canEditAnswer()) return;
    if (!this.canSubmit()) return;
    const answer = this.slots.map(s => ({
      slot: s.id,
      draggable: s.draggable ? s.draggable.id : null
    }));
    this.setState({ answer });
  }

  canEditAnswer() {
    const { answerSent } = this.state;
    return !answerSent;
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

    this.updateButtons();
  }

  updateButtons() {
    this.submitButton.disabled = !this.canSubmit();
    this.sendAnswerButton.disabled = !this.canSend();
  }

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
  constructor({ id, correctDraggable, top, left }, { onChange }) {
    this.id = id;
    this.correctDraggable = correctDraggable;
    this.position = { top, left };
    this.size = 20;

    this.onDraggableChange = onChange;

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

  check() {
    return (
      !this.correctDraggable ||
      (!!this.draggable && this.correctDraggable === this.draggable.id)
    );
  }

  setDraggable(newDraggable) {
    this.draggable = newDraggable;
    this.onDraggableChange();
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
  constructor({ id, type, content }) {
    this.id = id;
    this.type = type;
    this.content = content;

    this.slot = null;

    this.el = this.renderElement();

    this.el.draggable = true;
    this.el.ondragstart = this.onDragStart.bind(this);
    this.el.ondragend = this.onDragEnd.bind(this);

    this.el.Draggable = this;
  }

  renderElement() {
    const el = document.createElement("div");
    el.id = `draggable-${this.id}`;
    el.className = "draggable";
    el.appendChild(this.renderContent(el));
    return el;
  }

  renderContent(parentEl) {
    let el;
    switch (this.type.split("/")[0]) {
      case "image":
        parentEl.classList.add("loading");
        el = document.createElement("img");
        el.src = this.content;
        el.onload = () => {
          parentEl.classList.remove("loading");
        };
        break;
      case "video":
        parentEl.classList.add("loading");
        el = document.createElement("embed");
        el.src = this.content;
        el.width = 200 + "px";
        el.height = 100 + "px";
        el.onload = () => {
          parentEl.classList.remove("loading");
        };
        parentEl.classList.add("extra-space");
        break;
      case "text":
        el = document.createElement("p");
        parentEl.style.minWidth = 100 + "px";
        parentEl.style.padding = 4 + "px";
        el.innerText = this.content;
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

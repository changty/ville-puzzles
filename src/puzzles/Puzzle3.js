import { BasePuzzle } from "./BasePuzzle";
import { setVendorStyle } from "../lib/util";

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
    this.draggables = ["Drag me 1", "Drag me 2", "Drag me 3"].map(
      (title, idx) => new Draggable(title, idx)
    );

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
      const data = event.dataTransfer.getData("text");
      const el = document.getElementById(data);
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
  // renderBackground() {
  //   const { background } = this.setting;
  //   let el;
  //   let tempEl;
  //   switch (background.mime.split("/")[0]) {
  //     case "image":
  //       tempEl = document.createElement("img");
  //       tempEl.src = background.url;
  //       tempEl.className = "background-image";
  //       console.log(tempEl.width);
  //       console.log(tempEl.height);
  //       el = tempEl;
  //       break;
  //     default:
  //       return null;
  //   }
  //   return el;
  // }
}

class Slot {
  constructor(size, position) {
    this.size = size;
    this.position = position;

    this.el = document.createElement("div");
    this.el.className = "slot";
    this.el.style.width = this.size + "px";
    this.el.style.height = this.size + "px";

    this.el.ondragover = this.onDragover.bind(this);
    this.el.ondrop = this.onDrop.bind(this);
  }

  onDragover(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();
    if (this.draggable) return;
    const data = event.dataTransfer.getData("text");
    const el = document.getElementById(data);
    el.Draggable.setSlot(this);
    this.el.appendChild(el);
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
}

class Draggable {
  constructor(title, idx) {
    this.title = title;
    this.size = 200;

    this.slot = null;

    this.el = document.createElement("div");

    this.el.id = `draggable-${idx}`;
    this.el.className = "draggable";

    this.el.innerHTML = this.title;

    this.el.draggable = true;
    this.el.ondragstart = this.onDragStart.bind(this);
    this.el.ondragend = this.onDragEnd.bind(this);

    this.el.onmouseenter = this.onMouseEnter.bind(this);
    this.el.onmouseleave = this.onMouseLeave.bind(this);

    this.el.Draggable = this;
  }

  onMouseEnter(event) {
    this.el.classList.remove("small");
  }

  onMouseLeave(event) {
    if (this.slot) this.el.classList.add("small");
  }

  onDragStart(event) {
    event.dataTransfer.setData("text", this.el.id);

    this.el.classList.add("dragging");

    setTimeout(() => {
      // Needs to be in a timeout because otherwise element we are dragging
      // will be hidden as well
      this.el.classList.add("hide");
    }, 1);
  }

  onDragEnd(event) {
    this.el.classList.remove("dragging");

    setTimeout(() => {
      // Needs to be in a timeout, read above in onDragStart()
      this.el.classList.remove("hide");
    }, 1);
  }

  setSlot(newSlot) {
    if (this.slot) this.slot.setDraggable(null);
    if (newSlot) newSlot.setDraggable(this);
    this.slot = newSlot;
  }

  render() {
    return this.el;
  }
}

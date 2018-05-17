import { BasePuzzle } from "./BasePuzzle";
import { Clip } from "../lib/Clip";

import "./Puzzle3.css";

export class Puzzle3 extends BasePuzzle {
  constructor(data) {
    /**
     * @param {object} data
     */
    super(data);

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
    const { answer, submitted } = this.state;
    return !submitted && answer.length > 0;
  }

  canSend() {
    const { answerSent, submitted } = this.state;
    return submitted && !answerSent;
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

    const wrapper = this.renderElement("div", "wrapper", null);

    this.renderElement("div", "background", this.renderBackground(), wrapper);

    const draggabblesContainer = this.renderElement(
      "div",
      "draggables-container",
      this.renderDraggables(),
      wrapper
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
      this.locale.general["str-check-answer"]
    );
    this.submitButton.onclick = this.onSubmit.bind(this);
    this.submitButton.disabled = true;

    // Render "Lähetä"-button
    this.sendAnswerButton = this.renderElement(
      "button",
      "puzzleSend",
      this.locale.general["str-send-answer"]
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
    const id = event.dataTransfer.getData("dragged-id");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el.Draggable) return; // Dragging something else than a Draggable
    if (this.draggable) {
      // Already occupied
      this.draggable.swap(el.Draggable);
    } else {
      el.Draggable.setSlot(this);
      this.el.appendChild(el);
    }
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

    // this.el.draggable = true;

    this.el.ondragstart = this.onDragStart.bind(this);
    this.el.ondragend = this.onDragEnd.bind(this);

    this.el.Draggable = this;
  }

  render() {
    return this.el;
  }

  renderElement() {
    const el = document.createElement("div");
    el.id = `draggable-${this.id}`;
    el.className = "draggable";

    el.draggable = true;
    el.ondragstart = this.onDragStart.bind(this);
    el.ondragend = this.onDragEnd.bind(this);

    el.appendChild(this.renderContent(el));

    return el;
  }

  renderContent(parentEl) {
    switch (this.type.split("/")[0]) {
      case "text":
        return this.renderTextContent(parentEl);
      case "image":
        return this.renderImageContent(parentEl);
      case "audio":
        return this.renderAudioContent(parentEl);
      case "video":
        return this.renderVideoContent(parentEl);
      default:
        return document.createTextNode("N/A");
    }
  }

  renderImageContent(parentEl) {
    parentEl.classList.add("loading");
    const el = document.createElement("img");
    el.src = this.content;
    el.onload = () => {
      // To force recalculation of the positions of the slotsS
      window.dispatchEvent(new Event("resize"));

      parentEl.classList.remove("loading");
    };
    return el;
  }

  renderAudioContent(parentEl) {
    parentEl.classList.add("loading");

    const audio = new Clip("audio", this.type, this.content, {
      oncanplay: () => {
        // To force recalculation of the positions of the slotsS
        window.dispatchEvent(new Event("resize"));

        parentEl.classList.remove("loading");
      }
    });

    const el = audio.render();

    return el;
  }

  /*
   * Only direct URL to a video file is supported.
   * Youtube and Vimeo for example require the use of iframe to play content.
   * This can be circumvented by using a paid account. 
   * So they are not supported.
   */
  renderVideoContent(parentEl) {
    parentEl.classList.add("loading");

    const video = new Clip("video", this.type, this.content, {
      oncanplay: () => {
        // To force recalculation of the positions of the slotsS
        window.dispatchEvent(new Event("resize"));

        parentEl.classList.remove("loading");
      }
    });

    const el = video.render();

    return el;
  }

  renderTextContent(parentEl) {
    parentEl.style.minWidth = 100 + "px";
    parentEl.style.padding = 4 + "px";
    const el = document.createElement("p");
    el.innerText = this.content;
    return el;
  }

  setSlot(newSlot) {
    if (this.slot) {
      // Moving out of this.slot
      this.slot.setDraggable(null);
    }

    if (newSlot) {
      // Moving into newSlot
      newSlot.setDraggable(this);
      this.el.classList.add("in-slot");
    } else {
      // newSlot is null so we are not in a Slot
      this.el.classList.remove("in-slot");
    }

    this.slot = newSlot;
  }

  onDragStart(event) {
    event.dataTransfer.setData("dragged-id", this.el.id);

    this.el.classList.add("dragging");

    setTimeout(() => {
      // Needs to be in a timeout because otherwise element we are dragging
      // will be hidden as well
      this.el.classList.add("hide");
    }, 1);
  }

  onDragEnd() {
    this.el.classList.remove("dragging");
    this.el.classList.remove("hide");

    // To force recalculation of the positions of the slotsS
    window.dispatchEvent(new Event("resize"));
  }

  /*
   * Swap places with other Draggable
   */
  swap(other) {
    if (!(other instanceof Draggable)) return;
    const otherParent = other.el.parentNode;
    const otherSlot = other.slot;
    const thisParent = this.el.parentNode;
    const thisSlot = this.slot;

    this.setSlot(otherSlot);
    otherParent.appendChild(this.el);
    other.setSlot(thisSlot);
    thisParent.appendChild(other.el);
  }
}

window.Puzzle3 = Puzzle3;

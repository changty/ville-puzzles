import "./index.css";

import initPuzzle1 from "./initPuzzle1";
import initPuzzle2 from "./initPuzzle2";
import initPuzzle3 from "./initPuzzle3";

window.activePuzzle = initPuzzle3();

function activatePuzzle(init) {
  if (window.activePuzzle && window.activePuzzle.cleanUp)
    window.activePuzzle.cleanUp();
  window.activePuzzle = init();
}

document.querySelector("#initPuzzle1").onclick = () => {
  activatePuzzle(initPuzzle1);
};

document.querySelector("#initPuzzle2").onclick = () => {
  activatePuzzle(initPuzzle2);
};

document.querySelector("#initPuzzle3").onclick = () => {
  activatePuzzle(initPuzzle3);
};

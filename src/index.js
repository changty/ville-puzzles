import "./index.css";

import initPuzzle1 from "./initPuzzle1";
import initPuzzle2 from "./initPuzzle2";
import initPuzzle3 from "./initPuzzle3";

// initPuzzle3();

document.querySelector("#initPuzzle1").onclick = () => {
  if (window.puzzle1 && window.puzzle1.cleanUp) window.puzzle1.cleanUp();
  window.puzzle1 = initPuzzle1();
};

document.querySelector("#initPuzzle2").onclick = () => {
  if (window.puzzle2 && window.puzzle2.cleanUp) window.puzzle2.cleanUp();
  window.puzzle2 = initPuzzle2();
};

document.querySelector("#initPuzzle3").onclick = () => {
  if (window.puzzle3 && window.puzzle3.cleanUp) window.puzzle3.cleanUp();
  window.puzzle3 = initPuzzle3();
};

import "./index.css";

import initPuzzle1 from "./initPuzzle1";
import initPuzzle2 from "./initPuzzle2";
import initPuzzle3 from "./initPuzzle3";

// initPuzzle2();

document.querySelector("#initPuzzle1").onclick = () => {
  window.puzzle = initPuzzle1();
};

document.querySelector("#initPuzzle2").onclick = () => {
  window.puzzle = initPuzzle2();
};

document.querySelector("#initPuzzle3").onclick = () => {
  window.puzzle = initPuzzle3();
};

import { randomChoice } from "./lib/util";
import { Puzzle2 } from "./puzzles";

function init() {
  const puzzleSetting = {
    rows: 10,
    cols: 10,
    objects: [[1, 1, 301], [2, 5, 304], [3, 9, 302], [9, 6, 303]]
  };

  const puzzleQuestions = [
    "Kirjoita tai klikkaa missä puunkanto sijaitsee.",
    "Majavan talo sijaitsee neljä askelta sienen alapuolella ja siitä kaksi askelta oikealle. <strong>Missä rivissä ja sarakkeessa Majavan talo sijaitsee?</strong>"
  ];

  const puzzleOptions = {
    "str-question": randomChoice(puzzleQuestions)
  };

  return new Puzzle2(puzzleSetting, puzzleOptions);
}

export default init;

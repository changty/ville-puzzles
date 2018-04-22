import { randomChoice } from "./lib/util";

const Puzzle2 = window.Puzzle2;

function init() {
  const possibleSettings = [
    {
      rows: 10,
      cols: 10,
      objects: [
        [1, 1, "lake"],
        [2, 5, "mushroom"],
        [3, 9, "tree"],
        [9, 6, "treestump"]
      ],
      examples: ["Järvi (1, 1)", "Sieni (2, 5)"]
    },
    {
      rows: 10,
      cols: 10,
      objects: [
        [4, 2, "lake"],
        [3, 5, "mushroom"],
        [2, 9, "tree"],
        [9, 6, "treestump"]
      ],
      examples: ["Järvi (4, 2)", "Sieni (3, 5)"]
    }
  ];

  const puzzleSetting = randomChoice(possibleSettings);

  const puzzleInputs = ["text-or-mouse", "text-only", "mouse-only"];

  const puzzleQuestions = [
    "Missä puunkanto sijaitsee?",
    "Majavan talo sijaitsee neljä askelta sienen alapuolella ja siitä kaksi askelta oikealle. Missä rivissä ja sarakkeessa Majavan talo sijaitsee?"
  ];

  puzzleSetting.question = randomChoice(puzzleQuestions);
  puzzleSetting.input = randomChoice(puzzleInputs);

  const puzzleOptions = {};

  return new Puzzle2(puzzleSetting, puzzleOptions);
}

export default init;

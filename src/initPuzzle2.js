import { randomChoice } from "./lib/util";
import { Puzzle2 } from "./puzzles";

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
      input: "mouse", // ("mouse", "text")
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
      input: "text", // ("mouse", "text")
      examples: ["Järvi (4, 2)", "Sieni (3, 5)"]
    }
  ];

  const puzzleSetting = randomChoice(possibleSettings);

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

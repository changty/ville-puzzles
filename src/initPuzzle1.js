import { randomChoice } from "./lib/util";
import { Cipherer } from "./puzzles/Puzzle1";

const Puzzle1 = window.Puzzle1;

function init() {
  const characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";

  const possibleSettings = [
    {
      key: "+1",
      keyExample: "A → B, B → C..., Ä → Ö, Ö → A"
    },
    {
      key: "+2",
      keyExample: "A → C, B → D..., Ä → A, Ö → B"
    },
    {
      key: "-1",
      keyExample: "A → Ö, B → A..., Ä → Å, Ö → Ä"
    },
    {
      key: "-2",
      keyExample: "A → Ä, B → Ö..., Ä → Z, Ö → Å"
    }
  ];

  const puzzleSetting = randomChoice(possibleSettings);
  puzzleSetting.characterSet = characterSet;

  const possibleMessages = ["HEI MAAILMA", "JS ROKKAA", "YLIOPISTO ON PARAS"];

  const cipherer = new Cipherer(puzzleSetting.characterSet, puzzleSetting.key);
  puzzleSetting.cipherText = cipherer.cipherMessage(
    randomChoice(possibleMessages)
  );

  const puzzleOptions = {};

  return new Puzzle1(puzzleSetting, puzzleOptions);
}

export default init;

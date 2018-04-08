import { randomChoice } from "./lib/util";
import { Puzzle1, makeCipherer } from "./puzzles";

function init() {
  const characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";

  const possibleSettings = [
    {
      key: "+1",
      keyDesc: "yksi askel eteenpäin",
      keyExample: "A &#8594; B, B &#8594; C..., Ä &#8594; Ö, Ö &#8594; A"
    },
    {
      key: "+2",
      keyDesc: "kaksi askelta eteenpäin",
      keyExample: "A &#8594; C, B &#8594; D..., Ä &#8594; A, Ö &#8594; B"
    },
    {
      key: "-1",
      keyDesc: "yksi askel taaksepäin",
      keyExample: "A &#8594; Ö, B &#8594; A..., Ä &#8594; Å, Ö &#8594; Ä"
    },
    {
      key: "-2",
      keyDesc: "kaksi askelta taaksepäin",
      keyExample: "A &#8594; Ä, B &#8594; Ö..., Ä &#8594; Z, Ö &#8594; Å"
    }
  ];

  const puzzleSetting = randomChoice(possibleSettings);
  puzzleSetting.characterSet = characterSet;

  const possibleMessages = ["HEI MAAILMA", "JS ROKKAA", "YLIOPISTO ON PARAS"];

  puzzleSetting.cipherText = makeCipherer(puzzleSetting)(
    randomChoice(possibleMessages)
  );

  const puzzleOptions = {};

  return new Puzzle1(puzzleSetting, puzzleOptions);
}

export default init;

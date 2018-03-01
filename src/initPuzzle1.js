import { cipher, randomChoice } from "./lib/util";
import { Puzzle1 } from "./puzzles";

function init() {
  const basicCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";

  const possibleSettingsForPuzzle1 = [
    {
      key: "+1",
      desc: "yksi askel eteenpäin",
      example: "A &#8594; B, B &#8594; C..., Ä &#8594; Ö, Ö &#8594; A",
      characterSet: basicCharacterSet
    },
    {
      key: "+2",
      desc: "kaksi askelta eteenpäin",
      example: "A &#8594; C, B &#8594; D..., Ä &#8594; A, Ö &#8594; B",
      characterSet: basicCharacterSet
    },
    {
      key: "-1",
      desc: "yksi askel taaksepäin",
      example: "A &#8594; Ö, B &#8594; A..., Ä &#8594; Å, Ö &#8594; Ä",
      characterSet: basicCharacterSet
    },
    {
      key: "-2",
      desc: "kaksi askelta taaksepäin",
      example: "A &#8594; Ä, B &#8594; Ö..., Ä &#8594; Z, Ö &#8594; Å",
      characterSet: basicCharacterSet
    }
  ];

  const possibleMessagesForPuzzle1 = ["HEI MAAILMA"];

  const puzzleSetting = randomChoice(possibleSettingsForPuzzle1);
  const puzzleOriginalMessage = randomChoice(possibleMessagesForPuzzle1);
  const puzzleCipherMessage = cipher(puzzleOriginalMessage, puzzleSetting.key);

  new Puzzle1(puzzleCipherMessage, puzzleSetting);
}

export default init;

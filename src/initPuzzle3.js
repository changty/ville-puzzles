import { randomChoice } from "./lib/util";
import { Puzzle3 } from "./puzzles";

import finlandImg from "./static/finland-23572_1280.png";

function init() {
  const possibleSettings = [
    {
      backgroundUrl: finlandImg,
      slots: [
        { top: 620, left: 390 }, // Oulu
        { top: 1070, left: 280 }, // Tampere
        { top: 1230, left: 340 }, // Helsinki
        { top: 1190, left: 160 } // Turku
      ]
    }
  ];

  const puzzleSetting = randomChoice(possibleSettings);

  return new Puzzle3(puzzleSetting);
}

export default init;

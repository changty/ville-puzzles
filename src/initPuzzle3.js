import { randomChoice } from "./lib/util";
import { Puzzle3 } from "./puzzles";

import finlandImg from "./static/finland-23572_1280.png";

function init() {
  const possibleSettings = [
    {
      backgroundUrl: finlandImg,
      slots: [
        { id: 1, correctDraggable: 1, top: 620, left: 390 }, // Oulu
        { id: 2, correctDraggable: 2, top: 1070, left: 280 }, // Tampere
        { id: 3, correctDraggable: 3, top: 1230, left: 340 }, // Helsinki
        { id: 4, correctDraggable: 5, top: 1190, left: 160 } // Turku
      ],
      draggables: [
        {
          id: 1,
          type: "image/png",
          content: "https://picsum.photos/200/100/?random"
        },
        {
          id: 2,

          type: "image/png",
          content: "https://picsum.photos/200/200/?random"
        },
        {
          id: 3,

          type: "image/png",
          content: "https://picsum.photos/100/100/?random"
        },
        // {
        //   id: 4,
        //   type: "video/youtube",
        //   content: "https://www.youtube.com/embed/tgbNymZ7vqY"
        // },
        { id: 5, type: "text/plain", content: "Drag me 1" },
        { id: 6, type: "text/plain", content: "Drag me 2" },
        { id: 7, type: "text/plain", content: "Drag me 3 very long text" }
      ]
    }
  ];

  const puzzleSetting = randomChoice(possibleSettings);

  return new Puzzle3(puzzleSetting);
}

export default init;

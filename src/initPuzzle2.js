import { Puzzle2 } from "./puzzles";

const testSetting = {
  rows: 10,
  cols: 10,
  objects: [[1, 1, 301], [2, 5, 304], [3, 9, 302], [9, 6, 303]]
};

function init() {
  return new Puzzle2(testSetting);
}

export default init;

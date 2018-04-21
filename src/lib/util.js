export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export function setVendorStyle(element, property, value) {
  const prop = capitalize(property);
  element.style["webkit" + prop] = value;
  element.style["moz" + prop] = value;
  element.style["ms" + prop] = value;
  element.style["o" + prop] = value;
}

export function indexToRowCol(numOfCols, idx) {
  return {
    col: Math.floor(idx % numOfCols),
    row: Math.floor(idx / numOfCols)
  };
}

export function rowColToIndex(numOfCols, row, col) {
  return row * numOfCols + col;
}

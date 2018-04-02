export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function cipher(settings, message) {
  const { characterSet, key } = settings;
  const keys = /([+-])(\d+)/g.exec(key);
  const factor = keys[1] === "-" ? -parseInt(keys[2]) : parseInt(keys[2]);

  return message
    .toUpperCase()
    .split("")
    .map(c => {
      if (characterSet.indexOf(c) === -1) return c;
      let idx = characterSet.indexOf(c) + factor;
      if (idx < 0) idx += characterSet.length;
      else if (idx > characterSet.length - 1) idx -= characterSet.length;
      return characterSet[idx];
    })
    .join("");
}

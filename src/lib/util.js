export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function cipher(message, key) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
  const keys = /([+-])(\d+)/g.exec(key);
  const factor = keys[1] === "-" ? -parseInt(keys[2]) : parseInt(keys[2]);

  return message
    .toUpperCase()
    .split("")
    .map(c => {
      if (characters.indexOf(c) === -1) return c;
      let idx = characters.indexOf(c) + factor;
      if (idx < 0) idx += characters.length;
      else if (idx > characters.length - 1) idx -= characters.length;
      return characters[idx];
    })
    .join("");
}

const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '..', 'src', 'style.css');
const txt = fs.readFileSync(file, 'utf8');
const lines = txt.split(/\r?\n/);
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let ch of line) {
    if (ch === '{') depth++;
    else if (ch === '}') depth--;
  }
  if (i+1 >= 9400 && i+1 <= 9460) {
    console.log(`${i+1}: depth=${depth} | ${line.trim()}`);
  }
}
console.log('final depth:', depth);

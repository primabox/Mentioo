const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../src/style.css');
const txt = fs.readFileSync(file, 'utf8');
let depth = 0;
for (let i=0;i<txt.length;i++){
  const ch = txt[i];
  if (ch === '{') depth++;
  if (ch === '}') depth--;
  if (depth < 0) {
    const before = txt.slice(Math.max(0,i-80), i+80);
    console.log('Extra closing } at pos', i);
    console.log(before);
    process.exit(2);
  }
}
if (depth !== 0) {
  console.log('Unbalanced braces: depth=', depth);
  // print last 300 chars
  console.log(txt.slice(txt.length-500));
  process.exit(1);
}
console.log('Braces balanced.');
process.exit(0);

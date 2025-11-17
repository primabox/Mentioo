const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'src', 'style.css');
const txt = fs.readFileSync(file, 'utf8');

const lines = txt.split(/\r?\n/);

let openCount = 0;
let firstNegativeLine = null;
const mediaStarts = [];
const mediaRegex = /@media\s*\(max-width:\s*768px\)\s*{/i;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // detect media starts
  if (mediaRegex.test(line)) {
    mediaStarts.push({line: i+1});
  }
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '{') openCount++;
    else if (ch === '}') openCount--;
    if (openCount < 0 && firstNegativeLine === null) firstNegativeLine = i+1;
  }
}

console.log('Total { count minus } count =', openCount);
if (firstNegativeLine) console.log('First point where closing exceeds opening at line', firstNegativeLine);
if (mediaStarts.length) {
  console.log('Found', mediaStarts.length, '@media (max-width: 768px) starts — sample:', mediaStarts.slice(0,5));
}

if (openCount === 0) console.log('Braces appear balanced overall.');
else console.log('Braces imbalance detected.');

process.exit(openCount === 0 ? 0 : 1);

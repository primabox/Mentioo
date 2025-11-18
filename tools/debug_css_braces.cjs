const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'src', 'style.css');
const txt = fs.readFileSync(file, 'utf8');
const lines = txt.split(/\r?\n/);

let openCount = 0;
let issues = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '{') {
      // log when a selector opens and current openCount is 0 (top-level) for context
      if (openCount === 0) {
        issues.push({type: 'open-at-top', line: i+1, snippet: lines.slice(Math.max(0,i-2), i+3).join('\n')});
      }
      openCount++;
    } else if (ch === '}') {
      openCount--;
      if (openCount < 0) {
        issues.push({type: 'extra-close', line: i+1});
        openCount = 0;
      }
    }
  }
}

console.log('Total openCount final:', openCount);
if (issues.length === 0) console.log('No selector-open-at-top issues detected.');
else {
  console.log('Detected selector opens at top-level (sample up to 20):');
  console.log(issues.slice(0,20));
}
process.exit(0);

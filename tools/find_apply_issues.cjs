const fs=require('fs');
const p='c:/Users/roman/Desktop/mentioo/Mentioo/src/style.css';
const s=fs.readFileSync(p,'utf8').split('\n');
for(let i=0;i<s.length;i++){
  const line=s[i];
  if(line.includes('@apply')){
    const trimmed=line.trim();
    if(!trimmed.endsWith(';')){
      console.log('No semicolon at line', i+1,':', line);
      console.log('Context:', s.slice(Math.max(0,i-2), i+3).join('\n'));
    }
  }
}
console.log('done');

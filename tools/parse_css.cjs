const fs = require('fs');
try{
  const postcss = require('postcss');
  const css = fs.readFileSync('src/style.css','utf8');
  const root = postcss.parse(css, { from: 'src/style.css' });
  console.log('Parsed OK. Nodes:', root.nodes.length);
}catch(e){
  console.error('Parse error:', e.message);
  if(e.name && e.reason){
    console.error(e.name, e.reason);
  }
  console.error(e);
  process.exit(1);
}

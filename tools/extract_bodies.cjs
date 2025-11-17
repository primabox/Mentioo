const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outFile = path.join(root, 'all-bodies.html');

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let body = bodyMatch[1];
  body = body.replace(/<header[\s\S]*?<\/header>/i, '');
  body = body.replace(/<footer[\s\S]*?<\/footer>/i, '');
  return body.trim();
}

function isTopLevelHtml(file) {
  return fs.statSync(file).isFile() && file.endsWith('.html');
}

const files = fs.readdirSync(root)
  .map(f => path.join(root, f))
  .filter(isTopLevelHtml)
  .sort();

let out = [];
out.push('<!doctype html>');
out.push('<html lang="cs">');
out.push('<head>');
out.push('  <meta charset="utf-8">');
out.push('  <meta name="viewport" content="width=device-width, initial-scale=1">');
out.push('  <title>All Bodies</title>');
out.push('  <link rel="stylesheet" href="src/style.css">');
out.push('</head>');
out.push('<body>');
out.push('<h1>Aggregated bodies of HTML files</h1>');

files.forEach(file => {
  try {
    const name = path.basename(file);
    const html = fs.readFileSync(file, 'utf8');
    const body = extractBody(html);
    out.push(`<!-- START: ${name} -->`);
    out.push(`<section data-source="${name}" style="padding:32px;border-top:1px solid #eee;">`);
    out.push(`<h2 style="font-family: Poppins, sans-serif;">${name}</h2>`);
    out.push(body || `<p>(no body found in ${name})</p>`);
    out.push('</section>');
    out.push(`<!-- END: ${name} -->`);
  } catch (err) {
    console.error('Error processing', file, err);
  }
});

out.push('</body>');
out.push('</html>');

fs.writeFileSync(outFile, out.join('\n'), 'utf8');
console.log('Wrote', outFile);
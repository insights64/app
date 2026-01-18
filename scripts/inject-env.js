const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
const apiUrl = process.env.API_URL || 'http://localhost:8080';

console.log(`Injecting API_URL: ${apiUrl}`);

let content = fs.readFileSync(indexPath, 'utf8');
content = content.replace(/__API_URL__/g, apiUrl);
fs.writeFileSync(indexPath, content, 'utf8');

console.log('Environment variables injected successfully');

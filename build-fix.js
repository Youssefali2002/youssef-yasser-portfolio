const fs = require('fs');
const path = require('path');

// Read the original index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace paths for production
html = html
  .replace(/\.\/dist\//g, '')
  .replace(/\.\/logo_youssef\.jpg/g, 'logo_youssef.jpg')
  .replace(/\.\/WILDFLOWER\.mp3/g, 'WILDFLOWER.mp3')
  .replace(/\.\/All-project\//g, 'All-project/')
  .replace(/\.\/assets\//g, 'assets/')
  .replace(/\.\/img\//g, 'img/')
  .replace(/\.\/Youssef_Yasser_FrontEnd_CV\.pdf/g, 'Youssef_Yasser_FrontEnd_CV.pdf')
  .replace(/src="\.\/src\/main\.js"/g, 'src="main.min.js"')
  .replace(/src="\.\/src\/main\.optimized\.min\.js"/g, '');

// Write the production version
fs.writeFileSync('dist/index.html', html);

console.log('Production index.html created successfully!');

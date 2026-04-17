const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Copy folders recursively
function copyFolderRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyFolderRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy necessary folders and files
console.log('Copying assets...');
copyFolderRecursiveSync('assets', 'dist/assets');
copyFolderRecursiveSync('img', 'dist/img');
copyFolderRecursiveSync('All-project', 'dist/All-project');
fs.copyFileSync('logo_youssef.jpg', 'dist/logo_youssef.jpg');
fs.copyFileSync('WILDFLOWER.mp3', 'dist/WILDFLOWER.mp3');
fs.copyFileSync('Youssef_Yasser_FrontEnd_CV.pdf', 'dist/Youssef_Yasser_FrontEnd_CV.pdf');

console.log('Assets copied successfully!');

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

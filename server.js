const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  let filePath = '.' + req.url.split('?')[0];

  // Root → serve the store
  if (filePath === './' || filePath === '.') {
    filePath = './index.html';
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h2>404 – File not found</h2><a href="/">Go to Store</a>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log('✅ ShopLab live on port', PORT);
});

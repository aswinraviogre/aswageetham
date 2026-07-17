const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROUTE = '/ajay-and-aparna-wedding-invitation';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.aac': 'audio/aac',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url;
  
  // Normalize route: if it starts with the routing path, strip it to serve from root
  if (reqUrl.startsWith(ROUTE)) {
    reqUrl = reqUrl.substring(ROUTE.length);
  }
  if (reqUrl === '' || reqUrl === '/') {
    reqUrl = '/index.html';
  }
  
  // Strip query parameters or hashes from request URL for local file mapping
  reqUrl = reqUrl.split('?')[0].split('#')[0];
  
  // Resolve local file path relative to __dirname
  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found', 'utf-8');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at:`);
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}${ROUTE}/`);
});

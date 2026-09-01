/**
 * Laxmi Surbhi NGO - Node.js Local HTTP Server
 * Serves static pages and assets with proper MIME types and security headers.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Parse URL and normalize path
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  // Prevent directory traversal attacks
  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // If path doesn't have an extension, try appending .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Not Found response
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>404 - Page Not Found | Laxmi Surbhi NGO</title>
          <link rel="stylesheet" href="/css/main.css">
          <link rel="stylesheet" href="/css/components.css">
        </head>
        <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; text-align:center; padding:2rem;">
          <div style="max-width:540px; background:#fff; padding:3rem 2rem; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.08); border:1px solid #eadbce;">
            <div style="font-size:3.5rem; color:#c59b3f; font-weight:800; font-family:'Cinzel', serif;">404</div>
            <h1 style="color:#0d281e; font-size:1.6rem; margin:1rem 0;">Page Not Found</h1>
            <p style="color:#56635d; margin-bottom:2rem;">The page you are looking for does not exist or has been moved.</p>
            <a href="/" class="btn btn-gold" style="text-decoration:none; padding:0.75rem 1.5rem; border-radius:999px; font-weight:700; color:#0d281e; background:#c59b3f;">Return to Homepage</a>
          </div>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Laxmi Surbhi NGO Website Server is running!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Environment: Node.js ${process.version}`);
  console.log(`=======================================================`);
});

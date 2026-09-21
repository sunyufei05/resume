// 最简静态文件服务器（用于本地预览简历）
// 用法：node preview-server.js [port]   默认 8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.argv[2] || process.env.PORT || '8080', 10);
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.md':   'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);

  // 防止跳出 ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
      return res.end('404 Not Found: ' + urlPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream'});
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  简历预览已启动: http://127.0.0.1:${PORT}\n  按 Ctrl+C 停止\n`);
});
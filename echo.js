const http = require('http');
let requests = [];

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const request = {
        headers: req.headers,
        body: body
      };
      requests.unshift(request);
      res.end('Request received');
    });
  }

  if (req.url === '/requests' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<html><body>`);
    res.write(`<h1>Incoming Requests:</h1>`);
    requests.forEach(request => {
      res.write(`<h2>Request:</h2>`);
      res.write(`<p>Headers: ${JSON.stringify(request.headers)}</p>`);
      res.write(`<p>Body: ${request.body}</p>`);
    });
    res.write(`</body></html>`);
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
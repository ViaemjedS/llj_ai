// server.js - 原生 Node.js 版本 common.js
const http = require('http');

const server = http.createServer((req, res) => {
  // 匹配 GET 请求 /say
  // 检查请求路径是否以 '/say' 开头
  if (req.url.startsWith('/say')) {
    // 解析查询参数（简单处理）
    console.log(req.headers.host);
    console.log(req.url)
    const url = new URL(req.url, `http://${req.headers.host}`);
    const wd = url.searchParams.get('wd');
    const callback = url.searchParams.get('callback');
    console.log(url);
    console.log(wd);      // Iloveyou
    console.log(callback); // show

    // 返回 JSONP 格式响应
    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
    const data = {
      code: 0,
      msg: '我不爱你',

    }
    res.end(`${callback}(${JSON.stringify(data)})`);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
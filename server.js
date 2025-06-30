const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Welcome to basic todo app server");
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listing port 5000");
});

const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);
  // res.end("Welcome to basic todo app server");

  if (req.url === "/todos" && req.method === "GET") {
    res.end("All ToDos");
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("ToDo Created");
  } else {
    res.end("404------>Route Not Found!!!!!!!!");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listing port 5000");
});

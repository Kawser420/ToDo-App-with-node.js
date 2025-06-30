const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  // GET All ToDos
  if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(data);
  }
  // POST a Todo
  else if (req.url === "/todos/create-todo" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });
    req.on("end", () => {
      const { id, title, description, completed, priority, tags } =
        JSON.parse(data);

      const dueDate = new Date().toLocaleString();
      const allToDos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allToDos);
      console.log(allToDos);

      parseAllTodos.push({
        id,
        title,
        description,
        completed,
        dueDate,
        priority,
        tags,
      });

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });
      res.end(
        JSON.stringify(
          {
            id,
            title,
            description,
            completed,
            dueDate,
            priority,
            tags,
          },
          null,
          2
        )
      );
    });
  } else {
    res.end("Route Not Found!");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listing port 5000");
});

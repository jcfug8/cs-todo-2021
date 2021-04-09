const server = require("./server.js");
const persist = require("./persist");

const port = process.argv[2];

persist.onConnect(() => {
  server.listen(port, () => {
    console.log(`Code School 2021 Todo App Running on Port ${port}`);
  });
});

persist.connect("127.0.0.1", "cs-todo-2021");

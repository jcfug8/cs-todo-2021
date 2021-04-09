const express = require("express");
const server = express();

const Todo = require("./model");

server.use(express.json({}));

server.use(express.static(`${__dirname}/public/`));

server.get("/todo/:id", (req, res) => {
  console.log(req.body);
  res.send(`get request recieved for todo with id ${req.params.id}`);
});

server.get("/todo", (req, res) => {
  console.log(req.body);
  res.send(`get request recieved to list todos`);
});

server.post("/todo", (req, res) => {
  console.log(req.body);
  Todo.create(
    {
      name: "name",
      description: "description",
      done: false,
      deadline: new Date(),
    },
    function (err, todo) {
      if (err) {
        res.status(500).send(`post request created todo`);
        return;
      }
      // saved!
      res.status(201).send(`post request created todo`);
    }
  );
});

server.put("/todo/:id", (req, res) => {
  console.log(req.body);
  res.send(`put request recieved to replace todo with id ${req.params.id}`);
});

server.patch("/todo/:id", (req, res) => {
  console.log(req.body);
  res.send(`patch request recieved to update todo with id ${req.params.id}`);
});

module.exports = server;

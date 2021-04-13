const express = require("express");
const server = express();

const Todo = require("./model");

server.use(express.json({}));

server.use(express.static(`${__dirname}/public/`));

server.get("/todo/:id", (req, res) => {
  console.log(req.body);
  Todo.findById(req.body.id, function (err, todo) {
    res.setHeader("Content-Type", "application/json");
    if (err) {
      res.status(500).send({
        message: `post request failed to replace todo: ${err}`,
        error: err,
      });
      return;
    }
    // saved!
    res.status(201).json(todo);
  });
});

server.get("/todo", (req, res) => {
  console.log(req.body);
  res.send(`get request recieved to list todos`);
});

server.post("/todo", (req, res) => {
  console.log(req.body);
  Todo.create(
    {
      name: req.body.name || "",
      description: req.body.description || "",
      done: false,
      deadline: new Date(),
    },
    function (err, todo) {
      res.setHeader("Content-Type", "application/json");
      if (err) {
        res.status(500).send({
          message: `post request failed to create todo: ${err}`,
          error: err,
        });
        return;
      }
      // saved!
      res.status(201).json(todo);
    }
  );
});

server.put("/todo/:id", (req, res) => {
  console.log(req.body);
  Todo.updateOne(
    { _id: req.body.id },
    {
      $set: {
        name: req.body.name || "",
        description: req.body.description || "",
        done: false,
        deadline: new Date(),
      },
    },
    function (err, todo) {
      res.setHeader("Content-Type", "application/json");
      if (err) {
        res.status(500).send({
          message: `post request failed to replace todo: ${err}`,
          error: err,
        });
        return;
      }
      // saved!
      res.status(201).json(todo);
    }
  );
});

server.patch("/todo/:id", (req, res) => {
  console.log(req.body);
  res.send(`patch request recieved to update todo with id ${req.params.id}`);
});

module.exports = server;

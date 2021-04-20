const express = require("express");
const { update } = require("./model");
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
  Todo.find({}, function (err, todos) {
    res.setHeader("Content-Type", "application/json");
    if (err) {
      res.status(500).send({
        message: `get request failed to list all todos: ${err}`,
        error: err,
      });
      return;
    }
    // saved!
    res.status(200).json(todos);
  });
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
  console.log(`replacing - ${req.body.id}:`, req.body);
  Todo.updateOne(
    { _id: req.params.id },
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
      // updated!
      res.status(200).json(todo);
    }
  );
});

server.patch("/todo/:id", (req, res) => {
  console.log(`patching body - ${req.params.id}:`, req.body);
  updateTodo = {};
  if (req.body.name) {
    updateTodo.name = req.body.name;
  }
  if (req.body.description) {
    updateTodo.description = req.body.description;
  }
  if (req.body.done) {
    updateTodo.done = req.body.done;
  }
  if (req.body.deadline) {
    updateTodo.deadline = req.body.deadline;
  }
  console.log(`patching data - ${req.params.id}:`, updateTodo);
  Todo.updateOne(
    { _id: req.params.id },
    {
      $set: updateTodo,
    },
    function (err, todo) {
      res.setHeader("Content-Type", "application/json");
      if (err) {
        res.status(500).send({
          message: `patch request failed to replace todo: ${err}`,
          error: err,
        });
        return;
      }
      // updated!
      res.status(200).json(todo);
    }
  );
});

module.exports = server;

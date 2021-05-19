const express = require("express");
const cors = require("cors");
const { update } = require("./model");
const server = express();

const Todo = require("./model");

let demoLogger = (req, res, next) => {
  //middleware function
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  let log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  console.log(log);
  fs.appendFile("request_logs.txt", log + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

server.use(demoLogger);

server.use(cors);
server.use(express.json({}));

server.use(express.static(`${__dirname}/public/`));

// this handler is what is used to get a single todo from the database
server.get("/todo/:id", (req, res) => {
  console.log(`request to get a single todo with id ${req.params}`);
  Todo.findById(req.params.id, function (err, todo) {
    res.setHeader("Content-Type", "application/json");
    if (err) {
      res.status(500).send({
        message: `post request failed to get todo`,
        id: req.params.id,
        error: err,
      });
      return;
    }
    res.status(200).json(todo);
  });
});

// this handler is what is used to get all todos
server.get("/todo", (req, res) => {
  console.log(`request to get a all todos`);
  Todo.find({}, function (err, todos) {
    res.setHeader("Content-Type", "application/json");
    if (err) {
      res.status(500).send({
        message: `get request failed to list all todos`,
        error: err,
      });
      return;
    }
    res.status(200).json(todos);
  });
});

// this handler is what is used to insert a todo
server.post("/todo", (req, res) => {
  console.log(`request to insert a todo: `, req.body);
  let deadline;
  if (req.body.deadline) {
    try {
      deadline = new Date(req.body.deadline);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: `unable to parse deadline`,
        error: err,
      });
      return;
    }
  }
  Todo.create(
    {
      name: req.body.name || "",
      description: req.body.description || "",
      done: req.body.done || false,
      deadline: deadline || new Date(),
    },
    function (err, todo) {
      res.setHeader("Content-Type", "application/json");
      if (err) {
        res.status(500).send({
          message: `post request failed to create todo`,
          error: err,
        });
        return;
      }
      res.status(201).json(todo);
    }
  );
});

// this handler is what is used to completely replace a todo
server.put("/todo/:id", (req, res) => {
  console.log(
    `request to replace a to with the id of ${req.params.id}: `,
    req.body
  );
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
          message: `post request failed to replace todo`,
          id: req.params.id,
          error: err,
        });
        return;
      }
      res.status(200).json(todo);
    }
  );
});

// this handler is what is used to update a todo
server.patch("/todo/:id", (req, res) => {
  console.log(`request to patch a todo with id ${req.params.id}: `, req.body);
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
          message: `patch request failed to replace todo`,
          id: req.params.id,
          error: err,
        });
        return;
      }
      res.status(200).json(todo);
    }
  );
});

// this handler is what is used to delete a single todo from the database
server.delete("/todo/:id", (req, res) => {
  console.log(`request to delete a single todo with id ${req.params}`);
  Todo.findByIdAndDelete(req.params.id, function (err, todo) {
    res.setHeader("Content-Type", "application/json");
    if (err) {
      res.status(500).send({
        message: `post request failed to delete todo`,
        id: req.params.id,
        error: err,
      });
      return;
    }
    res.status(200).json(todo);
  });
});

module.exports = server;

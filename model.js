const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: String,
  description: String,
  done: Boolean,
  deadline: Date,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

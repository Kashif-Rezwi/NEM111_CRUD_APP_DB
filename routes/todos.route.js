const express = require("express");
const { TodoModel } = require("../model/todo.model");

const todoRouter = express.Router();

// get request with query
todoRouter.get("/", async (req, res) => {
  const { authorID } = req.body;
  const Query = req.query;
  try {
    const todos = await TodoModel.find({
      $and: [{ authorID: authorID }, Query],
    });
    res.send(todos);
    console.log("Todos get request with query has been made successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// get request with params
todoRouter.get("/:id", async (req, res) => {
  const { authorID } = req.body;
  const { id } = req.params;
  try {
    const todo = await TodoModel.find({ _id: id, authorID: authorID });
    res.send(todo);
    console.log("Todos get request with params has been made successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// post request
todoRouter.post("/create", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const todo = new TodoModel(payload);
    await todo.save();
    res.send(todo);
    console.log("Todo has been created successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// patch request
todoRouter.patch("/update/:id", async (req, res) => {
  const { authorID } = req.body;
  const { id } = req.params;
  const payload = req.body;
  try {
    const todo = await TodoModel.find({ _id: id, authorID: authorID });
    if (todo.length > 0) {
      await TodoModel.findByIdAndUpdate({ _id: id }, payload);
      const updated = await TodoModel.find({ _id: id });
      res.send(updated);
      console.log("Todo updated successfully.");
    } else {
      res.send(`No todo with this id:${id}.`);
      console.log(`No todo with this id:${id}.`);
    }
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// delete request
todoRouter.delete("/delete/:id", async (req, res) => {
  const { authorID } = req.body;
  const { id } = req.params;
  try {
    const todo = await TodoModel.find({ _id: id, authorID: authorID });
    if (todo.length > 0) {
      await TodoModel.findByIdAndDelete({ _id: id });
      res.send(todo);
      console.log("Todo deleted successfully.");
    } else {
      res.send(`No todo with this id:${id}.`);
      console.log(`No todo with this id:${id}.`);
    }
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = { todoRouter };

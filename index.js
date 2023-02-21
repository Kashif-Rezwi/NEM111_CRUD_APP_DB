const express = require("express");
const { connection } = require("./config/db");
const { todoRouter } = require("./routes/todos.route");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
const { usersRouter } = require("./routes/users.route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wellcome to todoDb.");
});

app.use("/users", usersRouter);

app.use(auth);

app.use("/todos", todoRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongodb.");
  } catch (err) {
    console.log(err.message);
  }
});

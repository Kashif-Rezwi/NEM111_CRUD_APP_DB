const express = require("express");
const { RegisterModel } = require("../model/register.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: err.message });
      } else {
        const user = new RegisterModel({ name, email, password: hash });
        await user.save();
        res.send(
          "Registration has been done, user account created succesfully."
        );
      }
    });
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.find({ email: email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ authorID: user[0]._id }, "masaischool");
          res.send({ msg: "User login successfully.", token: token });
          console.log("User login successfully");
        } else {
          res.send({ msg: "Wrong Credentials." });
          console.log("Wrong Credentials.");
        }
      });
    } else {
      res.send({ msg: "Wrong Credentials." });
      console.log("Wrong Credentials.");
    }
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = { usersRouter };

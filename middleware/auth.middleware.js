const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masaischool", (err, decoded) => {
      if (decoded) {
        req.body.authorID = decoded.authorID;
        next();
      } else {
        res.send({ msg: err.message });
        console.log("Please login first.");
      }
    });
  } else {
    res.send({ msg: "Please login first." });
    console.log("Please login first.");
  }
};

module.exports = { auth };

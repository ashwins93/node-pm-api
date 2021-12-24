const express = require("express");
const router = express.Router();
const usersService = require("../services/users-service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await usersService.createUser(req.body);

    res.send(user);
  } catch (err) {
    if (err.errno === 19) {
      res.status(400).send({
        message: "Username already exists",
      });
    } else {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  const user = await usersService.loginUser(
    req.body.username,
    req.body.password
  );

  if (user) {
    req.session.user = user;
    res.send({ message: "Logged in successfully" });
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
});

router.post("/token", async (req, res) => {
  const user = await usersService.loginUser(
    req.body.username,
    req.body.password
  );

  if (user) {
    const token = jwt.sign(
      { userId: user.id },
      "56F7CCA4F78172A16E156B28A4E4F",
      { expiresIn: "1d" }
    );

    res.send({ message: "Logged in successfully", token });
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
});

module.exports = router;

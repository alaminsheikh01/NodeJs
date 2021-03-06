const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

/**
 * save user data from user model
 */

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * User login.
 */

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * user logout
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * find all user
 */

router.get("/users", async (req, res) => {
  await User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => res.status(400).send(e));
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
/**
 * find single user data
 */

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  await User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => res.status(500).send(e));
});

/**
 * update the user info
 */

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * delete the user info.
 */

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User already deleted" });
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

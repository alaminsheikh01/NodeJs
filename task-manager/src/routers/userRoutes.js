const express = require("express");
const User = require("../models/user");
const router = new express.Router();

/**
 * save user data from user model
 */

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

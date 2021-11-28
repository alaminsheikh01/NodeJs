const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());

const router = new express.Router();
router.get("/test", (req, res) => {
  res.send("this is a new router");
});
app.use(router);

/**
 * save user data from user model
 */

app.post("/users", async (req, res) => {
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
app.get("/users", async (req, res) => {
  await User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => res.status(400).send(e));
});

/**
 * find single user data
 */

app.get("/users/:id", async (req, res) => {
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
app.patch("/users/:id", async (req, res) => {
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

app.delete("/users/:id", async (req, res) => {
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

/**
 * save task data from task model
 */

app.post("/task", async (req, res) => {
  const task = new Task(req.body);
  await task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

/**
 * shows all tasks
 */
app.get("/tasks", async (req, res) => {
  await Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => res.status(500).send(e));
});

/**
 * find task by id
 */

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  await Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => res.status(500).send(e));
});

/**
 * update the task info
 */

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * delete task info
 */

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ message: "task already deleted" });
    }
    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());

/**
 * save user data from user model
 */

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
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
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => res.status(400).send(e));
});

/**
 * find single user data
 */

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => res.status(500).send(e));
});

/**
 * save task data from task model
 */

app.post("/task", (req, res) => {
  const task = new Task(req.body);
  task
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
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => res.status(500).send(e));
});

/**
 * find task by id
 */

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => res.status(500).send(e));
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

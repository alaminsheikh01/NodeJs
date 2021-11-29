const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

/**
 * save task data from task model
 */

router.post("/task", async (req, res) => {
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
router.get("/tasks", async (req, res) => {
  await Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => res.status(500).send(e));
});

/**
 * find task by id
 */

router.get("/tasks/:id", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const task = await Task.findById(req.params.id);

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

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

router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;

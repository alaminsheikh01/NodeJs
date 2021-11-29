const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/userRoutes");
const taskRouter = require("./routers/taskRoutes");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
/**
 * router define
 */
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

const jwt = require("jsonwebtoken");

const myFunc = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisisnewcourse", {
    expiresIn: "1 seconds",
  });
  console.log(token);

  const data = jwt.verify(token, "thisisnewcourse");
  console.log(data);
};
myFunc();

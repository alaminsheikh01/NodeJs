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

const bcrypt = require("bcryptjs");

const myFunc = async () => {
  const password = "123654";
  const hashPassword = await bcrypt.hash(password, 10);

  console.log(password);
  console.log(hashPassword);

  const isMatch = await bcrypt.compare(password, hashPassword);
  console.log(isMatch);
};
myFunc();

const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/userRoutes");
const taskRouter = require("./routers/taskRoutes");

const app = express();
const port = process.env.PORT || 2000;

/**
 * custom middleware
 */

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disable");
//   } else {
//     next();
//   }
// });

/**
 * for this line whole api routes will donw
 */
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. check back soon");
// });

app.use(express.json());
/**
 * router define
 */
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

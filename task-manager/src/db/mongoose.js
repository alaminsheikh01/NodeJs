const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test:test@demo.erwyk.mongodb.net/TestData?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

/**
 * Make a simple schema for store data
 */

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// /**
//  * initial data
//  */

// const me = new User({
//   name: "Alamin",
//   age: 22,
// });

// /**
//  * save data in the database
//  */

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error! ", error);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
  },
  completed: {
    type: String,
  },
});

const task = new Task({
  description: "Learn the Mongoose library",
  completed: false,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

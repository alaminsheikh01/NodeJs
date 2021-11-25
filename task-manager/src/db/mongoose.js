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
    required: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive value");
      }
    },
  },
});

const task = new Task({
  description: "Learn the Mongoose library",
  age: 22,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

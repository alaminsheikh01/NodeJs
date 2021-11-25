const mongoose = require("mongoose");
const validator = require("validator");

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
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive value");
      }
    },
  },
});

const task = new Task({
  name: "     Alamin Sheikh",
  email: "alamin@gmail.com",
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

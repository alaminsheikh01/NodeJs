const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test:test@demo.erwyk.mongodb.net/TestData?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// const task = new Task({
//   name: "Alamin Sheikh",
//   email: "alamin@gmail.com",
// });

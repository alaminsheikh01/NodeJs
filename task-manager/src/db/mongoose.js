const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test:test@demo.erwyk.mongodb.net/TestData?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({
  name: "Alamin",
  age: 22,
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error! ", error);
  });

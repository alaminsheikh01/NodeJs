const fs = require("fs");

/**
 * if I run this code then created a new file which is called notes.txt,
 * if I updated this line then notes.txt file will updated automatically
 */

fs.writeFileSync("notes.txt", "This file was created by node.js updated!");

/**
 * Append a message to notes.txt
 *
 * 1. Use AppendFileSync to append to the file
 * 2. Run the script
 * 3. Check your work by opening the file and viewing the appened text
 */

fs.appendFileSync("notes.txt", "  \nThis is a append file");

/**
 * Read the file
 * Importing own files.
 */
// const firstName = require("./utils.js");
const add = require("./utils.js");

const sum = add(4, 5);
//console.log(sum);
// console.log(firstName);

/**
 * Define and use a function in a new file
 *
 * 1. Create a new file called notes.js
 * 2. Create getNotes function that returns "Your notes..."
 * 3. Export getNotes function
 * 4. From app.js, load in and call the function printing message to console
 *
 */

const getNotes = require("./notes.js");

const message = getNotes();

//console.log(message);

/**
 * used npm package modules
 */

const validator = require("validator");

console.log(validator.isEmail("alamin@gmail.com"));

/**
 * Use the calk library in your project
 *
 * 1. install chalk
 * 2. load chalk into app.js
 * 3. Use it to print the string "Success!" to the console in green
 * 4. test your work
 */
const chalk = require("chalk");

console.log(chalk.green.bold.italic.underline.inverse("Success!!"));
// console.log(process.argv);
// console.log(process.argv[1]);

const command = process.argv[2];

// if (command === "add") {
//   console.log("adding a notes!");
// } else if (command === "remove") {
//   console.log("remove a notes");
// }

/**
 * learn about yargs
 */

const yargs = require("yargs");

// yargs.version("1.1.0");

//console.log(process.argv);
//console.log(yargs.argv);

/**
 * Create add command
 */
yargs.command({
  command: "add",
  describe: "Add a new note",
  handler: function () {
    console.log("Adding a new note");
  },
});

console.log(yargs.argv);

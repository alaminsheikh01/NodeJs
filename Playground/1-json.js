const fs = require("fs");

const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
};

const bookJSON = JSON.stringify(book);
console.log(bookJSON);
//{"title":"Ego is the Enemy","author":"Ryan Holiday"}

const parseData = JSON.parse(bookJSON);

//console.log(parseData.title);
//Ego is the Enemy

/**
 * create a new file called 1-json.json and save the data to this file.
 */
fs.writeFileSync("1-json.json", bookJSON);

/**
 * read file data from 1-json.json file
 */
const dataBuffer = fs.readFileSync("1-json.json");
const dataJson = dataBuffer.toString();
const getData = JSON.parse(dataJson);
// console.log(getData.title);
// console.log(getData);

const user = JSON.parse(dataJson);

user.title = "this is new title updated";

const userJSON = JSON.stringify(user);
fs.writeFileSync("1-json.json", userJSON);

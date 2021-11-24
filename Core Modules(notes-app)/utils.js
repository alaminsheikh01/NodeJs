console.log("Read utils.js file (Default run this line)");

const name = "Alamin Sheikh";

const add = (a, b) => {
  return a + b;
};

/**
 * if we do modle.exports then you may able to use this from others files.
 */
module.exports = add;

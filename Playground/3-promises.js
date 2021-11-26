const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

/**
 * way one
 */

add(1, 2)
  .then((sum) => {
    console.log(sum);
  })
  .catch((e) => {
    console.log(e);
  });

/**
 * way two
 * this is called promise chain
 */

add(1, 1)
  .then((sum1) => {
    console.log(sum1);
    return add(sum1, 4);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });

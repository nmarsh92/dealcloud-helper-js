let utils = {};
utils.camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

utils.removeWhitespace = str => {
  return str ? str.replace(/\s+/g, "") : str;
};

utils.removeSpecialCharacters = str => {
  return str ? str.replace(/[^a-zA-Z0-9]/g, "") : str;
};

utils.groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

utils.asyncForEach = (arr, cb) => {
  return Promise.all(
    arr.map(async el => {
      await cb(el);
    })
  );
};

module.exports = utils;

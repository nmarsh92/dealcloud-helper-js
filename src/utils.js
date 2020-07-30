let _ = require('lodash');
let utils = {};
utils.camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

utils.recursiveCamelize = obj => {
  let camelizedObj = {};
  if (obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        camelizedObj[utils.camelize(key)] = utils.recursiveCamelize(obj[key]);
      } else if (Array.isArray(obj[key])) {
        camelizedObj[utils.camelize(key)] = [];
        obj[key].forEach(el => {
          camelizedObj[utils.camelize(key)].push(utils.recursiveCamelize(el));
        });
      } else {
        camelizedObj[utils.camelize(key)] = obj[key];
      }
    }
  }
  return camelizedObj;
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

utils.limitedAsyncForEach = async (arr, cb, limitNum = 4) => {
  var limited = [];
  var source = _.cloneDeep(arr);
  while (source.length > 0) {
    for (var i = 0; i < limitNum; i++) {
      if (source.length > 0) {
        limited.push(source.pop());
      }
    }
    await utils.asyncForEach(limited, cb);
    limited.splice(0);
  }

}

utils.groupByModelValue = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key].value] =
      result[currentValue[key].value] || []).push(currentValue);
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
utils.setValue = (obj, key, value) => {
  if (value !== null && obj[key] !== value) {
    obj.includeKeys.push(key);
    obj[key].value = value;
  }
};
utils.timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = utils;
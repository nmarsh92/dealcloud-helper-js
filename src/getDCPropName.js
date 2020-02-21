const utils = require("./utils");
module.exports = (name, fieldType) => {
  if (name) {
    name = utils.removeSpecialCharacters(name);
    name = name.replace(/%/g, "Percent");
    name = name.replace(/#/g, "Num");

    if (fieldType === "Boolean") {
      name = "Is" + name;
    }

    return utils.camelize(name);
  }
  return name;
};

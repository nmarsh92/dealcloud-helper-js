const utils = require("./utils");

module.exports = (schema, excludeCalculated) => {
  let classString = "";
  classString +=
    "const getDCValue = require('dealcloud-helper-js').getDCValue;";
  classString += "const _ = require('lodash');";
  classString += "\nclass " + utils.removeSpecialCharacters(schema.list) + "{ ";
  classString += "\nstatic entryListId=" + schema.entryListId + ";";
  classString +=
    "\nstatic getFieldIds() { let tempObj = new " +
    utils.removeSpecialCharacters(schema.list) +
    "([]);  return _.without(Object.values(tempObj).filter(field => ";
  classString +=
    "{return (field.id && (tempObj.includeKeys.length === 0 || tempObj.includeKeys.includes(field.jsonProperty)) && !tempObj.excludeKeys.includes(field.jsonProperty)) })";
  classString += ".map(field => field.id), undefined); }";
  classString += "\nconstructor (values, entryId = -1) {";
  classString += "\nthis.entryListId=" + schema.entryListId + ";";
  classString += "\nthis.entryId = entryId;";
  classString +=
    "//typically you would only want to use one or neither of these. \n";
  classString +=
    "//This is an alternative way to send/pull values without removing the properties";
  classString += "//default is all\n";
  classString += "this.includeKeys = [];\n";
  classString += "//default is none\n";
  classString += "this.excludeKeys = [];\n";
  classString +=
    "//this will allow null for all values on this object, it's not recommended unless you want every null/blank value to be sent.\n";
  classString += "this.allowNull = false;\n";
  schema.fields.forEach(field => {
    if (!excludeCalculated || !field.IsCalculated) {
      field.allowNull = false;
      classString +=
        "\nthis." +
        field.jsonProperty +
        "=" +
        JSON.stringify(utils.recursiveCamelize(field));
      classString = classString.substring(0, classString.length - 1);
      classString +=
        ",value: " +
        "getDCValue(" +
        field.Id +
        ",'" +
        field.FieldType +
        "'," +
        "values)}";
    }
  });
  classString += "\n}";
  classString += "\n}";
  classString +=
    "module.exports = " + utils.removeSpecialCharacters(schema.list) + ";";

  return classString;
};

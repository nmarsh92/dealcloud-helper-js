const utils = require("./utils");

module.exports = schema => {
  let classString = "";
  classString += "const getDCValue = require('dealcloud-helper-js').getDCValue;";
  classString += "const _ = require('lodash');";
  classString += "\nclass " + utils.removeSpecialCharacters(schema.list) + "{ ";
  classString += "\nstatic entryListId=" + schema.entryListId + ";";
  classString +=
    "\nstatic getFieldIds() {  return _.without(Object.values(new Country([])).map(field => field.Id), undefined); }";
  classString += "\nconstructor (values, entryId = -1) {";
  classString += "\nthis.entryListId=" + schema.entryListId + ";";
  classString += "\nthis.entryId = entryId;";
  schema.fields.forEach(field => {
    classString += "\nthis." + field.jsonProperty + "=" + JSON.stringify(field);
    classString +=
      "\nthis." +
      field.jsonProperty +
      ".value = " +
      "getDCValue(this." +
      field.jsonProperty +
      ", values);";
  });
  classString += "\n}";
  classString += "\n}";
  classString +=
    "module.exports = " + utils.removeSpecialCharacters(schema.list) + ";";

  return classString;
};

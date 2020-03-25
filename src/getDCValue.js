const moment = require("moment");
module.exports = (fieldId, fieldType, values) => {
  let value = values.filter(val => {
    return val.FieldId === fieldId;
  });
  let propValue = null;

  if (value && value.length > 0 && !value[0].IsNoData && value[0].Value) {
    value = value[0].Value;
    switch (fieldType) {
      case "Text":
        propValue = value.Name || value.$value;
        break;
      case "Choice":
      case "Reference":
      case "User":
        propValue = {
          id: parseInt(value.Id),
          name: value.Name
        };
        break;
      case "Date":
        propValue = moment(value.$value);
        break;
      case "Number":
        propValue = parseFloat(value.$value);
        break;
      case "Counter":
        propValue = parseInt(value.$value);
        break;
      case "Boolean":
        propValue = value.$value && value.$value.toLowerCase() === "true";
        break;
    }
  }

  return propValue;
};

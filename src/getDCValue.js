const moment = require('moment');
module.exports = (field, values) => {
  let value = values.filter(val => {
    return val.FieldId === field.Id;
  });
  let propValue = null;

  if (value && value.length > 0 && !value[0].IsNoData) {
    value = value[0].Value;
    switch (field.FieldType) {
      case "Text":
      case "Choice":
        propValue = value.Name || value.$value;
        break;
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
        propValue =
          propValue.$value && propValue.$value.toLowerCase() === "true";
        break;
    }
  }

  return propValue;
};

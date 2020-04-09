const moment = require("moment");
module.exports = (fieldId, fieldType, values, isMultiSelect) => {
  let value = values.filter(val => {
    return val.FieldId === fieldId;
  });
  let propValue = null;

  if (value && value.length > 0 && !value[0].IsNoData && value[0].Value) {
    let val = value[0].Value;
    switch (fieldType) {
      case "Text":
        propValue = val.Name || val.$value;
        break;
      case "Choice":
      case "Reference":
      case "User":
        if (val.anyType && Array.isArray(val.anyType)) {
          propValue = [];
          val.anyType.forEach(anyVal => {
            propValue.push(parseInt(anyVal.Id))
          });
        } else if (isMultiSelect) {
          propValue = [parseInt(val.Id)];
        } else {
          propValue = {
            id: parseInt(val.Id),
            name: val.Name,
            entryListId: val.EntryListId
          };
        }

        break;
      case "Date":
        propValue = moment(val.$value);
        break;
      case "Number":
        propValue = parseFloat(val.$value);
        break;
      case "Counter":
        propValue = parseInt(val.$value);
        break;
      case "Boolean":
        propValue = val.$value && val.$value.toLowerCase() === "true";
        break;
    }
  }

  return propValue;
};
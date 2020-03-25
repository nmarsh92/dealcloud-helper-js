const moment = require("moment");
module.exports =  (obj, key, value) => {
  if (obj[key] && value !== undefined) {
    switch (obj[key].fieldType) {
      case "Text":
      case "Boolean":
        if (decodeURI(obj[key].value) !== decodeURI(value)) {
          obj[key].value = value;
          obj.includeKeys.push(key);
        }
        break;
      case "Choice":
      case "Reference":
      case "User":
        let valueId;
        if (typeof value === "object") {
          valueId = parseInt(value.entryId || value.id || value.Id);
        } else {
          valueId = parseInt(value);
        }

        if (!obj[key].value || parseInt(obj[key].value.id) !== valueId) {
          obj[key].value = {
            id: valueId
          };
          obj.includeKeys.push(key);
        }
        break;
      case "Date":
        if (!obj[key].value || !moment(obj[key].value).isSame(value)) {
          obj[key].value = moment(value);
          obj.includeKeys.push(key);
        }

        break;
      case "Number":
        if (!obj[key].value || obj[key].value !== value) {
          obj[key].value = parseFloat(value);
        }
        break;
      case "Counter":
        if (!obj[key].value || obj[key].value !== value) {
          obj[key].value = parseInt(value);
        }
        break;
    }
  }
};

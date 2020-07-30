const moment = require("moment");
module.exports = (obj, key, value) => {
  if (!obj.keysToSave) {
    obj.keysToSave = [];
  }

  if (obj[key] && value !== undefined) {
    switch (obj[key].fieldType) {
      case "Text":
      case "Boolean":
        if (obj[key].value !== value) {
          obj[key].value = value;
          obj.keysToSave.push(key);
        }
        break;
      case "Choice":
      case "Reference":
      case "User":
        if (Array.isArray(value)) {
          let values = [];
          value.forEach(val => {
            let valueId;
            if (val && typeof val === "object") {
              valueId = parseInt(val.entryId || val.id || val.Id);
            } else {
              valueId = parseInt(val);
            }
            if (valueId) {
              values.push(valueId);
            }

          })
          obj[key].value = values;
          obj.keysToSave.push(key);
        } else {
          let valueId;
          if (value && typeof value === "object") {
            valueId = parseInt(value.entryId || value.id || value.Id);
          } else {
            valueId = parseInt(value);
          }

          if (valueId && (!obj[key].value || parseInt(obj[key].value.id) !== valueId)) {
            obj[key].value = {
              id: valueId
            };
            obj.keysToSave.push(key);
          }
        }

        if (value === null) {
          obj[key].value = null;
          obj.keysToSave.push(key);
        }

        break;
      case "Date":
        if (!obj[key].value || !moment(obj[key].value).isSame(value)) {
          obj[key].value = moment(value);
          obj.keysToSave.push(key);
        }

        break;
      case "Number":
        if (!obj[key].value || obj[key].value !== value) {
          obj[key].value = parseFloat(value);
          obj.keysToSave.push(key);
        }
        break;
      case "Counter":
        if (!obj[key].value || obj[key].value !== value) {
          obj[key].value = parseInt(value);
          obj.keysToSave.push(key);
        }
        break;
    }
  }
};
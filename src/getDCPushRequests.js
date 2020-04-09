const moment = require("moment");

module.exports = function (dcObjects) {
  let dcPushes = [];
  dcObjects.forEach(dcObject => {
    if (!dcObject.keysToSave) {
      dcObject.keysToSave = [];
    }

    for (let key in dcObject) {
      let include =
        dcObject.keysToSave.includes(key) ||
        key === "entryId";
      let hasValue =
        dcObject[key].value ||
        dcObject[key].value === false ||
        dcObject[key].value === 0;
      let allowNull = dcObject.allowNull || dcObject[key].allowNull;
      let allowValue = hasValue || allowNull;
      if (
        dcObject.entryId &&
        dcObject[key].id &&
        !dcObject[key].isCalculated &&
        include &&
        allowValue
      ) {
        let dcPush = {
          EntryId: dcObject.entryId,
          FieldId: dcObject[key].id
        };
        let type = "string";
        let namespace = 'http://www.w3.org/2001/XMLSchema';
        if (moment.isMoment(dcObject[key].value)) {
          dcPush.Value = dcObject[key].value.toISOString();
        } else if (!Array.isArray(dcObject[key].value) && typeof dcObject[key].value === "object") {
          dcPush.Value = dcObject[key].value.id;
        } else if (Array.isArray(dcObject[key].value)) {
          dcPush.Value = dcObject[key].value.map(item => {
            return typeof item === 'object' ? item.id : item
          }).join(',');

          if (dcPush.Value.length === 0) {
            dcPush.Value = null;
          }

        } else {
          dcPush.Value = dcObject[key].value;
        }

        switch (dcObject[key].fieldType) {
          case "Text":
          case "Boolean":
            break;
          case "Choice":
          case "Reference":
          case "User":
            type = "string";
            // if (Array.isArray(dcPush.Value)) {
            //   type = "ListOfInts";
            //   namespace = 'https://schemas.dealcloud.com/dcdataservice/v2';
            // }
            break;
          case "Date":
            type = 'dateTime';
            break;
          case "Number":
            type = 'decimal';
            break;
          case "Counter":
            type = 'integer';

        }

        //xml converter needs this?
        dcPush.Value = {
          $attributes: {
            $xsiType: `{${namespace}}xsd:${type}`
          },
          $value: dcPush.Value
        };

        dcPushes.push(dcPush);
      }
    }
  });

  return dcPushes;
};
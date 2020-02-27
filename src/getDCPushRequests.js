module.exports = function(dcObjects) {
  let dcPushes = [];
  dcObjects.forEach(dcObject => {
    for (let key in dcObject) {
      let include =
        dcObject.includeKeys.length === 0 ||
        dcObject.includeKeys.includes(key) ||
        key === "entryId";
      let dontExclude =
        dcObject.excludeKeys.length === 0 ||
        !dcObject.excludeKeys.includes(key) ||
        key === "entryId";
      let hasValue =
        dcObject[key].value ||
        dcObject[key].value === false ||
        dcObject[key].value === 0;
      let allowNull = dcObject.allowNull || dcObject[key].allowNull;
      let allowValue = hasValue || allowNull;
      if (
        dcObject.entryId &&
        dcObject[key].Id &&
        !dcObject[key].IsCalculated &&
        include &&
        dontExclude &&
        allowValue
      ) {
        let dcPush = {
          EntryId: dcObject.entryId,
          FieldId: dcObject[key].Id
        };

        if (moment.isMoment(dcObject[key].value)) {
          dcPush.Value = dcObject[key].value.toISOString();
        } else if (typeof dcObject[key].value === "object") {
          dcPush.Value = dcObject[key].value.id;
        } else {
          dcPush.Value = dcObject[key].value;
        }

        dcPushes.push(dcPush);
      }
    }
  });

  return dcPushes;
};

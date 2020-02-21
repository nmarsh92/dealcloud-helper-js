module.exports = function(dcObjects) {
  let dcPushes = [];
  dcObjects.forEach(dcObject => {
    for (let key in dcObject) {
      if (
        dcObject.entryId &&
        (dcObject[key].value ||
          dcObject[key].value === false ||
          dcObject[key].value === 0)
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

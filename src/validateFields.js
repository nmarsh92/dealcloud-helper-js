module.exports = (entryListId, allFields, fieldIds) => {
  let fieldObj = allFields
    .filter(field => {
      return field.EntryListId === entryListId && fieldIds.includes(field.Id);
    })
    .reduce(function(map, obj) {
      map[obj.Id] = obj;
      return map;
    }, {});

  if (Object.keys(fieldObj).length !== fieldIds.length) {
    let missingFields = fieldIds.filter(field => {
      return !fieldObj[field.Id];
    });

    let error =
      "EntryList: " +
      entryListId +
      ", missing fields: " +
      missingFields.join(",");

    throw error;
  }
};

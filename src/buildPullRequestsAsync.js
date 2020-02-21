module.exports = async (entryIds, fieldIds) => {
    let pullRequests = [];
    entryIds.forEach(entryId => {
      fieldIds.forEach(fieldId => {
        pullRequests.push({
          EntryId: entryId,
          FieldId: fieldId
        });
      });
    });
  
    return pullRequests;
  }
  
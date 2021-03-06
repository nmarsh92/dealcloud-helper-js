const buildPullRequestsAsync = require("./buildPullRequestsAsync");
const processDCPullAsync = require("./processDCPullAsync");
const validateFields = require("./validateFields");
const instantiate = require('./instantiate');
module.exports = async (dealcloud, dcClient, dcClass, allFields) => {
  let fieldIds = dcClass.getFieldIds();
  validateFields(dcClass.entryListId, allFields, fieldIds);
  let entries = await dealcloud.getListEntries({
    client: dcClient,
    entryListId: dcClass.entryListId
  });
  if(entries){
    let entryIds = entries.NamedEntry.map(entry => entry["Id"]);
    let pullRequests = await buildPullRequestsAsync(entryIds, fieldIds);
    let results = await processDCPullAsync(dealcloud, dcClient, pullRequests);
    return instantiate(results, dcClass);
  } else {
    return [];
  }
  
};
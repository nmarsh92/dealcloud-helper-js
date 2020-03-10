const buildPullRequestsAsync = require("./buildPullRequestsAsync");
const processDCPullAsync = require("./processDCPullAsync");
const validateFields = require("./validateFields");
const myUtils = require("./utils");
module.exports = async (dcConnector, dcClient, dcClass, allFields) => {
  let fieldIds = dcClass.getFieldIds();
  validateFields(dcClass.entryListId, allFields, fieldIds);
  let entries = await dcConnector.getListEntries({
    client: dcClient,
    entryListId: dcClass.entryListId
  });
  let entryIds = entries.NamedEntry.map(entry => entry["Id"]);
  let pullRequests = await buildPullRequestsAsync(entryIds, fieldIds);
  let results = await processDCPullAsync(dcConnector, dcClient, pullRequests);
  let grouped = myUtils.groupBy(results, "EntryId");
  let instances = [];
  for (let key in grouped) {
    instances.push(new dcClass(grouped[key], key));
  }
  return instances;
};
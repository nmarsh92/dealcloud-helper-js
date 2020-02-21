const getDCPushRequests = require("./getDCPushRequests");
module.exports = async function(dcConnector, dcClient, dcObjects, entryListId, batchSize = 10000) {
  let dcPushes = getDCPushRequests(dcObjects);
  let batchedRequests = getBatchedRequests(dcPushes, batchSize);
  let results = [];
  await myUtils.asyncForEach(batchedRequests, async request => {
    results = results.concat(
      await dcConnector.processDCPushAsync({
        client: dcClient,
        entryListId: entryListId,
        DCPulls: request
      })
    );
  });

  return results;
};
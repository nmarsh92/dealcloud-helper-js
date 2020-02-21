const myUtils = require("./utils");
const dcConnector = require("../dealcloud-connector");
const getBatchedRequests = require("./getBatchedRequests");
module.exports = async (dcConnector, dcClient, dcPulls, batchSize = 10000) => {
  let batchedRequests = getBatchedRequests(dcPulls, batchSize);
  let results = [];
  await myUtils.asyncForEach(batchedRequests, async request => {
    results = results.concat(
      await dcConnector.processDCPullAsync({
        client: dcClient,
        DCPulls: request
      })
    );
  });

  return results;
};

const myUtils = require("./utils");
const getBatchedRequests = require("./getBatchedRequests");
module.exports = async (dealcloud, dcClient, dcPulls, batchSize = 10000) => {
  let batchedRequests = getBatchedRequests(dcPulls, batchSize);
  let results = [];
  await myUtils.limitedAsyncForEach(batchedRequests, async request => {
    let temp = await dealcloud.processDCPullAsync({
      client: dcClient,
      DCPulls: request
    });
    results = results.concat(temp);
  });

  return results;
};
const myUtils = require("./utils");
const getBatchedRequests = require("./getBatchedRequests");
module.exports = async (dcConnector, dcClient, dcPulls, batchSize = 10000) => {
  let batchedRequests = getBatchedRequests(dcPulls, batchSize);
  let results = [];
  await myUtils.asyncForEach(batchedRequests, async request => {
    let temp =  await dcConnector.processDCPullAsync({
      client: dcClient,
      DCPulls: request
    });
    results = results.concat(temp);
  });

  return results;
};

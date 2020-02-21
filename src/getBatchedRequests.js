const utils = require('./utils');
module.exports = function(pushOrPulls, batchSize = 10000) {
    let grouped = utils.groupBy(pushOrPulls, "EntryId");
    let batchedRequests = [[]];
    for (let key in grouped) {
      if (
        grouped[key].length + batchedRequests[batchedRequests.length - 1].length <
        batchSize
      ) {
        batchedRequests[batchedRequests.length - 1] = batchedRequests[
          batchedRequests.length - 1
        ].concat(grouped[key]);
      } else {
        batchedRequests.push(grouped[key]);
      }
    }
    return batchedRequests;
}
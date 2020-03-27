const getDCPushRequests = require("./getDCPushRequests");
const getBatchedRequests = require("./getBatchedRequests");
const utils = require("./utils");
module.exports = async function(
  dealcloud,
  dcClient,
  dcObjects,
  entryListId,
  batchSize = 10000
) {
  let dcPushes = getDCPushRequests(dcObjects);
  let batchedRequests = getBatchedRequests(dcPushes, batchSize);
  let result = {
    results: [],
    errors: []
  };
  await utils.asyncForEach(batchedRequests, async request => {
    let temp = await dealcloud.processDCPushAsync({
      client: dcClient,
      entryListId: entryListId,
      DCPushs: request
    });

    if (temp.ProcessDCPushResult && temp.ProcessDCPushResult.DCResult){
      result.results = result.results.concat(temp.ProcessDCPushResult.DCResult.filter(dcr => {
        return !dcr.Error;
      }));
      result.errors = result.errors.concat(temp.ProcessDCPushResult.DCResult.filter(dcr => {
        return dcr.Error;
      }));
    }
      
  });

  return result;
};

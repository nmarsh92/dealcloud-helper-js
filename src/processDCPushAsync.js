const getDCPushRequests = require("./getDCPushRequests");
const getBatchedRequests = require("./getBatchedRequests");
const utils = require("./utils");
module.exports = async function (
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
  await utils.limitedAsyncForEach(batchedRequests, async request => {

    let tempResult = await processRequest(dealcloud, dcClient, entryListId, request);
    let retryRequest = await processResults(result, tempResult, request, true);
    tempResult = await processRequest(dealcloud, dcClient, entryListId, retryRequest);
    await processResults(result, tempResult, request);


  });

  return result;
};

async function processRequest(dealcloud, dcClient, entryListId, request) {
  let result = {
    results: [],
    errors: []
  };
  let temp = await dealcloud.processDCPushAsync({
    client: dcClient,
    entryListId: entryListId,
    DCPushs: request
  });

  if (temp.ProcessDCPushResult && temp.ProcessDCPushResult.DCResult && Array.isArray(temp.ProcessDCPushResult.DCResult)) {
    result.results = result.results.concat(temp.ProcessDCPushResult.DCResult.filter(dcr => {
      return !dcr.Error;
    }));
    result.errors = result.errors.concat(temp.ProcessDCPushResult.DCResult.filter(dcr => {
      return dcr.Error;
    }));
  }

  return result;
}


async function processResults(result, tempResult, request, retry = false) {
  let retryRequest = [];
  if (tempResult.results) {
    result.results = tempResult.results.concat(result.results);
  }

  if (tempResult.errors && tempResult.errors.length > 0) {
    result.errors = tempResult.errors.concat(result.errors);
    let errorIds = result.errors.map(x => x.EntryId);
    if (retry) {
      retryRequest = request.filter((dcPush) => {
        return !errorIds.includes(dcPush.EntryId);
      });
    }
  }

  return retryRequest;
}
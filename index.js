//building the library so that we can require this project from another and use the helper functions to build our integrations.
//test commit for github mirror, will remove in next real commit
module.exports = {
  validateFields: require('./src/validateFields'),
  buildReferenceFilesAsync: require('./src/buildReferenceFilesAsync'),
  getItemsAsync: require('./src/getItemsAsync'),
  loadSchemasAsync: require('./src/loadSchemasAsync'),
  processDCPushAsync: require('./src/processDCPushAsync'),
  processDCPullAsync: require('./src/processDCPullAsync'),
  getDCValue: require('./src/getDCValue'),
  getNewEntryId: require('./src/getNewEntryId')
}












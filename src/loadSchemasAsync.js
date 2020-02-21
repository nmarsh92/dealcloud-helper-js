const fs = require('fs');
const myUtils = require('./utils');
module.exports = async (path) => {
  path = path;
  let schemaMap = {};
  try {
    let files = fs.readdirSync(path);
    await myUtils.asyncForEach(files, async file => {
      let schema = fs.readFileSync(path + file);
      if (schema) {
        schema = (JSON.parse(schema));
        schemaMap[schema.list] = schema;
      }
    });
  } catch (err) {
    console.log(err);
  }
  return schemaMap;
};

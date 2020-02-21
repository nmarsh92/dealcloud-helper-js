const fs = require('fs');
const getDCPropName = require('./getDCPropName');
const classBuilder = require('./classBuilder');
module.exports = async (dcConnector, dcClient, schemaPath, classPath) => {
  let schema = await dcConnector.getSchema(dcClient);
  
  if (!fs.existsSync(schemaPath)) {
    fs.mkdirSync(schemaPath);
  }
  schema.forEach(sch => {
    let fileName = sch.list.replace(/[^a-zA-Z0-9]/g, "");
    sch.fields.forEach((field) => {
      field.jsonProperty = getDCPropName(field.Name, field.FieldType);
    });
    fs.writeFileSync(schemaPath + fileName + ".json", JSON.stringify(sch));
    fs.writeFileSync(classPath + fileName + '.js', classBuilder(sch));
  });
}
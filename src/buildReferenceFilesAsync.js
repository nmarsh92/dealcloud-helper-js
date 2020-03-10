const fs = require("fs");
const getDCPropName = require("./getDCPropName");
const classBuilder = require("./classBuilder");
module.exports = async (dcConnector, dcClient, schemaPath, classPath, excludeCalculated = true) => {
  let schema = await dcConnector.getSchema(dcClient);

  if (!fs.existsSync(schemaPath)) {
    fs.mkdirSync(schemaPath);
  }

  if (!fs.existsSync(classPath)) {
    fs.mkdirSync(classPath);
  }

  if (schemaPath[schemaPath.length - 1] !== "/") {
    schemaPath += '/'
  }

  if (classPath[classPath.length - 1] !== "/") {
    classPath += '/'
  }

  schema.forEach(sch => {
    let fileName = sch.list.replace(/[^a-zA-Z0-9]/g, "");
    sch.fields.forEach(field => {
      field.jsonProperty = getDCPropName(field.Name, field.FieldType);
    });
    fs.writeFileSync(schemaPath + fileName + ".json", JSON.stringify(sch));
    fs.writeFileSync(classPath + fileName + ".js", classBuilder(sch, excludeCalculated));
  });
};

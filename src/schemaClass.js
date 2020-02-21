const _ = require("lodash");
const getDCValue = require('./getDCValue');

//Not used, but could be used to generate a dynamic class from the schema
module.exports = class {
  constructor(schema, values) {
    this.entryListId = schema.entryListId;
    schema.fields.forEach(field => {
      this[field.jsonProperty] = _.cloneDeep(field);
      //this.country = { value, id  }
      this[field.jsonProperty].value = getDCValue(field, values);
    });
  }
};

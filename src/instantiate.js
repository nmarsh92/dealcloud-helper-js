const myUtils = require("./utils");
module.exports = (results, dcClass)=> {
    let grouped = myUtils.groupBy(results, "EntryId");
    let instances = [];
    for (let key in grouped) {
      instances.push(new dcClass(grouped[key], key));
    }
    return instances;
}
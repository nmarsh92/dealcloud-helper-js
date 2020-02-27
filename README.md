# dealcloud-helper-js

## Dependency

Currently all functions in dealcloud-helper-js use
[dealcloud-js](https://www.npmjs.com/package/dealcloud-js)

## Install

`npm install dealcloud-helper-js`

## Examples

#### Create Client

```javascript
const dcHelper = require("dealcloud-helper-js");
const dealcloud = require("dealcloud-js");

let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
```

#### Build Reference Files

```javascript
const dcHelper = require("dealcloud-helper-js");
const dealcloud = require("dealcloud-js");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
await dcHelper.buildReferenceFilesAsync(
  dealcloud,
  client,
  "./src/schemas/",
  "./src/models/"
);
```

#### Get Items

```javascript
const dcHelper = require("dealcloud-helper-js");
const dealcloud = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});

let fields = await dealcloud.getFieldsAsync(client);
let lists = await dealcloud.getListsAsync(client);
let items = await dcHelper.getItemsAsync(client, Country, fields);
//items = [{Country}, {Country}, {Country}, {Country}];
```

#### Update Item

```javascript
const dcHelper = require("dealcloud-helper-js");
const dealcloud = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});

let fields = await dealcloud.getFieldsAsync(client);
let lists = await dealcloud.getListsAsync(client);
let items = await dcHelper.getItemsAsync(client, Country, fields);
let myCountries = items.filter((country) => {
    return (country.country.value && country.country.value.toLowerCase().includes('united'));
});

myCountries.forEach((country, index)=> {
    country.country.value = "State of Mars #" + index;
});

let results = await dcHelper.processDCPushAsync(
  dealcloud,
  client,
  myCountries,
  Country.entryListId
);
```

#### Create Item

```javascript
const dcHelper = require("dealcloud-helper-js");
const dealcloud = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
let entryId = -1;
let countries = [new Country([], entryId--)];
countries[0].country.value = "Mars";
let results = await dcHelper.processDCPushAsync(
  dealcloud,
  client,
  countries,
  Country.entryListId
);
```

#### Delete Value

```javascript
const dcHelper = require("dealcloud-helper-js");
const dealcloud = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
let fields = await dealcloud.getFieldsAsync(client);
let lists = await dealcloud.getListsAsync(client);
let items = await dcHelper.getItemsAsync(client, Country, fields);
items[0].country.value = '';
//this flag allows us to send null/empty/undefined for fields. Otherwise fields with null/undefined/empty value will not be sent.
items[0].country.allowNull = true; 
let results = await dcHelper.processDCPushAsync(
  dealcloud,
  client,
  //only sending the one we modified, it accepts an array
  [items[0]], 
  Country.entryListId
);
```

#### Delete Item  
```javascript
  Coming Soon
```

### Additional Properties
```javascript
object.allowNull: "Allows any null value to be sent in a DCPush";
object.property.allowNull: "Allows null value to be sent in DCPush for this property only";
object.includeKeys: "When set, add jsonProperty names that you want to allow to be sent. Useful if you only want to send the changes or you don't want to delete properties from the model";
object.excludeKeys: "Will send everything except these keys.";
```

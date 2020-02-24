# dealcloud-helper-js

## Install

`npm install dealcloud-helper-js`

## Examples

#### Create Client

```javascript
const dcHelper = require("dealcloud-helper-js");
const dcConnector = require("dealcloud-js");

let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
```

#### Build Reference Files

```javascript
const dcHelper = require("dealcloud-helper-js");
const dcConnector = require("dealcloud-js");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
await dcHelper.buildReferenceFilesAsync(
  dcConnector,
  client,
  "./src/schemas/",
  "./src/models/"
);
```

#### Get Items

```javascript
const dcHelper = require("dealcloud-helper-js");
const dcConnector = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});

let fields = await dcConnector.getFieldsAsync(client);
let lists = await dcConnector.getListsAsync(client);
let items = await dcHelper.getItemsAsync(client, Country, fields);
//items = [{Country}, {Country}, {Country}, {Country}];
```

#### Update Item

```javascript
const dcHelper = require("dealcloud-helper-js");
const dcConnector = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});

let fields = await dcConnector.getFieldsAsync(client);
let lists = await dcConnector.getListsAsync(client);
let items = await dcHelper.getItemsAsync(client, Country, fields);
let myCountries = items.filter((country) => {
    return (country.country.value && country.country.value.toLowerCase().includes('united'));
});

myCountries.forEach((country, index)=> {
    country.country.value = "State of Mars #" + index;
});

let results = await dcHelper.processDCPushAsync(
  dcConnector,
  client,
  myCountries,
  Country.entryListId
);
```

#### Create Item

```javascript
const dcHelper = require("dealcloud-helper-js");
const dcConnector = require("dealcloud-js");
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
  dcConnector,
  client,
  countries,
  Country.entryListId
);
```

#### Delete Value

```javascript
const dcHelper = require("dealcloud-helper-js");
const dcConnector = require("dealcloud-js");
//from the reference files we generated
const Country = require("./src/models/Country");
let client = await dcHelper.createClientAsync({
  username: "<username>",
  password: "<password>",
  url: "<url-to-dc-site>"
});
let entryId = -1;
let countries = [new Country([], entryId--)];
countries[0].country.value = '';
countries[0].allowNull = true;
let results = await dcHelper.processDCPushAsync(
  dcConnector,
  client,
  countries,
  Country.entryListId
);
```

#### Delete Item  
```javascript
  Coming Soon
```

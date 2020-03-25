const getChoiceByName = require("./getChoiceByName");

module.exports = (model, choiceKey, name) => {
  let choice = getChoiceByName(model[choiceKey].choiceValues, name);
  return model[choiceKey].value && model[choiceKey].value.id === choice.id;
};

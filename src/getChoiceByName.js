module.exports = function(choiceValues, name) {
  let choices = choiceValues;
  if (choiceValues.choiceFieldValue) {
    choices = choiceValues.choiceFieldValue;
  }

  let choice = choices.find(choice => {
    return choice.name && name && choice.name.toLowerCase() === name.toLowerCase();
  });

  if(choice){
      return choice;
  }
};

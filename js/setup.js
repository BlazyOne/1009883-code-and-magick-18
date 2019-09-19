'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

var getRandomFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomWizards = function (amount) {
  var wizardsRandom = [];

  for (var i = 0; i < amount; i++) {
    var wizardRandom = {};
    wizardRandom.name = getRandomFromArray(FIRST_NAMES) + ' ' + getRandomFromArray(LAST_NAMES);
    wizardRandom.coatColor = getRandomFromArray(COAT_COLORS);
    wizardRandom.eyesColor = getRandomFromArray(EYES_COLORS);
    wizardsRandom.push(wizardRandom);
  }

  return wizardsRandom;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillWizards = function (wizardsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizards = getRandomWizards(WIZARDS_AMOUNT);
fillWizards(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

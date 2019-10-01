'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_AMOUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup .setup-similar-list');

  var getRandomWizards = function (amount) {
    var wizardsRandom = [];

    for (var i = 0; i < amount; i++) {
      var wizardRandom = {};
      wizardRandom.name = window.util.getRandomFromArray(FIRST_NAMES) + ' ' + window.util.getRandomFromArray(LAST_NAMES);
      wizardRandom.coatColor = window.util.getRandomFromArray(COAT_COLORS);
      wizardRandom.eyesColor = window.util.getRandomFromArray(EYES_COLORS);
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

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };

  var wizards = getRandomWizards(WIZARDS_AMOUNT);
  fillWizards(wizards);

  document.querySelector('.setup .setup-similar').classList.remove('hidden');
})();

'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_AMOUNT = 4;

  var WIZARDS_DATA_URL = 'https://js.dump.academy/code-and-magick/data';
  var WIZARDS_DOWNLOAD_TYPE = 'GET';

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup .setup-similar-list');

  var getRandomWizards = function (amount) {
    var wizardsRandom = [];

    for (var i = 0; i < amount; i++) {
      var wizardRandom = {};
      wizardRandom.name = window.util.getRandomFromArray(FIRST_NAMES) + ' ' + window.util.getRandomFromArray(LAST_NAMES);
      wizardRandom.colorCoat = window.util.getRandomFromArray(COAT_COLORS);
      wizardRandom.colorEyes = window.util.getRandomFromArray(EYES_COLORS);
      wizardsRandom.push(wizardRandom);
    }

    return wizardsRandom;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var fillWizards = function (wizardsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var onWizardsDownloadSuccess = function (wizards) {
    fillWizards(wizards);
    document.querySelector('.setup .setup-similar').classList.remove('hidden');
  };

  var onWizardsDownloadError = function (errorMessage) {
    var errorElement = window.util.createLoadErrorElement();

    errorElement.textContent = 'Загрузка похожих персонажей. ' + errorMessage;
  };

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    fillWizards: fillWizards
  };

  getRandomWizards(WIZARDS_AMOUNT);
  // var wizards = getRandomWizards(WIZARDS_AMOUNT);
  // fillWizards(wizards);
  // var wizardsLoader = document.createElement('script');
  // wizardsLoader.src = 'https://js.dump.academy/code-and-magick/data?callback=window.setup.fillWizards';
  // document.body.append(wizardsLoader);

  window.backend.load(WIZARDS_DATA_URL, WIZARDS_DOWNLOAD_TYPE, onWizardsDownloadSuccess, onWizardsDownloadError);
})();

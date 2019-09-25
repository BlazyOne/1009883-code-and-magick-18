'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_AMOUNT = 4;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupPlayerCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupPlayerEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = setup.querySelector('.setup-similar-list');

var coatColorCounter = 0;
var eyesColorCounter = 0;
var fireballColorCounter = 0;

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

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

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

setupPlayerCoat.addEventListener('click', function () {
  if (coatColorCounter < COAT_COLORS.length - 1) {
    coatColorCounter++;
  } else {
    coatColorCounter = 0;
  }

  setupPlayerCoat.setAttribute('style', 'fill: ' + COAT_COLORS[coatColorCounter] + ';');
  setup.querySelector('input[name="coat-color"]').value = COAT_COLORS[coatColorCounter];
});

setupPlayerEyes.addEventListener('click', function () {
  if (eyesColorCounter < EYES_COLORS.length - 1) {
    eyesColorCounter++;
  } else {
    eyesColorCounter = 0;
  }

  setupPlayerEyes.setAttribute('style', 'fill: ' + EYES_COLORS[eyesColorCounter] + ';');
  setup.querySelector('input[name="eyes-color"]').value = EYES_COLORS[eyesColorCounter];
});

setupFireballWrap.addEventListener('click', function () {
  if (fireballColorCounter < FIREBALL_COLORS.length - 1) {
    fireballColorCounter++;
  } else {
    fireballColorCounter = 0;
  }

  setupFireballWrap.setAttribute('style', 'background-color: ' + FIREBALL_COLORS[fireballColorCounter] + ';');
  setup.querySelector('input[name="fireball-color"]').value = FIREBALL_COLORS[fireballColorCounter];
});

var wizards = getRandomWizards(WIZARDS_AMOUNT);
fillWizards(wizards);

setup.querySelector('.setup-similar').classList.remove('hidden');

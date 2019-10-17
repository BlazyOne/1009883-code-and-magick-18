'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SETUP_START_COORDS = {
    x: '50%',
    y: '80px'
  };
  var SAVE_WIZARD_URL = 'https://js.dump.academy/code-and-magick';
  var SAVE_WIZARD_LOAD_TYPE = 'POST';
  var AVATAR_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var wizardForm = setup.querySelector('.setup-wizard-form');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupPlayerCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupPlayerEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
  var dialogHandle = setup.querySelector('.upload');
  var avatarChooser = dialogHandle.querySelector('input[type=file]');
  var avatarPreview = dialogHandle.querySelector('.setup-user-pic');

  var counter = {
    coatColor: 0,
    eyesColor: 0,
    fireballColor: 0
  };
  var coatColor;
  var eyesColor;

  var setupPositionReset = function () {
    setup.style.left = SETUP_START_COORDS.x;
    setup.style.top = SETUP_START_COORDS.y;
  };

  var onSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetup);
  };

  var openSetup = function () {
    setupPositionReset();
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    setupPositionReset();
    document.removeEventListener('keydown', onSetupEscPress);
  };

  var onWizardSaveError = function (errorMessage) {
    var errorElement = window.util.createLoadErrorElement();

    errorElement.textContent = 'Сохранение персонажа. ' + errorMessage;
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.setup.fillWizards(window.setup.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var debounceUpdateCoat = window.util.debounce(updateWizards);
  var debounceUpdateEyes = window.util.debounce(updateWizards);

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  });

  userNameInput.addEventListener('input', function () {
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
    window.util.isEscEvent(evt, evt.stopPropagation());
  });

  setupPlayerCoat.addEventListener('click', function () {
    counter.coatColor = window.util.counterChange(counter.coatColor, window.setup.COAT_COLORS.length);
    var newColor = window.setup.COAT_COLORS[counter.coatColor];

    setupPlayerCoat.style.fill = newColor;
    setup.querySelector('input[name="coat-color"]').value = newColor;

    coatColor = newColor;
    debounceUpdateCoat();
  });

  setupPlayerEyes.addEventListener('click', function () {
    counter.eyesColor = window.util.counterChange(counter.eyesColor, window.setup.EYES_COLORS.length);
    var newColor = window.setup.EYES_COLORS[counter.eyesColor];

    setupPlayerEyes.style.fill = newColor;
    setup.querySelector('input[name="eyes-color"]').value = newColor;

    eyesColor = newColor;
    debounceUpdateEyes();
  });

  setupFireballWrap.addEventListener('click', function () {
    counter.fireballColor = window.util.counterChange(counter.fireballColor, FIREBALL_COLORS.length);
    var newColor = FIREBALL_COLORS[counter.fireballColor];

    setupFireballWrap.style.backgroundColor = newColor;
    setup.querySelector('input[name="fireball-color"]').value = newColor;
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop + shift.y) + 'px';
      setup.style.left = (setup.offsetLeft + shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtPreventClick) {
          evtPreventClick.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  wizardForm.addEventListener('submit', function (evt) {
    window.backend.load(SAVE_WIZARD_URL, SAVE_WIZARD_LOAD_TYPE, function () {
      closeSetup();
    }, onWizardSaveError, new FormData(wizardForm));
    evt.preventDefault();
  });

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = AVATAR_FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SETUP_START_COORDS = {
    x: '50%',
    y: '80px'
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupPlayerCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupPlayerEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
  var dialogHandle = setup.querySelector('.upload');

  var counter = {
    coatColor: 0,
    eyesColor: 0,
    fireballColor: 0
  };

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

    setupPlayerCoat.style.fill = window.setup.COAT_COLORS[counter.coatColor];
    setup.querySelector('input[name="coat-color"]').value = window.setup.COAT_COLORS[counter.coatColor];
  });

  setupPlayerEyes.addEventListener('click', function () {
    counter.eyesColor = window.util.counterChange(counter.eyesColor, window.setup.EYES_COLORS.length);

    setupPlayerEyes.style.fill = window.setup.EYES_COLORS[counter.eyesColor];
    setup.querySelector('input[name="eyes-color"]').value = window.setup.EYES_COLORS[counter.eyesColor];
  });

  setupFireballWrap.addEventListener('click', function () {
    counter.fireballColor = window.util.counterChange(counter.fireballColor, FIREBALL_COLORS.length);

    setupFireballWrap.style.backgroundColor = FIREBALL_COLORS[counter.fireballColor];
    setup.querySelector('input[name="fireball-color"]').value = FIREBALL_COLORS[counter.fireballColor];
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
})();

'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomFromArray: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    counterChange: function (count, maxCount) {
      if (count < maxCount - 1) {
        count++;
      } else {
        count = 0;
      }

      return count;
    },
    createLoadErrorElement: function () {
      var errorElement = document.createElement('div');
      errorElement.style = 'position: absolute; left: 0; right: 0; z-index: 100; margin: 0 auto; font-size: 30px; text-align: center; background-color: red;';
      document.body.insertAdjacentElement('afterbegin', errorElement);
      return errorElement;
    }
  };
})();

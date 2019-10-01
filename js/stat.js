'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var MESSAGE_X = CLOUD_X + 20;
  var MESSAGE_Y = CLOUD_Y + 30;
  var MESSAGE_LINEHEIGHT = 20;
  var HIST_HEIGHT = 150;
  var HIST_BOTTOM = CLOUD_Y + 230;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var BAR_VALUE_GAP = 5;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var printMessage = function (ctx, message, x, y) {
    var messageArr = message.split('\n');

    for (var i = 0; i < messageArr.length; i++) {
      ctx.fillText(messageArr[i], x, y + MESSAGE_LINEHEIGHT * i);
    }
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    printMessage(ctx, 'Ура вы победили!\nСписок результатов:', MESSAGE_X, MESSAGE_Y);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, HIST_BOTTOM + MESSAGE_LINEHEIGHT);

      var barHeight = HIST_HEIGHT * times[i] / maxTime;
      ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, HIST_BOTTOM - barHeight - BAR_VALUE_GAP);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 101) + '%, 50%)';
      }
      ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, HIST_BOTTOM - barHeight, BAR_WIDTH, barHeight);
    }
  };
})();

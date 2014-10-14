var zetta = require('zetta');
var Hue = require('zetta-hue-driver');
var Clock = require('./clock');
var HueClockScout = require('./hue_clock_scout');

zetta()
  .use(Hue)
  .use(Clock)
  .use(HueClockScout)
  .listen(3000);

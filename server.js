var zetta = require('zetta');
var Hue = require('zetta-hue-driver');
var Clock = require('./clock');
var HueClock = require('./hue_clock');

zetta()
  .use(Hue)
  .use(Clock)
  .use(HueClock)
  .listen(3000);

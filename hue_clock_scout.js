var util = require('util');
var Scout = require('zetta-scout');
var HueClock = require('./hue_clock');

var HueClockScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(HueClockScout, Scout);

HueClockScout.prototype.init = function(next) {
  var queries = [
    this.server.where({ type: 'clock' }),
    this.server.where({ type: 'huebulb', bulbId: '1' }),
    this.server.where({ type: 'huebulb', bulbId: '2' }),
    this.server.where({ type: 'huebulb', bulbId: '3' }),
  ];

  var self = this;
  this.server.observe(queries, function(clock, bulb1, bulb2, bulb3) {
    self.discover(HueClock, clock, bulb1, bulb2, bulb3);
  });

  next();
};

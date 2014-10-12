var util = require('util');
var Device = require('zetta-device');

var Clock = module.exports = function() {
  Device.call(this);

  this.hours = null;
  this.minutes = null;
  this.seconds = null;
};
util.inherits(Clock, Device);

Clock.prototype.init = function(config) {
  config
    .type('clock')
    .monitor('hours')
    .monitor('minutes')
    .monitor('seconds');

  var self = this;
  setInterval(function() {
    var date = new Date();
    if (self.hours !== date.getHours()) {
      self.hours = date.getHours();
    }

    if (self.minutes !== date.getMinutes()) {
      self.minutes = date.getMinutes();
    }

    if (self.seconds !== date.getSeconds()) {
      self.seconds = date.getSeconds();
    }
  }, 1000);
};

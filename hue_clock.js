var util = require('util');
var Device = require('zetta-device');

var HueClock = module.exports = function(clock, bulb1, bulb2, bulb3) {
  Device.call(this);

  this._hours = clock.streams.hours;
  this._minutes = clock.streams.minutes;
  this._seconds = clock.streams.seconds;

  this._bulb1 = bulb1;
  this._bulb2 = bulb2;
  this._bulb3 = bulb3;

  var self = this;
  this._hoursListener = function() {
    self._bulb2.call('color', self.getRandomColor(), function(err) {
      if (err) {
        console.error(err);
      }
    });
  };

  this._minutesListener = function() {
    self._bulb3.call('color', self.getRandomColor(), function(err) {
      if (err) {
        console.error(err);
      }
    });
  };

  this._secondsListener = function() {
    self._bulb1.call('color', self.getRandomColor(), function(err) {
      if (err) {
        console.error(err);
      }
    });
  };

  this.saturation = 100;
};
util.inherits(HueClock, Device);

HueClock.prototype.init = function(config) {
  config
    .type('hue-clock')
    .state('running')
    .when('running', { allow: ['pause', 'set-saturation'] })
    .when('paused', { allow: ['run', 'set-saturation'] })
    .map('set-saturation', this.setSaturation, [{ name: 'saturation', type: 'number' }])
    .map('pause', this.pause)
    .map('run', this.run);

  this._run();
};

HueClock.prototype.setSaturation = function(saturation, cb) {
  this.saturation = saturation;
  var self = this;
  this.pause(function() {
    self.run(function() {
      cb();
    });
  });
};

HueClock.prototype.run = function(cb) {
  this._run();
  this.state = 'running';
  cb();
};

HueClock.prototype.pause = function(cb) {
  this._hours.removeListener('data', this._hoursListener);
  this._minutes.removeListener('data', this._minutesListener);
  this._seconds.removeListener('data', this._secondsListener);

  this.state = 'paused';
  cb();
};

HueClock.prototype._run = function() {
  this._bulb1.call('color', this.getRandomColor());
  this._bulb2.call('color', this.getRandomColor());
  this._bulb3.call('color', this.getRandomColor());

  this._hours.on('data', this._hoursListener);
  this._minutes.on('data', this._minutesListener);
  this._seconds.on('data', this._secondsListener);
};

HueClock.prototype.getRandomColor = function() {
  return 'hsl(' + Math.round(Math.random() * 360, 2)
      + ', ' + this.saturation + '%, 45%)';
}

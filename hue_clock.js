module.exports = function(server) {
  var queries = [
    server.where({ type: 'clock' }),
    server.where({ type: 'huebulb', bulbId: '1' }),
    server.where({ type: 'huebulb', bulbId: '2' }),
    server.where({ type: 'huebulb', bulbId: '3' }),
  ];

  server.observe(queries, function(clock, bulb1, bulb2, bulb3) {
    clock.streams.seconds.on('data', function() {
      bulb1.call('color', getRandomColor());
    });

    clock.streams.minutes.on('data', function() {
      bulb3.call('color', getRandomColor());
    });

    clock.streams.hours.on('data', function() {
      bulb2.call('color', getRandomColor());
    });
  });
};

function getRandomColor() {
  return 'hsl(' + Math.round(Math.random() * 360, 2) + ', 50%, 45%)';
}

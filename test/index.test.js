var fs = require('fs');
var test = require('tape');
var ndgeo = require('../lib/index');
var Readable = require('stream').Readable;

var fixture = fs.readFileSync(__dirname + '/fixture.json');

test('builds feature collection', function (t) {
  t.plan(7);

  var results = [];

  var rs = new Readable;
  rs.pipe(ndgeo())
    .on('data', function(geochunk) {
      results.push(geochunk.toString());
    })
    .on('end', function (foo) {
      var found = results[0];
      var wants = '{ "type": "FeatureCollection", "features": [\n';
      t.equal(found, wants, 'opens a FeatureCollection');

      found = results[1];
      t.equal(found.slice(-2), ',\n', 'features have a trailing comma');

      found = JSON.parse('[' + found.slice(0, -2) + ']');
      t.equal(found[0].type, 'Feature', 'wraps an array of Feature objects');
      t.ok(found[0].geometry, 'having geometry');
      t.equal(found[1].geometry.type, 'LineString', 'keeping deep properties');
      t.ok(found[0].properties, 'and adds missing properties');

      t.equal(results.pop(), ']}', 'closes a FeatureCollection');
    });

  rs.push(fixture);
  rs.push(null);
});

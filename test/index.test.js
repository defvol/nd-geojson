var fs = require('fs');
var test = require('tape');
var ndgeo = require('../lib/index');
var ndjson = require('ndjson');
var Readable = require('stream').Readable;

var fixture = fs.readFileSync(__dirname + '/fixture.json');

test('builds feature collection', function (t) {
  t.plan(1);

  var start = '{"type": "FeatureCollection","features": [';
  var trail = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[0,0], [0,0], [0,0], [0,0]]
    },
    properties: {}
  };
  var fin = ']}';

  console.log(start);

  var rs = new Readable;
  rs.pipe(ndjson.parse())
    .on('data', function(feature) {
      if (!feature.properties) feature.properties = {};
      console.log('%j,', feature);
    })
    .on('end', function () {
      console.log('%j', trail);
      console.log(fin);
      t.true(true, 'it ended');
    });

  rs.push(fixture);
  rs.push(null);
});

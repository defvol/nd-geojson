var through2 = require('through2');

var start = '{ "type": "FeatureCollection", "features": [';
var trail = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [[0,0], [0,0], [0,0], [0,0]]
  }
};
var fin = ']}';

function transform(chunk, enc, callback) {
  // if (!obj.properties) obj.properties = {};
  var d = chunk.toString()
    .split('\n')
    .join(',\n');
  callback(null, d);
}

function ending(callback) {
  this.push(JSON.stringify(trail) + '\n');
  this.push(fin);
  callback(null);
}

/**
 * Parse line-delimited features and return GeoJSON
 * @return {function} through2 stream
 */
module.exports = function () {
  var ts = through2(transform, ending);
  ts.push(start + '\n');
  return ts;
}

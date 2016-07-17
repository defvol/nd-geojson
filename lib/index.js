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

/**
 * Transform from line-delimited objects to comma-separated objects
 * For more information on the parameters, see through2 in npm
 */
function transform(chunk, enc, callback) {
  var d = chunk.toString()
    .split('\n')
    .map(missingProperties)
    .join(',\n');
  callback(null, d);
}

/**
 * Initialize any required missing property
 * @param {string} objString is a stringified object
 */
function missingProperties(objString) {
  try {
    var obj = JSON.parse(objString);
    obj.properties = obj.properties || {};
    return JSON.stringify(obj);
  } catch (e) {
    return objString;
  }
}

/**
 * To close the FeatureCollection, add a dumb feature and closing tags
 */
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

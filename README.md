# nd-geojson

Stream GeoJSON from a set of line-delimited features

Line delimited features are faster and cheaper to process, but sometimes you need to wrap them in a FeatureCollection to visualize them, e.g. `% cat line-delimited.json | nd-geojson | geojsonio`.

Usage:

```bash
% cat line-delimited.json | nd-geojson
{
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [ -115.44, 32.62 ] } },
    { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [ -115.45, 32.63 ] } },
    { "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [[0,0],[0,0],[0,0],[0,0] ] } }
  ]
}
```
_A set of line-delimited features wrapped in a FeatureCollection_

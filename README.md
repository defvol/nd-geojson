# nd-geojson

Stream GeoJSON from a set of line-delimited features

```bash
% cat line-delimited.json | nd-geojson
{
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [ -115.44, 32.62 ] } },
    { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [ -115.45, 32.63 ] } },
    {}
  ]
}
```
_line-delimited features wrapped in a FeatureCollection_

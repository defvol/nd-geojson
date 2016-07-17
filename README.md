# nd-geojson

Stream GeoJSON from a set of line-delimited features

Line-delimited GeoJSON features are faster and cheaper to process, but sometimes you need a FeatureCollection to visualize them, e.g. `% cat line-delimited.json | nd-geojson | geojsonio`.

**Usage**

Let's say we have a file with 10k line-delimited features:

```bash
% head -n 2 line-delimited.json
{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -115.44, 32.62 ] } }
{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -115.45, 32.63 ] } }
```

We can pipe that into nd-geojson and get a GeoJSON-compliant FeatureCollection:

```bash
% cat line-delimited.json | nd-geojson
{
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [ -115.44, 32.62 ] } },
    { "type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": [ -115.45, 32.63 ] } },
    { "type": "Feature", "properties": {}, "geometry": { "type": "LineString", "coordinates": [ [0, 0], [0, 0], [0, 0], [0, 0] ] } }
  ]
}
```
_A set of line-delimited features wrapped in a FeatureCollection_

**Install**

```bash
% npm install -g nd-geojson
```

**Kudos**

Inspired by [maxogden/ndjson](https://github.com/maxogden/ndjson) and [mcollina/split2](https://github.com/mcollina/split2).

Similar work: [mapbox/geojson-stream](https://github.com/mapbox/geojson-stream) builds a FeatureCollection from an **array** of Feature objects.

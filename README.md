# VegaLiteLabels
Adds labels to vega lite charts, rendered using SVG. I wrote this as there is no built-in support for labels in vega-lite at this time, and full vega is too complicated for others who may be creating charts in my organisation.

## Usage

Simply add a `Label` field to your chart data points, then:

```javascript
vega.embed(selector, chart, options, function(error, result) {
  AddVegaLiteLabels(result.view._scenegraph.root.items);
}
```
## Output
![chart 1](http://i.imgur.com/AtgHnCz.png)
![chart 2](http://i.imgur.com/AF4cu0z.png)

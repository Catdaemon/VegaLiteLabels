# VegaLiteLabels
Adds labels to vega lite bar charts, as there is no built-in support for this.

## Usage

Simply add a `Label` field to your chart data points, then:

```javascript
vega.embed(selector, chart, options, function(error, result) {
  AddVegaLiteLabels(result.view._scenegraph.root.items);
}
```

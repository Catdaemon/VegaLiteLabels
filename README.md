# Vega Labels
Adds labels to vega charts rendered using SVG. I wrote this as there is no easy built-in support for labels in vega-lite at this time, and full vega is too complicated for others who may be creating charts in my organisation. This supports most kinds of chart.

## Usage

Assuming we have a `Label` field in our chart data points:

```javascript
vega.embed(selector, chart, options, function(error, result) {
  vegaLabels.addLabels(result.view, "Label");
}
```

## Output
![chart 1](http://i.imgur.com/AtgHnCz.png)
![chart 2](https://i.imgur.com/ZpJebq6.png)
![chart 3](https://i.imgur.com/tBNPcBC.png)

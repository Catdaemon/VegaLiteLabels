// Do a search of the scene graph to find marks
function AddVegaLiteLabels(graph)
{
    // Supported types and their offsets
    var typeOffsets = {
        "rect": 4,
        "line": -8,
        "point": -8
    }
    // Loop through the current level
    for(var i=0; i < graph.length; ++i)
    {
        var node = graph[i];

        if (node.marktype && (typeOffsets[node.marktype]))
        {
            // Found an eligable mark
            // Loop through and create labels
            for(var x=0; x < node.items.length; ++x)
            {
                var item = node.items[x];
                var datum = item.datum;

                // See if the datum has a label field
                if (datum.Label)
                {
                    // Calculate correct position
                    var offset = typeOffsets[node.marktype] ? typeOffsets[node.marktype] : 0;
                    var posX = item.x + (item.width ? item.width / 2 : 0);

                    var posY = item.y + (item.height ? item.height / 2 : 0) + offset;

                    // Add the label
                    var textelement = d3.select(node._svg).append("text")
                        .attr("x", posX)
                        .attr("y", posY)
                        .attr("font-family", "Verdana")
                        .attr("font-size", 11)
                        .attr("fill", "black")
                        .attr("text-anchor", "middle")
                        .text(datum.Label);

                    // Update chart when the mouse moves - for zooming/panning esp. line charts
                    (function(item, textelement, offset) {
                        var func = function()
                        {
                            var posX = item.x + (item.width ? item.width / 2 : 0);
                            var posY = item.y + (item.height ? item.height / 2 : 0) + offset;

                            textelement.attr("x", posX);
                            textelement.attr("y", posY);
                        };

                        document.body.addEventListener('mousemove', func);
                        document.body.addEventListener('mousewheel', func);
                    })(item, textelement, offset);

                    
                }                        
            }
        }
        if (node.items)
        {
            // Search deeper
            AddVegaLiteLabels(node.items);
        }
    }
}

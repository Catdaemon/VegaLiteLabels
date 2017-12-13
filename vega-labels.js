var vegaLabels = {
    // Supported mark types and offsets
    typeOffsets: {
        "rect": -0.65,
        "line": -0.65,
        "point": -0.65
    },

    // Get chart orientation
    _isChartVertical: function(graph)
    {
        var vertical = 0;
        var horizontal = 0;

        // Recursive function to count the number of marks of each orientation
        function CountLevel(level)
        {
            for(var i=0; i < level.length; ++i)
            {
                var node = level[i];
                // Ensure this is a rect
                if (node.marktype && node.marktype == "rect")
                {
                    for(var x=0; x < node.items.length; ++x)
                    {
                        var item = node.items[x];
                        // Determine mark orientation
                        if ( item.height >= item.width )
                        {
                            vertical += 1;
                        } else {
                            horizontal += 1;
                        }
                    }
                }
                if (node.items)
                {
                    // If this node has children then search deeper
                    CountLevel(node.items);
                }
            }
        }
        CountLevel(graph);

        return vertical >= horizontal;
    },

    // Recursively search the graph and add labels
    _addLabels: function(graph, vertical, labelField)
    {
        // Loop through the current level
        for(var i=0; i < graph.length; ++i)
        {
            var node = graph[i];

            // Ensure this is a mark, and that it is of a supported type
            if (node.marktype && (this.typeOffsets.hasOwnProperty(node.marktype)))
            {
                // Loop through and create labels
                for(var x=0; x < node.items.length; ++x)
                {
                    var item = node.items[x];
                    var datum = item.datum;

                    // See if the datum has a label field
                    if (datum[labelField])
                    {
                        // Add the label
                        var textelement = d3.select(node._svg).append("text")
                            .attr("x", 1)
                            .attr("y", 1)
                            .attr("font-family", "Verdana")
                            .attr("font-size", 10)
                            .attr("fill", "black")
                            .attr("text-anchor", "middle")
                            .text(datum[labelField]);

                        item._svg.parentNode.insertBefore(textelement.node(), item._svg.nextSibling);

                        var textbbox = textelement.node().getBoundingClientRect();

                        item.width = item.width ? item.width : 0;
                        item.height = item.height ? item.height : 0;

                        // Calculate correct position
                        var textW = textbbox.width;
                        var textH = textbbox.height;

                        var offset = this.typeOffsets[node.marktype] ? this.typeOffsets[node.marktype] : 0;

                        var posX = item.x + (vertical ? item.width * 0.5 : item.width + (textW * offset));
                        var posY = item.y + (!vertical ? item.height * 0.65 : (textH * offset));

                        textelement.attr("x", posX);
                        textelement.attr("y", posY);

                        // Update chart when the mouse moves - for zooming/panning
                        (function(item, textelement, offset, textW, textH, vertical) {
                            var func = function()
                            {
                                var posX = item.x + (vertical ? item.width * 0.5 : item.width + (textW * offset));
                                var posY = item.y + (!vertical ? item.height * 0.65 : (textH * offset));

                                textelement.attr("x", posX);
                                textelement.attr("y", posY);
                            };

                            document.body.addEventListener('mousemove', func);
                            document.body.addEventListener('mousewheel', func);
                        })(item, textelement, offset, textW, textH, vertical);

                        
                    }                        
                }
            }
            if (node.items)
            {
                // Search deeper
                this._addLabels(node.items, vertical, labelField);
            }
        }
    },

    // Main function
    addLabels: function(view, labelField, isVertical = null)
    {
        if (!view)
            throw new Error("No view provided.");
        if (!view._scenegraph)
            throw new Error("Invalid view provided.");
        if (!labelField)
            throw new Error("No label field provided.");

        var graph = view._scenegraph.root.items;
        var vertical = isVertical === null ? this._isChartVertical(graph) : isVertical;
        this._addLabels(graph, vertical, labelField);
    }
}

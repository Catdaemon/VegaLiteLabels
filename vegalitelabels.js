function AddVegaLiteLabels(graph)
        {
            // Loop through the current level
            for(var i=0; i < graph.length; ++i)
            {
                var node = graph[i];

                if (node.marktype && (node.marktype == "rect"))
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
                            var posX = item.x + (item.width / 2);
                            var posY = item.y + (item.height / 2);

                            // Add the label
                            d3.select(node._svg).append("text")
                                .attr("x", posX)
                                .attr("y", posY + 4)
                                .attr("font-family", "Verdana")
                                .attr("font-size", 11)
                                .attr("fill", "black")
                                .attr("text-anchor", "middle")
                                .text(datum.Label);
                        }                        
                    }
                }
                if (node.items)
                {
                    // Search deeper
                    AddLabels(node.items);
                }
            }
        }

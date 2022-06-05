function forceDirected (links, nodes, sumOcc)  {
    addHeading("force", "Force Directed Graph");

    // add force directed graph
    height = window.innerHeight/3*2;
    width = window.innerWidth/3*2;

    let svg = d3.select("#force").append("div")
        .classed("svg-container", true)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", () => {
            var retval = ("0 0 " + width + " " + height);
            return retval;
        })
        .attr("class", "svg")
        .style("background-color", "#F8F9FA");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) {
            return d.id;
        }).distance(() => nodes.length * 2))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("end", setDownloadBtn(".download-force", "forceDirect", svg));

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line");
        // .attr("stroke-width", function(d) { return Math.sqrt(d.size); });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .on("click", nodeMouseClicked)
        .on("mouseenter", (evt, d) => {
            link
              .attr("display", "none")
              .filter(l => l.source.id === nodes[d].id || l.target.id === nodes[d].id)
              .attr("display", "block");
          })
          .on("mouseleave", evt => {
            link.attr("display", "block");
          });
    
    // Highlight the node and connected links on mouseover.
    function nodeMouseClicked(d) {
        const el = d3.select(this);

        if(el.classed("active")) {
            el.classed("active", false);
        } else {
            el.classed("active", true);
        }
    }

    var circles = node.append("circle")
        .attr("r", function(d) {
            let retval = d.size/sumOcc*500;
            return retval;})
        .attr("fill", "#5a5a5a");

    // Create a drag handler and append it to the node object instead
    var drag_handler = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    drag_handler(node);
    
  var lables = node.append("text")
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        // all around, to keep in the frame also the text
        .attr("cx", function(d) { return d.x = Math.max((d.size/sumOcc*500), Math.min((width) - (d.size/sumOcc*500), d.x)); })
        .attr("cy", function(d) { return d.y = Math.max((d.size/sumOcc*500), Math.min((height) - (d.size/sumOcc*500), d.y)); });
  }

    function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    }

    function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    }

    function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    }
}
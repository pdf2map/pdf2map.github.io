function wordCloud (myWords, sumOcc) {

    addHeading("cloud", "Word Cloud Graph");

    // add word cloud
    height = window.innerHeight/3*2;
    width = window.innerWidth/3*2;

    // append the svg object to the body of the page
    var svg = d3.select("#cloud").append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", function(d) {
        var retval = ("0 0 " + width + " " + height);
        return retval;
    })
    .attr("class", "svg cloud-svg")
    .style("background-color", "#F8F9FA");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    var layout = d3.layout.cloud()
        .size([width, height]) 
        .words(myWords)
        .padding(4)
        .rotate(function(d) { return 0; })
        .text(function(d) {return d.node;})
        .fontSize(function(d) {
            let sizePer = d.size/sumOcc*1000;
            return (10 + sizePer);
        })
        .on("end", setDownloadBtn(".download-cloud", "wordCloud", svg))
        // inserted from down here
        .on("word", function(d, size) {
            svg.append("g")
            .append("text")
            .text(d.text)
            .style("font-size", d.size + "px")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + [d.x, d.y] + ")")
                .classed("click-only-text", true)
                .classed("word-default", true)
                .on("click", function() {
                    var e = d3.select(this);
                    e.classed("word-selected", !e.classed("word-selected"));
                })       
                .on("mouseover", function() {
                    d3.select(this)
                    .classed("word-hovered", true)
                    .transition(`mouseover-${d.text}`).duration(300).ease(d3.easeLinear)
                })
                .on("mouseout", function() {
                    d3.select(this)
                    .classed("word-hovered", false)
                    .interrupt(`mouseover-${d.text}`)
                });
        });

        layout.start(); 
}
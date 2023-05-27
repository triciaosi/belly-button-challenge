function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
        console.log(data);

        // Create array to hold all names (all ID names)
        // let names = data.samples.map(x => x.id);
        let names = data.names
        // let otu_ids = data.samples.map(x => x.otu_ids);
        console.log(names);
        // console.log(otu_ids);
        // Append an option in the dropdown
        names.forEach(function (name) {
            d3.select('#selDataset')
                .append('option')
                .text(name)
                .property("value", name);
        })

        buildmetadata(names[0])
        buildcharts(names[0])

    })

};

init()

function buildmetadata(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
        let metadata = data.metadata
        let resultArray = metadata.filter(sampleObj => sampleObj.id == id);
        console.log(resultArray)
        let result = resultArray[0];
        let PANEL = d3.select("#sample-metadata");
        PANEL.html("")

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });


    })

}


function optionChanged(id) {
    buildmetadata(id)
    buildcharts(id)

}

function buildcharts(x) {

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
        let samples = data.samples
        let resultArray = samples.filter(sampleObj => sampleObj.id == x);
        console.log(resultArray)
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;


        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };

        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    })



}


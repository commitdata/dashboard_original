angular.module('myApp').controller('naepController', ['$scope', function ($scope) {

    /*****
    GLOBAL VARIABLES
    *****/

    $scope.hello = "world";

    var DATASETS = {},
        DATASET,
        GRADE = 4,
        SUBJECT = "READ",
        GROUP = "averageScore",
        YEAR = 10,
        STATES,
        STATEOUTLINES,
        CITIES,
        indexByStateName = {},
        indexByCityName = {},
        colorScale,
        yearScale,
        SERIES = ["averageScore", "frlScore", "ellScore", "asianScore", "blackScore", "hispanicScore", "whiteScore"];
    SELECTED = null,
    SELECTEDARRAY = [];
    TYPE = "state";
    PLAY = false,
    CITIESON = true;
    NATIONALBARS = false;
    FIRST = true;

    /*****
    INITIALIZE THE PAGE
    *****/

    $(function () {

        // Open data files.
        queue()
            .defer(d3.json, "naep/json/math4.json")
            .defer(d3.json, "naep/json/read4.json")
            .defer(d3.json, "naep/json/math8.json")
            .defer(d3.json, "naep/json/read8.json")
            .defer(d3.json, "naep/json/us-states.json")
            .defer(d3.json, "naep/json/states.json")
            .defer(d3.json, "naep/json/cities.json")
            .await(load)

        // Assign loaded data to global variables.
        function load(error, math4, read4, math8, read8, states, stateoutlines, cities) {

            if (!error) {

                DATASETS["MATH4"] = math4;
                DATASETS["READ4"] = read4;
                DATASETS["MATH8"] = math8;
                DATASETS["READ8"] = read8;
                STATES = states;
                STATEOUTLINES = stateoutlines;
                CITIES = cities;

                initialize()
            }

        }

        // Initalize the layouts and event handlers.
        function initialize() {

            DATASET = DATASETS["READ4"];

            // Create dictionaries for ease of reference.
            var nestedStateData = nest()[0]["values"]
            nestedStateData.forEach(function (state, i) { indexByStateName[state["key"]] = i })
            var nestedCityData = nest()[1]["values"]
            nestedCityData.forEach(function (city, i) { indexByCityName[city["key"]] = i })

            var eventHandler = new Object();

            // Call object prototypes.
            mapvis = new MapVis(d3.select("#mapVis"), eventHandler);
            linevis = new LineVis(d3.select("#lineVis"));
            barvis = new BarVis(d3.select("#barVis"));

            // Bind the event handler to the vis objects. 
            $(eventHandler).bind("selectionChanged", function (event, selected) {

                linevis.onSelectionChange(selected);
                barvis.onSelectionChange();

            })

            // Initialize the slider and slider labels.
            d3.select("#sliderSpan")
              .html("<input type='range' id='slider' value='" + YEAR + "' step='1' min='0' max='" + maxYear(DATASET) + "' oninput='updateYear(this.value)'>")
            initializeSliderLabels()
            updateSliderLabels()

            // Initialize chart titles.
            updateGradeTitles()
            updateYearTitles()
            updateSubjectTitles()
            d3.select("#groupMap").html(groupScale(GROUP))

        }

    })

    /*****
    PAGE ELEMENT UPDATES
    *****/

    function updateGradeTitles() {
        d3.select("#gradeMap").html(GRADE)
        d3.select("#gradeLine").html(GRADE)
        d3.select("#gradeBar").html(GRADE)
    }

    function updateSubjectTitles() {
        d3.select("#subjectMap").html(subjectScale(SUBJECT))
        d3.select("#subjectLine").html(subjectScale(SUBJECT))
        d3.select("#subjectBar").html(subjectScale(SUBJECT))
    }

    function updateYearTitles() {
        d3.select("#yearMap").html(yearScale(YEAR))
        d3.select("#yearBar").html(yearScale(YEAR))
    }

    function initializeSliderLabels() {

        d3.select("#sliderLabels")
          .append("g")
          .attr("class", "rangeAxis xAxis")
          .attr("transform", "translate(0,5)")

    }

    function updateSliderLabels() {

        // Update scales with the new dataset stats.
        yearScale = d3.scale.ordinal().domain(yearScaleDomain(DATASET))
                      .range(yearScaleRange(DATASET));

        var xScale = d3.scale.linear()
                             .range([15, 385])
                             .domain([0, maxYear()])

        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient("bottom")

        // Update the axes.    
        d3.select("#sliderLabels")
          .selectAll(".xAxis")
          .transition()
          .duration(750)
          .call(xAxis)

        d3.select("#sliderLabels")
          .selectAll(".xAxis")
          .selectAll("text")
          .text(function (d) { return yearScale(d) })
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end")
          .style("font-weight", function (d, i) { return (i == YEAR) ? "bold" : "normal" })

    }

    function updateOutlines() {

        SELECTEDARRAY = [];
        SELECTED = null;
        mapvis.updateOutlines()
        barvis.wrangleData()
        barvis.updateVis()

    }

    /*****
    USER TASKS
    *****/

    function toggleCities() {

        CITIESON = !CITIESON;
        $("#mapVis circle").each(function () { (CITIESON) ? $(this).fadeIn("slow") : $(this).fadeOut("slow") });

    }

    function toggleNationalBars() {

        NATIONALBARS = !NATIONALBARS;
        (NATIONALBARS) ? barvis.updateVisNational() : barvis.removeNationalBars()

    }

    /**
    Show or hide lines on linechart based on selected checkboxes.
    **/
    function filterLine() {

        // Figure out what is and isn't checked.
        d3.selectAll(".filterCheckbox").each(function () {

            var that = this;

            d3.select("#lineVis").selectAll("path." + this.value)
                                 .style("display", function () { return (that.checked) ? "block" : "none" });
            d3.select("#lineVis").selectAll("circle." + this.value)
                                 .style("display", function () { return (that.checked) ? "block" : "none" });

        })

    }

    function playSlider() {

        PLAY = !PLAY;

        if (PLAY) {

            d3.select("#pause").style("display", "inline");
            d3.select("#play").style("display", "none");

            var increment = 0;
            var max = maxYear(DATASET);

            var timer = setInterval(function () {

                if (increment == max || !(PLAY)) {
                    clearInterval(timer);
                    d3.select("#pause").style("display", "none");
                    d3.select("#play").style("display", "inline");
                    PLAY = false;
                }

                d3.select("#slider").property("value", increment);
                updateYear(increment)
                increment += 1;
            }, 1000);

        }

    }

    // Update the visualization with the indicated dataset.
    function updatePage() {

        datasetTemp = DATASET;

        // Gather input values.
        d3.selectAll(".dropDown").each(function (d) {

            if (this.name == "grade") { GRADE = this.value; }
            else if (this.name == "subject") { SUBJECT = this.value; }
            else if (this.name == "group") { GROUP = this.value; }

        })

        var datasetKey = SUBJECT + GRADE;

        // Access the new dataset.
        DATASET = DATASETS[datasetKey];

        // When a group is selected, the dataset doesn't change.
        // But when the dataset changes, default to the max year of the dataset.
        if (datasetTemp != DATASET) {

            YEAR = maxYear()
            document.getElementById("slider").max = YEAR;
            document.getElementById("slider").value = YEAR;
            updateSliderLabels()

        }

        // Update the visualizations. 
        mapvis.wrangleData()
        mapvis.clearValueless()
        mapvis.updateVis()
        mapvis.updateOutlines()

        linevis.initializeVis()
        if (SELECTED != null) {
            (TYPE == "state") ? linevis.wrangleData("state", indexByStateName[SELECTED]) : linevis.wrangleData("city", indexByCityName[SELECTED])
            linevis.updateVis()
        }

        barvis.wrangleData();
        barvis.updateVis();
        if (NATIONALBARS) { barvis.updateVisNational() }

        // Update chart titles.
        updateGradeTitles()
        updateSubjectTitles()
        updateYearTitles()
        d3.select("#groupMap").html(groupScale(GROUP))

    }

    /**
    Update the displayed year based on the slider selection.
    **/
    function updateYear(value) {

        YEAR = value;

        // Update each chart.

        mapvis.wrangleData("state");
        mapvis.clearValueless();
        mapvis.updateVis();
        mapvis.updateOutlines();

        linevis.tracker.attr("x1", linevis.xScale(YEAR))
                       .attr("x2", linevis.xScale(YEAR))

        barvis.wrangleData();
        barvis.updateVis();
        if (NATIONALBARS) { barvis.updateVisNational() }

        // Update chart and axis labels.
        d3.select("#sliderLabels").selectAll("text")
          .style("font-weight", function (d, i) { return (i == YEAR) ? "bold" : "normal" })
        linevis.svg.selectAll(".xAxis").selectAll("text")
               .style("font-weight", function (d, i) { return (i == YEAR) ? "bold" : "normal" })
        updateYearTitles()

    }

    /**
    CHECK BOOLEANS
    **/

    function isBarActive() { return $("#barchart").hasClass("active") ? true : false }

    /*****
    DATA WRANGLING
    *****/

    /**
    Nest the data to more easily access the data for each geographical entity.
    Use the globally recognized dataset.
    **/
    function nest() {
        return d3.nest()
                 .key(function (d) { return d.type; })
                 .key(function (d) { return d.jurisdiction; })
                 .key(function (d) { return d.year; })
                 .entries(DATASET);
    }

    /**
    Determine the maximum year of the displayed dataset.
    **/
    function maxYear() {

        var nestedData = nest();
        return nestedData[2]["values"][0]["values"].length - 1;

    }

    /**
    Find the rank of the state based on the available scores.
    **/
    function rank(state) {

        // Wrangle data.
        var nested = nest()[jurisdictionScale("state")]["values"];
        var filtered = nested.filter(function (state) { return !isNaN(state["values"][YEAR]["values"][0][GROUP]) })
        var sorted = filtered.sort(function (a, b) {
            return d3.descending(a["values"][YEAR]["values"][0][GROUP], b["values"][YEAR]["values"][0][GROUP])
        })

        // Determine state rank out of total states with data.
        var totalStates = 0;
        var sortedIndexByName = {};
        sorted.forEach(function (state, i) {
            sortedIndexByName[state["key"]] = i;
            totalStates += 1;
        })
        var stateRank = sortedIndexByName[state] + 1;

        return [stateRank, totalStates];

    }

    /*****
    SCALES
    *****/

    /**
    To access the correct type of geographical entity.
    **/
    jurisdictionScale = d3.scale.ordinal()
                                .domain(["state", "city", "nation"])
                                .range([0, 1, 2]);

    /**
    Determine the overall color based on the selected group.
    **/
    groupColorScale = d3.scale.ordinal()
                              .domain(["averageScore", "frlScore", "ellScore", "asianScore", "blackScore", "hispanicScore", "whiteScore"])
                              .range(["#92c83e", "#f15728", "#0088a3", "grey", "#003663", "#c4161c", "#fdb713"]);

    /**
    Return a clean group name given the group variable name.
    **/
    groupNameScale = d3.scale.ordinal()
                              .domain(["averageScore", "frlScore", "ellScore", "asianScore", "blackScore", "hispanicScore", "whiteScore"])
                              .range(["All Students", "FRL", "ELL", "Asian", "Black", "Hispanic", "White"])

    /**
    Given the group name variable return a group name title for the map title.
    **/
    groupScale = d3.scale.ordinal()
                         .domain(["averageScore", "frlScore", "ellScore", "asianScore", "blackScore", "hispanicScore", "whiteScore"])
                         .range(["ALL STUDENTS", "FREE AND REDUCED LUNCH", "ENGLISH LANGUAGE LEARNERS", "ASIAN", "BLACK", "HISPANIC", "WHITE"])

    /**
    Given the subject variable name return the full name of the subject.
    **/
    subjectScale = d3.scale.ordinal()
                           .domain(["READ", "MATH"])
                           .range(["READING", "MATHEMATICS"])

    yearScaleDomain = d3.scale.ordinal()
                              .domain([DATASETS["MATH4"], DATASETS["MATH8"], DATASETS["READ4"], DATASETS["READ8"]])
                              .range([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                      [0, 1, 2, 3, 4, 5, 6, 7]])

    yearScaleRange = d3.scale.ordinal()
                             .domain([DATASETS["MATH4"], DATASETS["MATH8"], DATASETS["READ4"], DATASETS["READ8"]])
                             .range([[1990, 1992, 1996, 2000, 2003, 2005, 2007, 2009, 2011, 2013],
                                     [1990, 1992, 1996, 2000, 2003, 2005, 2007, 2009, 2011, 2013],
                                     [1992, 1994, 1996, 1998, 2000, 2003, 2005, 2007, 2009, 2011, 2013],
                                     [1998, 2002, 2003, 2005, 2007, 2009, 2011, 2013]])


    stateInitialScale = d3.scale.ordinal()
                                .domain(["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
                                         "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
                                         "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
                                         "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
                                         "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
                                         "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
                                         "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyomning"])
                                .range(["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
                                        "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                                        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
                                        "VA", "WA", "WV", "WI", "WY"])

    /**
    Update the domain of the y scale based on the selected dataset.
    **/
    function yScaleDomain() {

        datasetRanges = [];
        SERIES.forEach(function (series) {
            datasetRanges.push(d3.extent(DATASET, function (d) { if (!isNaN(d[series])) return d[series] }))
        })

        return [+d3.min(datasetRanges, function (d) { return d[0] }) - 10, +d3.max(datasetRanges, function (d) { return d[1] })]

    }





    /**
Create object and define global variables.
**/
    BarVis = function (div) {

        // Assign to DOM element.
        this.element = div;

        // Dimensions.
        this.height = 400;
        this.width = 600;

        // To hold wrangled data.
        this.displayData = [];

        this.initializeVis();

    }

    /**
    Initialize the layout.
    **/
    BarVis.prototype.initializeVis = function () {

        var that = this;

        // Initialize svg.
        this.svg = this.element.append("svg")
                               .attr("width", that.width)
                               .attr("height", that.height)
                               .attr("class", "svgBars")

        // Initalize scales.

        // Initialize scale for positioning entire groups.
        this.xGroupScale = d3.scale.ordinal()
                                   .rangeRoundBands([50, 575], .2);

        // Initialize scale for positioning individual bars within each group.
        this.xBarScale = d3.scale.ordinal();

        this.yScale = d3.scale.linear()
                        .range([375, 25]);

        // Initalize color scale.
        this.colorScale = d3.scale.linear()

        // Initialize and append axes.

        this.xAxis = d3.svg.axis()
                           .scale(that.xGroupScale)
                           .orient("bottom")

        this.yAxis = d3.svg.axis()
                          .scale(that.yScale)
                          .orient("left")

        this.svg.append("g")
                .attr("class", "yAxis axis")
                .attr("transform", "translate(50,0)")

        this.svg.append("g")
                .attr("class", "xAxis axis")
                .attr("transform", "translate(0,380)")
        // Y axis label.
        this.svg.append("text")
                 .attr("x", -200)
                 .attr("y", 15)
                 .attr("transform", "rotate(-90)")
                 .attr("fill", "grey")
                 .style("text-anchor", "middle")
                 .text("SCORE")

        // Initialize tooltip.
        this.tip = d3.tip()
                     .attr("class", "d3-tip")
                     .style("font-weight", "normal")
                     .style("text-align", "left")
                     .html(function (d, name) {
                         if (!d3.selectAll(".nationalBars").empty()) {
                             return d["name"] + "<br>" + d["value"] + "<br>" + calculatePoints(d["value"], name)
                         }
                         else { return d["name"] + "<br>" + d["value"] }
                     })

        this.wrangleData();

        this.updateVis();
    }

    function calculatePoints(value, name) {
        var nationalValue = d3.selectAll(".nationalBars")[0][groupNameScale.domain().indexOf(name)]["__data__"][1]
        var difference = value - nationalValue;
        if (difference == 0) { return "Same as<br>national average" }
        else if (Math.abs(difference) == 1) { return (difference > 0) ? difference + " point above<br>national average" : (difference * -1) + " point below<br>national average" }
        else { return (difference > 0) ? difference + " points above<br>national average" : (difference * -1) + " points below<br>national average" }
    }

    /**
    Wrangle the selected dataset.
    **/
    BarVis.prototype.wrangleData = function () {

        var that = this;

        var nestedData = nest();

        this.displayData = [];

        SERIES.forEach(function (series) {

            var entry = [series];
            if (SELECTEDARRAY[0]) {
                SELECTEDARRAY.forEach(function (select) {
                    if (select[1] == "state") {
                        entry.push(+nestedData[jurisdictionScale("state")]["values"][indexByStateName[select[0]]]["values"][YEAR]["values"][0][series]);
                    }
                    else {
                        entry.push(+nestedData[jurisdictionScale("city")]["values"][indexByCityName[select[0]]]["values"][YEAR]["values"][0][series]);
                    }
                })
            }

            that.displayData.push(entry);
        })

        this.displayData.forEach(function (d) {
            d.values = SELECTEDARRAY.map(function (select, i) {
                return { name: select[0], value: d[i + 1] }
            })
        })

    }

    /**
    Update the visualization with the wrangled data.
    **/
    BarVis.prototype.updateVis = function () {

        var that = this;

        // Update scales.
        this.xGroupScale.domain(this.displayData.map(function (d) { return d[0]; }));
        var barDomain = [];
        SELECTEDARRAY.forEach(function (item) { barDomain.push(item[0]) })
        this.xBarScale.domain(barDomain)
                      .rangeRoundBands([0, that.xGroupScale.rangeBand()]);
        this.yScale.domain(yScaleDomain());
        this.colorScale.domain(yScaleDomain());

        // Update the axes.  

        this.svg.selectAll(".xAxis")
                .call(this.xAxis)
                .selectAll("text")
                .text(function (d) { return groupNameScale(d) })

        this.svg.selectAll(".yAxis")
                .transition()
                .duration(750)
                .call(this.yAxis)

        // Create and update a groupe element for each series.
        var barGroups = this.svg.selectAll(".barGroup")
                                .data(this.displayData)

        barGroups.enter()
                 .append("g")
                 .attr("class", function (d) { return "barGroup " + d[0] })
                 .attr("transform", function (d, i) { return "translate(" + that.xGroupScale(d[0]) + ",0)"; })

        // Enter, update, exit bars for each state in the selection.
        var bars = barGroups.selectAll("rect")
                            .data(function (d) { return d.values; })

        bars.enter()
            .append("rect")
            .attr("fill", "white")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr("y", 375)
            .attr("height", 0)

        bars.attr("width", that.xBarScale.rangeBand())
            .attr("x", function (d) { return that.xBarScale(d.name); })

        bars.transition().duration(750).ease("linear")
            .attr("y", function (d) { return (!isNaN(d["value"])) ? that.yScale(d["value"]) : 375 })
            .attr("height", function (d) { return (!isNaN(d["value"])) ? 375 - that.yScale(d.value) : 0 })
            .attr("fill", function (d) {
                var parentGroup = d3.select(this.parentElement);
                that.colorScale.range(["lightgrey", groupColorScale(parentGroup[0][0].classList[1])]);
                return (!isNaN(d["value"])) ? that.colorScale(d["value"]) : "white"
            })

        // When hovering over the bars.
        bars.on("mouseover", function (d) {
            // Move to end of the group element so that it becomes the topmost element.
            $(this).appendTo(this.parentNode)
            d3.select(this).attr("stroke", "black")
            if (d["value"]) { that.tip.show(d, this.parentNode.classList[1]) }
        })
            .on("mouseout", function (d) {
                d3.select(this).attr("stroke", "white")
                if (d["value"]) { that.tip.hide(d) }
            })

        // Remove bars that are no longer in the selection.
        bars.exit().remove()

        // LABELS

        var labels = barGroups.selectAll(".labelText")
                              .data(function (d) { return d["values"] })

        labels.enter()
              .append("text")
              .attr("text-anchor", "middle")
              .attr("class", "labelText")
              .attr("y", 375)

        labels.attr("x", function (d) { return that.xBarScale(d.name) + (that.xBarScale.rangeBand() / 2) })

        labels.transition().duration(750).ease("linear")
              .attr("y", function (d) { return (!isNaN(d["value"])) ? that.yScale(d["value"]) - 2 : 375 })
              .text(function (d) { return stateInitialScale(d["name"]) })

        labels.exit().remove()

        this.svg.call(this.tip);

    }

    BarVis.prototype.updateVisNational = function () {

        var that = this;

        // Wrangle the national data.
        var nestedData = nest();
        this.displayDataNational = [];

        SERIES.forEach(function (series) {
            var entry = [series];
            entry.push(+nestedData[jurisdictionScale("nation")]["values"][0]["values"][YEAR]["values"][0][series]);
            that.displayDataNational.push(entry);
        })

        // Update scales.
        this.xGroupScale.domain(this.displayData.map(function (d) { return d[0]; }));
        this.yScale.domain(yScaleDomain());
        this.colorScale.domain(yScaleDomain());

        var tip = d3.tip()
                      .attr("class", "d3-tip")
                      .style("font-weight", "normal")
                      .style("text-align", "center")
                      .html(function (d) { return "National Average<br>" + d[1] })

        // Display on bar chart.

        // Create and update a group element for each series.

        var nationalBars = this.svg.selectAll(".nationalBars")
                                   .data(this.displayDataNational)

        nationalBars.enter()
                    .append("rect")
                    .attr("class", "nationalBars")
                    .attr("y", 375)
                    .attr("height", 0)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)
                    .style("stroke-dasharray", ("1, 5"))
                    .style("stroke-linecap", "round")
                    .attr("x", function (d) { return that.xGroupScale(d[0]); })
                    .attr("width", 58)
                    .on("mouseover", tip.show)
                    .on("mouseout", tip.hide)

        nationalBars.transition().duration(750)
                    .attr("height", function (d) { return (!isNaN(d[1])) ? 375 - that.yScale(d[1]) : 0 })
                    .attr("y", function (d) { return (!isNaN(d[1])) ? that.yScale(d[1]) : 375 })

        nationalBars.exit().remove()

        this.svg.call(tip)

    }

    BarVis.prototype.onSelectionChange = function () {

        var that = this;
        this.wrangleData();
        this.updateVis();

    }

    BarVis.prototype.removeNationalBars = function () {

        this.svg.selectAll(".nationalBars")
                .transition().duration(750)
                .attr("y", 375)
                .attr("height", 0)
                .remove()

    }



    //=============================================


    /****************************

    mapVis.js
    Prototype for MapVis object.
    
****************************/

    /**
    Create the object and define global variables.
    **/
    MapVis = function (div, eventHandler) {

        // Assign to DOM element.
        this.element = div;

        // Pass event handler.
        this.eventHandler = eventHandler;

        // Dimensions.
        this.height = 400;
        this.width = 600;

        // To hold wrangled data.
        this.displayStateData = [];
        this.displayCityData = [];

        this.initializeVis()

    }

    /**
    Initialize the layout.
    **/
    MapVis.prototype.initializeVis = function () {

        var that = this;

        // Define map projection.
        this.projection = d3.geo.albersUsa()
                                .translate([(that.width) / 2, (that.height) / 2])
                                .scale([750]);

        // Define path generator.
        this.path = d3.geo.path()
                          .projection(that.projection);

        // Initialize svg.
        this.svg = this.element.append("svg")
                               .attr("width", that.width)
                               .attr("height", that.height)
                               .attr("class", "svgMap")

        // Create layers for appending elements.

        // For default state path elements. 
        this.svg.append("g").attr("id", "stateLayer")
        // For state outlines. 
        this.svg.append("g").attr("id", "outlineLayer")
        // For states that do not have a value, in order to better display the outline.
        this.svg.append("g").attr("id", "valuelessLayer")
        // For selected state(s).
        this.svg.append("g").attr("id", "selectedLayer")
        // For cities.
        this.svg.append("g").attr("id", "cityLayer")

        // Create a path element for each state.
        STATES.features.forEach(function (state) {
            that.svg.select("#stateLayer")
                    .append("path")
                    .attr("class", function () { return "stateArea " + state["properties"]["name"].replace(/\s/g, '') })
                    .attr("fill", "white")
        })

        // Update each state path with data for each state.
        this.state = that.svg.selectAll("path.stateArea")
                             .data(STATES.features)
                             .attr("d", that.path)

        // Create a contiguous border on top of the state path elements.
        this.svg.select("#outlineLayer")
                .append("path")
                .datum(topojson.mesh(STATEOUTLINES, STATEOUTLINES.objects.states, function (a, b) { return a !== b; }))
                .attr("class", "outline")
                .attr("d", that.path)

        // Initialize the legend.
        d3.select("#legendSvg").append("g")
                .attr("class", "legend")
                .attr("transform", "translate(1,10)");

        // Style the legend.
        this.legend = d3.legend.color()
                               .orient("horizontal")
                               .shapePadding(4)
                               .shapeHeight(10)
                               .labels([" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ])

        // Initialize tooltip.
        this.tip = d3.tip()
                      .attr("class", "d3-tip")
                      .style("font-weight", "normal")
                      .style("text-align", "left")
                      .html(function (d, type) {
                          // If the element is a state path...
                          if (type == "path") {
                              // If the data exists, display the state name, score, and rank.
                              if (!isNaN(d["properties"]["value"])) {
                                  return d["properties"]["name"] + "<br>" +
                                  d["properties"]["value"] + "<br>" +
                                  rank(d["properties"]["name"])[0] + " out of " + rank(d["properties"]["name"])[1]
                              }
                                  // Otherwise only display the state name.
                              else { return d["properties"]["name"] }
                          }
                              // Otherwise it is a city.
                          else { return (!isNaN(d["value"])) ? d["city"] + "<br>" + d["value"] : d["city"] }
                      })

        // Add data and update layout.
        this.wrangleData()
        this.updateVis()

    }

    /**
    Wrangle the selected dataset.
    **/
    MapVis.prototype.wrangleData = function () {

        var nestedData = nest();

        this.displayStateData = nestedData[jurisdictionScale("state")]["values"];
        this.displayCityData = nestedData[jurisdictionScale("city")]["values"];

    }

    /**
    Update the visualization with the wrangled data.
    **/
    MapVis.prototype.updateVis = function () {

        var that = this;

        this.colorScale = this.getColorScale();

        // Update the legend.
        this.legend.scale(that.colorScale)
        d3.select("#legendSvg").select(".legend").call(that.legend)

        // Set mouseover event for legend swatches.
        d3.select("#legendSvg").selectAll(".swatch")
                               .on("mouseover", function (d) {
                                   var elements = d3.selectAll(".c" + d.split("#").pop()).attr("stroke", "black");
                                   elements[0].forEach(function (elem) {
                                       if (elem.tagName == "path") { document.getElementById("selectedLayer").appendChild(elem) }
                                   })
                               })
                                .on("mouseout", function () { that.updateOutlines() })

        // STATES.

        // Assign data to each state.
        this.displayStateData.forEach(function (state, i) {

            // Store state name.
            var stateName = state["key"];

            // Grab data value, and convert from string to number.
            var stateValue = +state["values"][YEAR]["values"][0][GROUP];

            // Find the corresponding state inside the GeoJSON and assign data once state is found.
            for (var j = 0; j < STATES.features.length; j++) {

                var jsonState = STATES.features[j].properties.name;

                if (stateName == jsonState) {
                    STATES.features[j].properties.value = stateValue;
                    break;
                }

            }

        })

        // Update each state path with data for each state.
        this.state.data(STATES.features)

        // Update attributes for each state path.
        this.state.attr("class", function (d) {
            var color;
            if (d["properties"]["value"]) { color = that.colorScale(d["properties"]["value"]).split("#").pop() }
            return "stateArea pointer c" + color + " " + d["properties"]["name"].replace(/\s/g, '')
        })
                  .attr("stroke", function (d) { return (d["properties"]["value"]) ? "none" : that.valueless(this, groupColorScale(GROUP)) })

        // Transition the fill color.
        this.state.transition().duration(750).ease("linear")
                  .attr("fill", function (d) { return (d["properties"]["value"]) ? that.colorScale(d["properties"]["value"]) : "white" })

        // User tasks for state paths.
        this.state.on("mouseover", function (d) {
            that.tip.show(d, this.tagName)
            that.moveToSelectedLayer(d, this);
        })
                  .on("mouseout", function (d) {
                      that.tip.hide(d, this.tagName)
                      that.removeFromSelectedLayer(d, this);
                  })
                  .on("click", function (d) {
                      TYPE = "state";
                      that.updateGlobals(d);
                      // Update the line and bar charts with the selection(s).
                      $(that.eventHandler).trigger("selectionChanged", d["properties"]["name"]);
                      that.updateOutlines();
                  })

        // CITIES.

        // Assign data to each city.
        this.displayCityData.forEach(function (city, i) {

            // Store city name.
            var cityName = city["key"];

            // Grab data value, and convert from string to number.
            var cityValue = +city["values"][YEAR]["values"][0][GROUP];

            // Find the corresponding city inside the json.
            for (var j = 0; j < CITIES.length; j++) {

                var jsonCity = CITIES[j]["city"];

                if (cityName == jsonCity) {

                    // Copy the data value into the JSON
                    CITIES[j].value = cityValue;
                    break;
                }
            }

        })

        // add circles to svg
        var city = this.svg.select("#cityLayer")
                            .selectAll("circle")
                            .data(CITIES)

        city.enter()
            .append("circle")
            .attr("r", 10)

        city.attr("cx", function (d) { return that.projection([d.longitude, d.latitude])[0];; })
            .attr("cy", function (d) { return that.projection([d.longitude, d.latitude])[1];; })
            .attr("stroke", function (d) { return (d["value"]) ? "white" : "none" })
            .attr("stroke-width", 1)
            .attr("fill", function (d) { return (d["value"]) ? that.colorScale(d["value"]) : "none" })
            .attr("class", function (d) {
                var color;
                if (d["value"]) { color = that.colorScale(d["value"]).split("#").pop() }
                return "emphasize pointer c" + color + " " + ((d["city"].replace(/\s/g, '')).replace('(', '')).replace(')', '')
            })

        city.on("mouseover", that.tip.show)
            .on("mouseout", that.tip.hide)
            .on("click", function (d) {
                TYPE = "city";
                that.updateGlobals(d)
                // Update the line chart with the selected state.
                $(that.eventHandler).trigger("selectionChanged", d["city"])
                that.updateOutlines()
            })

        city.exit().remove()

        // Bind tooltips to svg.
        this.svg.call(this.tip);

    }

    /**
    Update global variables depending on user selection.
    **/
    MapVis.prototype.updateGlobals = function (e) {

        // Update global array for bar chart.
        if (isBarActive()) {
            var abc = [];
            SELECTEDARRAY.forEach(function (item) { abc.push(item[0]) })
            var selectedIndex;
            if (e["properties"] != null) { selectedIndex = abc.indexOf(e["properties"]["name"]) }
            else { selectedIndex = abc.indexOf(e["city"]) }

            // If the item is in the array...
            if (selectedIndex > -1) {

                // Create an array for temporary storage.
                var selectedArrayTemp = [];

                // Check each item in the existing global array to see if it's the one that has been selected.
                SELECTEDARRAY.forEach(function (item) {
                    // If it's not, copy it to the temporary array.
                    if (SELECTEDARRAY.indexOf(item) != selectedIndex) { selectedArrayTemp.push(item) }
                })

                // Copy the items in the temporary array to the global array.
                SELECTEDARRAY = selectedArrayTemp;

            }
                // If the selected item is not in the global array...
            else {

                // If the global array already has 4 items, remove the first item.
                if (SELECTEDARRAY.length == 4) { SELECTEDARRAY.shift() }

                // Add the selected item to the end of the global array.
                (TYPE == "state") ? SELECTEDARRAY.push([e["properties"]["name"], "state"]) : SELECTEDARRAY.push([e["city"], "city"])

            }
        }
        else {
            if (TYPE == "city") { (e["city"] == SELECTED) ? SELECTED = null : SELECTED = e["city"] }
            else { (e["properties"]["name"] == SELECTED) ? SELECTED = null : SELECTED = e["properties"]["name"] }
            SELECTEDARRAY = [];
            console.log(SELECTED)
        }

    }

    /**
    Only outline the states or cities that are in the current global selection.
    **/
    MapVis.prototype.updateOutlines = function () {

        var that = this;

        // Return all path and circle element outlines to their default color and layer. 
        $(".stateArea").prependTo("#stateLayer")
        d3.selectAll(".stateArea")
          .attr("stroke", function (d) {
              if (d) { return (d["properties"]["value"]) ? "none" : that.valueless(this, groupColorScale(GROUP)) }
          })
          .attr("stroke-width", 1)
        this.svg.selectAll("circle").attr("stroke", function (d) { return (d.value) ? "white" : "none" })
                                    .attr("stroke-width", 1)

        // Now outline the path(s) or circle(s) in the selection if the selection is not empty.
        // If the bar chart is showing, outline every item in the selection. 
        // Remove spaces from item name so that the document can be searched for the item class name.
        if (isBarActive()) { SELECTEDARRAY.forEach(function (item) { execOutline(item[0].replace(/\s/g, '')) }) }
            // If the line chart is showing, outline only the single selected element.
        else {
            if (SELECTED != null) {
                if (TYPE == "state") { execOutline(SELECTED.replace(/\s/g, '')) }
                else { execOutline2(((SELECTED.replace(/\s/g, '')).replace('(', '')).replace(')', '')) }
            }
        }

        function execOutline(e) {
            var elem = that.svg.selectAll("." + ((e).replace('(', '')).replace(')', ''))[0][0];
            if (elem.tagName == "path") { document.getElementById("selectedLayer").appendChild(elem) }
            d3.select(elem).attr("stroke", "black").attr("stroke-width", 2)
        }

        function execOutline2(e) {
            var elem = that.svg.selectAll("." + e)[0][0];
            d3.select(elem).attr("stroke", "black").attr("stroke-width", 2)
        }

    }

    MapVis.prototype.valueless = function (e, color) {
        document.getElementById("valuelessLayer").appendChild(e)
        return color
    }

    MapVis.prototype.clearValueless = function () {
        $("#valuelessLayer .stateArea").prependTo("#stateLayer")
    }

    MapVis.prototype.moveToSelectedLayer = function (d, element) {

        if (isBarActive()) {
            var abc = [];
            SELECTEDARRAY.forEach(function (item) { abc.push(item[0]) })
            if (abc.indexOf(d["properties"]["name"]) == -1) { execMove() }
        }

        else { if (d["properties"]["name"] != SELECTED) { execMove() } }

        function execMove() {
            document.getElementById("selectedLayer").appendChild(element)
            d3.select(element).attr("stroke", "black").attr("stroke-width", 1)
        }

    }

    MapVis.prototype.removeFromSelectedLayer = function (d, element) {

        var that = this;
        var exec = function () {
            document.getElementById("stateLayer").appendChild(element)
            d3.select(element)
              .attr("stroke", function () { return (d["properties"]["value"]) ? "none" : that.valueless(element, groupColorScale(GROUP)) })
        }

        if (isBarActive()) {
            var abc = [];
            SELECTEDARRAY.forEach(function (item) { abc.push(item[0]) })
            if (abc.indexOf(d["properties"]["name"]) == -1) { exec() }
        }
        else { if (d["properties"]["name"] != SELECTED) { exec() } }

    }

    MapVis.prototype.getColorScale = function () {

        var that = this;

        var range = [];
        var rangeScale = d3.scale.linear()
                           .domain([0, 9])
                           .range(["#d3d3d3", groupColorScale(GROUP)])
        for (i = 0; i < 10; i++) { range.push(rangeScale(i)) }

        var domain = [];
        that.displayStateData.forEach(function (d) { domain.push(+d["values"][YEAR]["values"][0][GROUP]) })
        that.displayCityData.forEach(function (d) { domain.push(+d["values"][YEAR]["values"][0][GROUP]) })

        var range2 = d3.extent(domain, function (d) { return d })
        d3.select("#lowestScore").html(range2[0])
        d3.select("#highestScore").html(range2[1])

        // Initalize color scale.
        return d3.scale.quantile().domain(domain).range(range)

    }

}]);
/**
 * XY Visualization Class for use in databound D3 (V3) Visualizations.
 */
org_scn_community_databound_XYViz.prototype = org_scn_community_databound_BaseViz;
org_scn_community_databound_XYViz.constructor = org_scn_community_databound_XYViz;
function org_scn_community_databound_XYViz(d3, options){
	var that = this;
	var properties = {
		xAxisTicks : { 
			value : 5,
			opts : {
				desc : "X-Axis Ticks",
				cat : "Axis",
				apsControl : "spinner"	
			}
		},
		yAxisTicks : { 
			value : -1,
			opts : {
				desc : "Y-Axis Ticks",
				cat : "Axis",
				apsControl : "spinner"	
			}
		},
		xAxisOrientation : { 
			value : "bottom",
			opts : {
				apsControl : "combobox",
				desc : "X-Axis Orientation",
				cat : "Axis",
				options : [{key : "bottom", text : "Bottom"},
				         {key : "top", text : "Top"}]
			}
		},
		yAxisOrientation : { 
			value : "left",
			opts : {
				apsControl : "combobox",
				desc : "Y-Axis Orientation",
				cat : "Axis",
				options : [{key : "left", text : "Left"},
				         {key : "right", text : "Right"}]
			}
		},
		maxX : {
			value : 0,
			opts : {
				desc : "X-Axis Manual Max",
				cat : "Axis",
				apsControl : "spinner"
			}
		},
		maxY : { 
			value : 0,
			opts : {
				desc : "Y-Axis Manual Max",
				cat : "Axis",
				apsControl : "spinner"
			}
		},
		minX : { 
			value : 0,
			opts : {
				desc : "X-Axis Manual Min",
				cat : "Axis",
				apsControl : "spinner"
			}
		},
		minY : { 
			value : 0,
			opts : {
				desc : "Y-Axis Manual Min",
				cat : "Axis",
				apsControl : "spinner"
			}
		},
		measureX : { 
			value : "",
			opts : {
				desc : "X-Axis Measure",
				cat : "Data",
				apsControl : "text"
			} 
		},
		measureY : { 
			value : "",
			opts : {
				desc : "Y-Axis Measure",
				cat : "Data",
				apsControl : "text"
			} 
		}
	};
	for(var prop in options) properties[prop] = options[prop];
	org_scn_community_databound_BaseViz.call(this,d3,properties);

	var parentPreReq = this.preReqCheck;
	this.preReqCheck = function(){
		var status = parentPreReq.apply(this);
		if(!status.success) return status;
		if(this.flatData.columnHeaders.length<2) return {
			success : false,
			reason : "I need at least 2 measures"
		};
		if(this.measureX() != "" && this.measureX() == this.measureY()) return {
			success : false,
			reason : "X and Y Axis Measures should not be the same."
		}
		return status;
	};
	var parentUpdatePlot = this.updatePlot;
	this.updatePlot = function() {
		this.updateAxes();
		parentUpdatePlot.apply(this);
		return this;
	};
	/**
	 * Update X/Y Axis
	 */
	this.updateAxes = function(){
		var xTicks = this.xAxisTicks();
		var yTicks = this.yAxisTicks();
		var that = this;
		// D3 time
		var vals = [];
		vals = this.flatData.values.slice();
		var mx = this.measureX();
		var my = this.measureY();
		var mxIndex = 0;
		var myIndex = 1;
		for(var i=0;i<this.flatData.columnHeaders.length;i++){
			if(this.flatData.columnHeaders[i] == mx) mxIndex = i;
			if(this.flatData.columnHeaders[i] == my) myIndex = i;
		}
		this.xVals = [];
		this.yVals = [];
		for(var i=0;i<vals.length;i++){
			var currentRow = vals[i];
			this.xVals.push(currentRow[mxIndex]);
			this.yVals.push(currentRow[myIndex]);
		}
		var reverseXDomain = [(this.minX() || d3.min(this.xVals)), (this.maxX() || d3.max(this.xVals))];
		this.xScale
			.domain(reverseXDomain)	
			.range([0, (this.dimensions.plotWidth)]);
		reverseXDomain[0] = this.xScale.invert(this.zoomXScale.domain()[0]);
		reverseXDomain[1] = this.xScale.invert(this.zoomXScale.domain()[1]);
		this.xScale.domain(reverseXDomain);

		this.xAxis = d3.svg.axis()
			.scale(this.xScale)
			.orient(this.xAxisOrientation())
			.tickSize(6/*,-this.dimensions.plotHeight*/);
		if(xTicks > 0) this.xAxis.ticks(xTicks);
		this.xAxisGroup.call(this.xAxis);
		var maxh = 0;
		this.xAxisGroup.selectAll("text").each(function() {
		    if(this.getBBox().height > maxh) maxh = this.getBBox().height;
		});
		this.dimensions.xAxisHeight = maxh + 6 + 3;
		
		var reverseDomain = [this.maxY() || d3.max(this.yVals),this.minY() || d3.min(this.yVals)];
		this.yScale
			.domain(reverseDomain)	
			.range([0,(this.dimensions.plotHeight - this.dimensions.xAxisHeight)]);
		
		reverseDomain[0] = this.yScale.invert(this.zoomYScale.domain()[0]);
		reverseDomain[1] = this.yScale.invert(this.zoomYScale.domain()[1]);
		
		this.yScale.domain(reverseDomain);
		
		this.yAxis = d3.svg.axis()
	    	.scale(this.yScale)
	    	.orient(this.yAxisOrientation())
	    	.tickSize(6/*, -this.dimensions.plotWidth*/);
		if(yTicks > 0) this.yAxis.ticks(yTicks);
		this.yAxisGroup.call(this.yAxis);
		var maxw = 0;
		this.yAxisGroup.selectAll("text").each(function() {
		    if(this.getBBox().width > maxw) maxw = this.getBBox().width;
		});
		this.dimensions.yAxisWidth = maxw + 6 + 3;
		// Update X range now that we know y-axis width
		this.xScale.range([0, (this.dimensions.plotWidth - this.yAxisWidth)]);
		this.xAxis.scale(this.xScale);
		this.xAxisGroup.call(this.xAxis);
		
		this.xScale
			//.domain([(this.minX() || d3.min(this.xVals)), (this.maxX() || d3.max(this.xVals))])	
			.range([0, (this.dimensions.plotWidth-this.dimensions.yAxisWidth)]);
		
		this.xAxis = d3.svg.axis()
			.scale(this.xScale)
			.orient(this.xAxisOrientation())
			.tickSize(6/*,-this.dimensions.plotHeight*/);
		if(xTicks > 0) this.xAxis.ticks(xTicks);
		return this;
	}
	/**
	 * Update Legend
	 */
	this.updateLegend = function(){
		this.legendLabel.text(this.legendTitle());
		return this;

	};
	this.displayMessage = function(message){
		this.messageText.text(message);
		this.messageGroup
			.attr("display", "inline")
			.transition().duration(this.ms())
			.attr("opacity", 1);
	}
	var parentInit = this.init;
	this.init = function(){
		parentInit.apply(this);
		/*
		 * Axes
		 */
		this.yAxisGroup = this.plotArea.append("g")
			.attr("class", "y axis")
			.attr("id",this.$().attr("id")+"_yaxis");
		this.xAxisGroup = this.plotArea.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this.dimensions.plotHeight + ")")
			.attr("id",this.$().attr("id")+"_xaxis");
		this.$().addClass("VizXY");
	}
};
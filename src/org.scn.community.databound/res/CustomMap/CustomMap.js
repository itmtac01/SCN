/**
 * Copyright 2014 Scn Community Contributors
 * 
 * Original Source Code Location:
 *  https://github.com/org-scn-design-studio-community/sdkpackage/
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License. 
 */
 
//%DEFINE-START%
var scn_pkg="org.scn.community.";if(sap.firefly!=undefined){scn_pkg=scn_pkg.replace(".","_");}
define([
	"sap/designstudio/sdk/component",
	"./CustomMapSpec",
	"../../../"+scn_pkg+"shared/modules/component.core",
	"../../../"+scn_pkg+"shared/modules/component.basics",
	"../../../"+scn_pkg+"shared/modules/component.databound",
	"../../../"+scn_pkg+"databound/os/jquery.imagemapster/jquery.imagemapster",
	"../../../"+scn_pkg+"databound/os/d3v3/d3.min",
	"../../../"+scn_pkg+"shared/os/jsrender/jsrender"
	],
	function(
		Component,
		spec,
		core,
		basics
	) {
//%DEFINE-END%

var myComponentData = spec;

var CSS_CLASS_DIV = "scn-sdk-CustomMap";
var CSS_CLASS_IMG = "scn-sdk-CustomMap-Image";

CustomMap = function () {

	var that 					= this;
	
	var _redrawStatus 			= false;
	var _firstRun	 			= true;
	
	var _mapsterCurrW 			= 0;
	var _mapsterCurrH 			= 0;
	
	var _attributeBeforeUpdate 	= {};
	
	var _selectedZonesArray 	= [];
	var _selectedZonesString 	= "";
	var _hoveredZone 			= "";
	
	var _dataUpdated 			= false;
	var _referenceKFUpdated 	= false;
	var _processData			= false;
	
	var _mapsterJson 			= {};
	
	var dataForTmpl 			= [];
		
	that.init = function() {
		// define root component
		org_scn_community_basics.fillDummyDataInit(that, that.initAsync);
		
		that._firstRun = true;
		that._redrawStatus = false;
		that._selectedZonesArray = [];
		that._selectedZonesString = "";
		that._hoveredZone = "";
		
		that._mapsterCurrW = 0;
		that._mapsterCurrH = 0;
		
		that._mapsterJson = {};
		
		//Override Data and DataCellList get/set function with custom made to catch updates
		that._originalDataFunction = that.data;
		that.data = function(value) {
			that._originalDataFunction(value);
			if (typeof value != "undefined")
				that._dataUpdated = true;
		}
		
		that._originalDataCellListFunction = that.dataCellList;
		that.dataCellList = function(value) {
			that._originalDataCellListFunction(value);
			if (typeof value != "undefined")
				that._referenceKFUpdated = true;
		}
		
		//zen/mimes/CM5/
	};
	
	that.initAsync = function (owner) {
		var that = owner;
		org_scn_community_component_Core(that, myComponentData);

		/* COMPONENT SPECIFIC CODE - START(initDesignStudio)*/
		that.$().addClass(CSS_CLASS_DIV);
		
			
		/* COMPONENT SPECIFIC CODE - END(initDesignStudio)*/
	};

	that.zoneSelected = function(e) {
		var itemIndex = that._selectedZonesArray.indexOf(e.key);
		if (itemIndex == -1) {
			that._selectedZonesArray.push(e.key);
		} else {
			that._selectedZonesArray.splice(itemIndex, 1); 
		}
		
		that._selectedZonesString = "";
		for (var i in that._selectedZonesArray) {
			var sep = "";
			if (i > 0)
				sep = ",";
			that._selectedZonesString = that._selectedZonesString + sep + that._selectedZonesArray[i];
		}
		var changedProperties = ["selectedZones"];
		that.setSelectedZones(that._selectedZonesString);
		that.firePropertiesChangedAndEvent(changedProperties, "onClick");
	};
	
	that.handleMouseMovement = function(data, action) {
		var changedProp = ["hoveredZone"];
		
		switch(action) {
			case "onMouseOut": {
				that._hoveredZone = ""
					break;
			}
			case "onMouseOver":
			case "onShowTooltip":
				that._hoveredZone = data.key;
				break;
			default:
				return;
		}
		that.setHoveredZone(that._hoveredZone);
		that.firePropertiesChangedAndEvent(changedProp, action);
	};
	
	that.onShowTooltip = function(data) {

		that.handleMouseMovement(data, "onShowTooltip" );
		
		//		if(that.getOverrideTooltip()) {
//		var tmpl = $.templates(that.getContentTooltip());
//		
//		var dataSelection = {};
//		if (that.dataForTmpl.hasOwnProperty(data.key)) {
//			dataSelection.line = [that.dataForTmpl[data.key]];
//		}
//		
//		var html = tmpl.render(dataSelection);
//		
//		data.toolTip.empty();
//		data.toolTip.append(jQuery.parseHTML(html));
//	}
	};
	
	that.maspterMouseOver = function(data) {
		that.handleMouseMovement(data, "onMouseOver" );
	};
	
	that.maspterMouseOut = function(data) {
		that.handleMouseMovement(data, "onMouseOut" );
	};
	
	that.splitText = function(dimensionKeyText) {
		var dimkeySplit = dimensionKeyText.split(" | ");
		var result = {
				key: "",
				text:""
		};
		
		if (dimkeySplit.length > 1) {
			result.key 		= dimkeySplit[0];
			result.text 	= dimkeySplit[1];
		} else {
			result.key 		= dimensionKeyText;
		}
		
		return result;
	};
	
	that.processData = function (flatData, afterPrepare, owner) {
		var that = owner;
		
		if(flatData == undefined) {
			var options = org_scn_community_databound.initializeOptions();
			options.ignoreResults = false;

			flatData = org_scn_community_databound.flatten(that.getData(),options);
			org_scn_community_databound.toRowTable(flatData, options);
		}
		
		//.key or .text
		if (flatData.dimensionRows.length > 0) {
			
			//Main dimension, the first one. The others will be added as a table
			var rowMeta = flatData.dimensionRows[0];
			
			//columnHeaders contains text of KF
			//columnHeadersKeys contains keys of KF
			
			that.dataForTmpl = {};
			
			var lastDimKey = "";
			var dimAttributes = {};
			
			//Populate attributes tables with internal key as table key
			for(var iDim in flatData.dimensionRows) {
				var dim = flatData.dimensionRows[iDim];
				
				if (dim.dimension.hasOwnProperty("attributes")) {
					//Loop at each member to find the correct dim
					
					//Name of the IO
					dimAttributes[dim.key] = {};
					for (var index_dim in dim.dimension.members) {

						//Ignore totals
						if (dim.dimension.members[index_dim].key == "SUMME") {
							continue;
						}
						
						var attributes = dim.dimension.members[index_dim].attributeMembers;
						
						dimAttributes[dim.key][dim.dimension.members[index_dim].key] = {};
						var attrContent = dimAttributes[dim.key][dim.dimension.members[index_dim].key];
						
						console.log(dim.key + " / " + dim.dimension.members[index_dim].key);
						
						for(var iAttr in attributes) { 
							attrContent[dim.dimension.attributes[iAttr].key + "_KEY"] 	= attributes[iAttr].key;
							attrContent[dim.dimension.attributes[iAttr].key + "_TEXT"] 	= attributes[iAttr].text;
						}
					}
				}
			}
			
			//Loop at data2D and build template data
			var data2DStructure 		= {};
			data2DStructure.total 		= [];
			//var data2DCopy 		= flatData.data2D.slice();
			
			sap.common.globalization.NumericFormatManager.setPVL(that.data.locale);
			
			for (var i in rowMeta.dimension.members) {
				//loop at each members of the first Dim, and populate its data
				var member 						= rowMeta.dimension.members[i];
				
				var tableKey 					= member.key;
				data2DStructure[tableKey] 		= {};
				
				//Build corresponding detailed lines
				data2DStructure[tableKey].lines = [];
				data2DStructure[tableKey].total = [];
				
				data2DStructure[tableKey].attributes				= dimAttributes[rowMeta.key][member.key];
				
				var dimKeyText = that.splitText(member.text);
				
				data2DStructure[tableKey]["DIM_" + rowMeta.key + "_INTERNAL_KEY"] 	= member.key;
				data2DStructure[tableKey]["DIM_" + rowMeta.key + "_KEY"] 			= dimKeyText.key;
				data2DStructure[tableKey]["DIM_" + rowMeta.key + "_TEXT"] 			= dimKeyText.text; //empty if only key or text
				
				var hasSum = false;
				
				for(var j in flatData.data2D) {
					
					if (member.key != flatData.data2D[j].raw[0]) {
						continue;
					}
					//data2DStructure[tableKey].lines[j] 				= {};
					//data2DStructure[tableKey].lines[j].raw 			= flatData.data2D[j].raw;
					//data2DStructure[tableKey].lines[j].values 		= flatData.data2D[j].values;
					
					var lineID = data2DStructure[tableKey].lines.length;
					data2DStructure[tableKey].lines[lineID] = {};
					
					that.transformDataToTemplate(j, data2DStructure[tableKey].lines[lineID], flatData, true, true);
					
					//keep track of the total
					if (data2DStructure[tableKey].total.length == 0) {
						data2DStructure[tableKey].total 			=  flatData.values[j].slice();
					} else {
						for (var k in data2DStructure[tableKey].total) {
							data2DStructure[tableKey].total[k] 		+= flatData.values[j][k];
						}
					}
					
					if (flatData.dimensionRows.length > 1 && flatData.data2D[j].raw[1] == "SUMME") {
						//data2DStructure[tableKey].total 			= {};
						//data2DStructure[tableKey].total.raw 		= flatData.data2D[j].raw;
						//data2DStructure[tableKey].total.values 		= flatData.data2D[j].values;
						
						that.transformDataToTemplate(j, data2DStructure[tableKey], flatData, false, true);
						hasSum = true;
						
						that.transformDataToTemplate(j, data2DStructure[tableKey].total, flatData, false, true);
						
						//Take sum from data
						//for (var k in flatData.columnHeadersKeys) {
						//	data2DStructure[tableKey]["MES_" + flatData.columnHeadersKeys[k] + "_FORMATED"] = flatData.formattedValues[j][k];
						//	data2DStructure[tableKey]["MES_" + flatData.columnHeadersKeys[k] + "_RAW"] = flatData.values[j][k];
						//}
					}
					
					//grand total
					if (data2DStructure.total.length == 0)  {
						data2DStructure.total 			=  flatData.values[j].slice();
					} else {
						for (var k in data2DStructure.total)
							data2DStructure.total[k]    = flatData.values[j][k];
					}
				}
				
				if (!hasSum) {
					//Local totals. Note % will be wrong ... but can be calculated with MES_***_TOTAL_RAW
					for (var k in data2DStructure[tableKey].total) {
						data2DStructure[tableKey]["MES_" + flatData.columnHeadersKeys[k] + "_RAW"] 			= data2DStructure[tableKey][k];
						
						data2DStructure[tableKey]["MES_" + flatData.columnHeadersKeys[k] + "_FORMATED"] 	= sap.common.globalization.NumericFormatManager.format(
																												data2DStructure[tableKey].total[k],
																												flatData.dimensionCols[0].dimension.members[k].formatString);
					}
				}
			}
			
			data2DStructure.totalStruc = {};
			//Grand total
			for (var k in data2DStructure.total) {
				data2DStructure.totalStruc["MES_" + flatData.columnHeadersKeys[k] + "_TOTAL_RAW"] 			= data2DStructure.total[k];
				
				if (flatData.dimensionCols[0].dimension.members[k].hasOwnProperty("formatString"))
					data2DStructure.totalStruc["MES_" + flatData.columnHeadersKeys[k] + "_TOTAL_FORMATED"] 	= sap.common.globalization.NumericFormatManager.format(
																										data2DStructure.total[k],
																										flatData.dimensionCols[0].dimension.members[k].formatString);
			}
			
			that.dataForTmpl = data2DStructure;
		}
	};
	
	that.transformDataToTemplate = function(pIndex, pResult, pFlatData, pGenDim, pGenKF) {
		//Dimensions
		if (pGenDim) {
			for(var i in pFlatData.rowHeadersKeys2D[pIndex]) {
				pResult["DIM_" + pFlatData.dimensionHeadersKeys[i] + "_INTERNAL_KEY"] 	= pFlatData.rowHeadersKeys2D[pIndex][i];
				var keyText = that.splitText(pFlatData.rowHeaders2D[pIndex][i]);
				pResult["DIM_" + pFlatData.dimensionHeadersKeys[i] + "_KEY"] 			= keyText.key;
				pResult["DIM_" + pFlatData.dimensionHeadersKeys[i] + "_TEXT"] 			= keyText.text;
			}
		}
		
		
		//Keys figures
		if (pGenKF) {
			for(var i in pFlatData.columnHeadersKeys) {
				pResult["MES_" + pFlatData.columnHeadersKeys[i] + "_RAW"] 				= pFlatData.values[pIndex][i];
				pResult["MES_" + pFlatData.columnHeadersKeys[i] + "_FORMATED"] 		= pFlatData.formattedValues[pIndex][i];
			}
		}
		
		//data2DStructure[tableKey]["DIM_" + rowMeta.key + "_KEY"] 
		//["MES_" + flatData.columnHeadersKeys[k] + "_RAW"]
	}
	
	that.beforeUpdate = function() {
		that._redrawStatus = false;
		
		that.saveProperties();		
	};
	
	that.saveProperties = function () {
		that._attributeBeforeUpdate = {};
		for (var i in that.props) {
			that._attributeBeforeUpdate[i] = that.props[i].actualValue;
		}
		
		that._dataUpdated 			= false;
		that._referenceKFUpdated 	= false;
		that._processData 			= false;
	};
	
	that.checkNeedRedraw = function() {	
		
		if(that._firstRun) {
			that._firstRun = false;
			that._processData = true;
			return true;
		}
		
		for(var i in that._attributeBeforeUpdate) {
			switch(i) {
				case "image":
				case "applyColors":
				case "colorPalette":
				case "map":
				case "contentTooltip":
				case "mapsterpropjson":
				case "staticDisplay":
				case "activateOnMouseOverOut":	
				case "tooltipMode":
					that._redrawStatus = that.props[i].actualValue != that._attributeBeforeUpdate[i];
			}
			
			if (that._redrawStatus)
				break;
		}
		if (!that._redrawStatus) {
			that._redrawStatus = that._dataUpdated || that._referenceKFUpdated;
			that._processData = that._redrawStatus;
		}
			
		
		return that._redrawStatus;
	};
	
	that.afterPrepare = function() {
		
	}
	
	that.afterUpdate = function() {
		/* COMPONENT SPECIFIC CODE - START(afterDesignStudioUpdate)*/
		var that = this;
		
		console.log("after update");
		
		/* COMPONENT SPECIFIC CODE - START(afterDesignStudioUpdate)*/

		/* COMPONENT SPECIFIC CODE - START(afterDesignStudioUpdate)*/
		
		if (that.checkNeedRedraw()) {			
			if (that._processData && org_scn_community_databound.hasData(that.getData())) {
				org_scn_community_basics.fillDummyData(that, that.processData, function() {});
			}
				
			that.redraw();
			that.fireEvent("onUpdate");
		}
		
		//org_scn_community_basics.resizeContentAbsoluteLayout(that, that._canvas, that.onResize);
		//that._mapsterResize();
		
		org_scn_community_basics.resizeContentAbsoluteLayout(that, that.$()[0], that.onResize);
		
		//call resize
		if (that.getAutoResize())
			that.onResize(this.$().width(), this.$().height(), "");
	};
	
	that.compareForPalette = function(a,b) {
	 if (a.value < b.value)
		    return -1;
		  else if (a.value > b.value)
		    return 1;
		  else 
		    return 0;
	};
	
	
	that.redraw = function() {
		that.$().empty();
		
		//Destroy old tooltips not linked to the new Maspter context
		var tooltips = $(".mapster_tooltip").remove();
		
		//if (that.getAutoResize()) {
		//	that.$().removeClass();
		//} else 
		//	that.$().addClass(CSS_CLASS_DIV);
		
		//Build image
		var image = that.getImage();
		if(image === "undefined" || image == "") {
			that.$().append($("<p>Please select an image</p>"));
			return;
		}
		
		that._image = $("<image id=\"myimage\" src=\"" + image + "\" usemap=\"#scn-CustomMap\"/>");
		var tmpImage = that._image[0];
		that.$().append(that._image);
		
		var map = that.getMap();
		that._map = $("<map name=\"scn-CustomMap\">" + map + "<map/>");
		that._map.children().each(function(index) {
			//loop at each area and add / Modify href
			$( this ).attr("href", "#");
		});
		
		that.$().append(that._map);
		
		var mapsterProp = that.getMapsterpropjson();
		that._mapsterJson = JSON.parse(mapsterProp);
		
		that._mapsterJson.onClick = function (e) {
			that.zoneSelected(e);
		};
		
		if (that.getActivateOnMouseOverOut()) {
			that._mapsterJson.onMouseover = function (data) {
				that.maspterMouseOver(data);
			};
			
			that._mapsterJson.onMouseout = function (data) {
				that.maspterMouseOut(data);
			};
		}		
		
		that._mapsterJson.onShowToolTip = that.onShowTooltip;
		
		//that._dsmetadata = that.getDSMetadata();
		//that._data = that.getData();
	
		that.updateTooltips();
		that.applyPalette();
		that.applyStaticDisplay();

		that._image.mapster(that._mapsterJson)
		  .mapster('set',true,that._selectedZonesString)
		  ;
	};
	
	that.applyStaticDisplay = function() {
		if (that.getStaticDisplay()) {
			that._mapsterJson.staticState = true;
			
			for(var i in that._mapsterJson.areas) {
				that._mapsterJson.areas[i].staticState = true;
			}
		}
	}
	
	that.applyPalette = function() {
		
		if (!that.getApplyColors())
			return;
		
		var options = org_scn_community_databound.initializeOptions();
		var metaData = that.getDSMetadata;
		var maxDataInfo = org_scn_community_databound.getTopBottomElements(that.getDataCellList(),that.getDataCellList(), options);
	
		//maxDataInfo.list.sort(that.compareForPalette);
		
		//Loop at array and calculate according
		
		var scale = d3.scale.quantile()
							.domain([maxDataInfo.minValue, maxDataInfo.maxValue])
							.range(that.getColorPalette().split(','));
		
		for(var i in that._mapsterJson.areas) {
			
			var area = that._mapsterJson.areas[i];
			
			var color = "";
			for(var j in maxDataInfo.list) {
				if (maxDataInfo.list[j].key == area.key)
					area.fillColor = scale(maxDataInfo.list[j].value).substr(1);
			}
		}
	}
	
	that.updateTooltips = function() {

		if(that.getTooltipMode() != "Default") {
			//Loop on mapster data, if tooltip: override.
			
			var tmpl = "";
			
			if (that.getTooltipMode() == "override") {
				tmpl = $.templates(that.getContentTooltip());
			}
			 
			for(var i in that._mapsterJson.areas) {
				
				var area = that._mapsterJson.areas[i];
				
				if (that.getTooltipMode() == "keep+template" && area.hasOwnProperty("toolTip")) {
					//else
					tmpl = $.templates(area.toolTip);
				} 
				
				var dataSelection = {};
				if (that.dataForTmpl.hasOwnProperty(area.key)) {
					dataSelection = that.dataForTmpl[area.key];
					if (that.dataForTmpl.hasOwnProperty("SUMME")) {
						dataSelection.total = that.dataForTmpl["SUMME"];
					} else 
						dataSelection.total = that.dataForTmpl.totalStruc;
				}
				//if (that.dataForTmpl.hasOwnProperty(area.key)) {
				//	dataSelection.line = [that.dataForTmpl[area.key]];
				//}
				
				area.toolTip = tmpl.render(dataSelection);
			}
		}
	}

	that.onResize = function (width, height, parent) {
		if (!that.getAutoResize())
			return;
		
		if (!that.getImage()) {
			return;
		}
		
		var ratio = Math.min(width / that._image.width(), height / that._image.height());

		that._mapsterCurrW = that._image.width()*ratio;
		that._mapsterCurrH = that._image.height()*ratio;
		
		that._image.mapster('resize', that._mapsterCurrW, that._mapsterCurrH, that.getResizeDuration());
	};

	/* COMPONENT SPECIFIC CODE - END METHODS*/

	// called from Additional Properties Sheet JavaScript file

	org_scn_community_component_Core(that, myComponentData);
	
	return that;
};
//%INIT-START%
myComponentData.instance = CustomMap;
Component.subclass(myComponentData.fullComponentName, myComponentData.instance);


});
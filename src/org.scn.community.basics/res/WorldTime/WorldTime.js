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
 
 (function(){

var myComponentData = org_scn_community_require.knownComponents.basics.WorldTime;

WorldTime = function () {

	var that = this;
	
	that.init = function() {
		// define root component

		org_scn_community_basics.fillDummyDataInit(that, that.initAsync);		
	};
	
	that.initAsync = function (owner) {
		var that = owner;
		org_scn_community_component_Core(that, myComponentData);
	
		/* COMPONENT SPECIFIC CODE - START(initDesignStudio)*/
		// that.addStyleClass("scn-pack-?");
		that._jqThis = that.$();
		that.interval_id = undefined;
		
		that._ownid = that._jqThis[0].id + "_c";
		/* COMPONENT SPECIFIC CODE - END(initDesignStudio)*/
	};

	that.afterUpdate = function() {
		/* COMPONENT SPECIFIC CODE - START(afterDesignStudioUpdate)*/

		// org_scn_community_basics.resizeContentAbsoluteLayout(that, that._oRoot, that.onResize);

		org_scn_community_basics.fillDummyData(that, that.processData, that.afterPrepare);
	};
	
	/* COMPONENT SPECIFIC CODE - START METHODS*/

	that.processData = function (flatData, afterPrepare, owner) {
		var that = owner;
		
		// processing on data
		that.afterPrepare(that);
	};

	that.afterPrepare = function (owner) {
		var that = owner;
			
		// visualization on processed data
		
		//add DIV
		that.$().html('<div id="'+that._ownid+'">'+calcTime(that, that.getUtcoffset())+'</div>');
		//remember element
		$div = document.getElementById(that._ownid);
		
		//setup interval call only once in case of multiple update calls!
		if(that.interval_id === undefined){
			that.interval_id = setInterval(function(){
				$div.innerHTML = calcTime(that, that.getUtcoffset());
			}
			, that.getInterval());
		}
	};

	that.onResize = function (width, height, parent) {
		// in case special resize code is required
	};

	/**
	 * @function componentDeleted
	 */
	that.componentDeleted = function(){
		$div = null;
		clearInterval(that.interval_id);
		that.$().remove('#'+that._ownid);
	};
	

	/**
	 * @function to calculate local time given the UTC offset
	 * @memberOf org.scn.community.basics.WorldTime
	 */
	function calcTime(owner, offset) {	
		var that = owner;
		
		var result = null;

	    // create Date object for current location
	    d = new Date();
	    
	    // convert to msec
	    // add local time zone offset 
	    // get UTC time in msec
	    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	    
	    //handle daylight saving
	    if (d.dst() && that.getDaylightsaving()){
	    	offset = parseInt(offset)+1;
	    }
	    
	    // create new Date object for different city
	    // using supplied offset
	    nd = new Date(utc + (3600000*offset));
	    
	    var options = that.getOptionsByParameters(that);
	    
	    // return time as a string
	    if(options.defTime === true){
	    	result = nd.toLocaleTimeString();
	    }else if(options.defDate === true){
	    	result = nd.toLocaleString();
	    }else{
	    	var saveLocale = that.getLocale();
	    	if(saveLocale === 'enUS' || saveLocale === 'en-US'){
	    		if(options.hideTime === true){
			    	result = nd.toLocaleString('en-US', options);
	    		}else{
			    	result = nd.toLocaleTimeString('en-US', options);	
	    		}
		    }else if(saveLocale === 'deDE' || saveLocale === 'de-DE'){
		    	if(options.hideTime === true){
			    	result = nd.toLocalString('de-DE', options);
		    	}else{
			    	result = nd.toLocaleTimeString('de-DE', options);	
		    	}
		    }else{
		    	if(options.hideTime === true){
		    		result = nd.toLocaleString(navigator.language, options);
		    	}else{
		    		result = nd.toLocaleTimeString(navigator.language, options);
		    	}
		    }
	    }
	    
	    return result;

	}
	/**
	 * Code extracted from http://javascript.about.com/library/bldst.htm
	 */
    Date.prototype.stdTimezoneOffset = function() {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    /**
	 * Code extracted from http://javascript.about.com/library/bldst.htm
	 */
    Date.prototype.dst = function() {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }

	/**
	 * @function setup date display options
	 * @memberOf org.scn.community.basics.WorldTime
	 */
	that.getOptionsByParameters = function (owner){
		var that = owner;
		var options = {};
		
		var saveDateFormat = that.getDateformat().replace(".", "");
		if(saveDateFormat === 'ddmmyy'){
	    	options.day = '2-digit';
	    	options.month = '2-digit';
	    	options.year = '2-digit';
	    }else if(saveDateFormat === 'dd.mm'){
	    	options.day = '2-digit';
	    	options.month = '2-digit';
	    }else if(saveDateFormat === 'mm.yy'){
	    	options.month = '2-digit';
	    	options.year = '2-digit';
	    }else if(saveDateFormat === 'hide'){
	    	options.hideDate = true;
	    }else if(saveDateFormat === 'default'){
	    	options.defDate = true;
	    }else{
	    	if(window.console){
		    	console.log('date format string not supported: '+saveDateFormat);
	    	}
	    }
	    
		var saveTimeFormat = that.getTimeformat().replace(":", "");
		
	    if(saveTimeFormat === 'hhmmss'){
	    	options.hour = '2-digit';
	    	options.minute = '2-digit';
	    	options.second = '2-digit';
	    }else if(saveTimeFormat === 'hhmm'){
	    	options.hour = '2-digit';
	    	options.minute = '2-digit';
	    }else if(saveTimeFormat === 'hide'){
	    	options.hideTime = true;
	    }else if(saveTimeFormat === 'default'){
	    	options.defTime = true;
	    }else{
	    	if(window.console){
		    	console.log('time format string not supported: '+saveTimeFormat);
	    	}
	    }
	    
	    if(that.getShowtimezonename() === true){
	    	options.timeZone = 'UTC';
	    	options.timeZoneName = 'short';
	    }
		
		return options;
	}

	/* COMPONENT SPECIFIC CODE - END METHODS*/
	return that;
};

define([myComponentData.requireName], function(basicsworldtime){
	myComponentData.instance = WorldTime;
	return myComponentData.instance;
});

}).call(this);
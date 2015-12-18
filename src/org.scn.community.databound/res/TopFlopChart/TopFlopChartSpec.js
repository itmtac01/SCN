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
define([],
function() {

	var spec = {
		id: "TopFlopChart",
		name: "databound.TopFlopChart",
		requireName: "databoundtopflopchart",
		fullComponentName: "org.scn.community.databound.TopFlopChart",
		fullComponentPackage: "org.scn.community.databound/res/TopFlopChart",
		script: "org.scn.community.databound/res/TopFlopChart/TopFlopChart",
		scriptSpec: "org.scn.community.databound/res/TopFlopChart/TopFlopChartSpec",
		min: false
	};

	spec.spec = 
{
  "addCounter": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Add Counter",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Add Counter",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "allowInteraction": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Allow Any Interaction (Link, Selection)",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Allow Any Interaction (Link, Selection)",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "averagePrefix": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Prefix For Average Value",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Prefix For Average Value",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "averageSuffix": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Suffix For Average Value",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Suffix For Average Value",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "breakOnAverage": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Place An Empty Area After Average Is Matched",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Place An Empty Area After Average Is Matched",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": false,
    "visible": true
  },
  "breakOnIndex": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Display",
      "desc": "Place An Empty Area After Index",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Place An Empty Area After Index",
      "ztlFunction": "",
      "ztlType": "int"
    },
    "template": "int",
    "type": "int",
    "value": -1,
    "visible": true
  },
  "dataCellList": {
    "options": {
      "includeData": "true",
      "includeFormattedData": "true"
    },
    "opts": {
      "cat": "Data",
      "desc": "Data List",
      "noAps": true,
      "noZtl": true,
      "tooltip": "Data List",
      "type": "data",
      "value": null,
      "ztlFunction": ""
    },
    "type": "ResultCellList",
    "value": "null",
    "visible": true
  },
  "deltaValueSuffix": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Delta Value Suffix Text",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Delta Value Suffix Text",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "fallbackPicture": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Url For The Fallback Picture",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Url For The Fallback Picture",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "Url",
    "type": "Url",
    "value": "",
    "visible": true
  },
  "fixedAverage": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Display",
      "desc": "Fixed Average Value (-1 For Calculated Average)",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Fixed Average Value (-1 For Calculated Average)",
      "ztlFunction": "",
      "ztlType": "int"
    },
    "template": "int",
    "type": "int",
    "value": -1,
    "visible": true
  },
  "maxNumber": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Display",
      "desc": "Maximum Number",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Maximum Number",
      "ztlFunction": "",
      "ztlType": "int"
    },
    "template": "int",
    "type": "int",
    "value": 3,
    "visible": true
  },
  "maxValueSize": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Display",
      "desc": "Maximal Size Of The Value Area In Px",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Maximal Size Of The Value Area In Px",
      "ztlFunction": "",
      "ztlType": "int"
    },
    "template": "int",
    "type": "int",
    "value": -1,
    "visible": true
  },
  "onPress": {
    "opts": {
      "apsControl": "text",
      "cat": "Events",
      "desc": "Event For On Press",
      "noAps": true,
      "noZtl": true,
      "tooltip": "Event For On Press"
    },
    "template": "Event",
    "type": "ScriptText",
    "value": "",
    "visible": true
  },
  "onSelectionChanged": {
    "opts": {
      "apsControl": "text",
      "cat": "Events",
      "desc": "Event For On Selection Changed",
      "noAps": true,
      "noZtl": true,
      "tooltip": "Event For On Selection Changed"
    },
    "template": "Event",
    "type": "ScriptText",
    "value": "",
    "visible": true
  },
  "pressedKey": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Technical Proprty For Pressed Key",
      "noAps": true,
      "noZtl": false,
      "tooltip": "Technical Proprty For Pressed Key",
      "ztlFunction": "-get",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": false
  },
  "selectedKey": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Technical Proprty For Selected Key",
      "noAps": true,
      "noZtl": false,
      "tooltip": "Technical Proprty For Selected Key",
      "ztlFunction": "-get",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": false
  },
  "showAverage": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Show Average Information",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Show Average Information",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "showDelta": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Show Delta Value In Item",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Show Delta Value In Item",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "topBottom": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Display",
      "choiceType": "MemberSelection",
      "desc": "Top X, Bottom X Or Both",
      "noAps": false,
      "noZtl": false,
      "options": [
        {
          "key": "Top",
          "text": "Top"
        },
        {
          "key": "Bottom",
          "text": "Bottom"
        },
        {
          "key": "Both",
          "text": "Both"
        }
      ],
      "tooltip": "Top X, Bottom X Or Both",
      "ztlFunction": "",
      "ztlType": "Choice"
    },
    "template": "Choice",
    "type": "String",
    "value": "Both",
    "visible": true
  },
  "useBackground": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Mark Background",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Mark Background",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": false,
    "visible": true
  },
  "useDelta": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Use Delta As Value",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Use Delta As Value",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": false,
    "visible": true
  },
  "usePictures": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Display",
      "desc": "Use Pictures",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Use Pictures",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "template": "boolean",
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "valueDecimalPlaces": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Display-Value",
      "choiceType": "DecimalPlaces",
      "desc": "Value Decimal Places",
      "noAps": false,
      "noZtl": false,
      "options": [
        {
          "key": "D0",
          "text": "0"
        },
        {
          "key": "D1",
          "text": "1"
        },
        {
          "key": "D2",
          "text": "2"
        },
        {
          "key": "D3",
          "text": "3"
        },
        {
          "key": "D4",
          "text": "4"
        },
        {
          "key": "D5",
          "text": "5"
        },
        {
          "key": "D6",
          "text": "6"
        },
        {
          "key": "D7",
          "text": "7"
        },
        {
          "key": "D8",
          "text": "8"
        },
        {
          "key": "D9",
          "text": "9"
        }
      ],
      "tooltip": "Value Decimal Places",
      "ztlFunction": "",
      "ztlType": "Choice"
    },
    "template": "Choice",
    "type": "String",
    "value": "D0",
    "visible": true
  },
  "valuePrefix": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Value Prefix Text",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Value Prefix Text",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "valueStart": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Display",
      "desc": "Text / Value Split Point In Px",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Text / Value Split Point In Px",
      "ztlFunction": "",
      "ztlType": "int"
    },
    "template": "int",
    "type": "int",
    "value": 80,
    "visible": true
  },
  "valueSuffix": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Value Suffix Text",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Value Suffix Text",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  }
};

	spec.specInclude = 
{};

	spec.specAbout = 
{
  "description": "Data Top Flop Chart 2.0",
  "icon": "TopFlopChart.png",
  "title": "Data Top Flop Chart 2.0",
  "topics": [
    {
      "content": "Data Top Flop Chart 2.0",
      "title": "Data Top Flop Chart 2.0"
    },
    {
      "content": "This component is a visualization component. It requires specific space in the application canvas.",
      "title": "Visualization"
    }
  ]
};

	spec.specComp = 
{
  "databound": true,
  "extension": "Component",
  "group": "ScnCommunityVisualizations",
  "handlerType": "sapui5",
  "height": "190",
  "id": "TopFlopChart",
  "package": "databound",
  "parentControl": "sap.zen.commons.layout.AbsoluteLayout",
  "require": [{
    "id": "common_basics",
    "space": "known"
  }],
  "title": "Data Top Flop Chart 2.0",
  "tooltip": "Data Top Flop Chart 2.0",
  "width": "225"
};

	return spec;
});// End of closure

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

define(["../require_loader"], function() {

	org_scn_community_require.knownComponents.basics.FishEye = {
		id: "FishEye",
		name: "basics.FishEye",
		requireName: "basicsfisheye",
		fullComponentName: "org.scn.community.basics.FishEye",
		fullComponentPackage: "org.scn.community.basics/res/FishEye",
		script: "org.scn.community.basics/res/FishEye/FishEye",
		scriptSpec: "org.scn.community.basics/res/FishEye/FishEyeSpec",
		min: false
	};

	org_scn_community_require.knownComponents.basics.FishEye.spec = 
{
  "cleanAll": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Internal",
      "desc": "Clean All Elements",
      "noAps": true,
      "noZtl": false,
      "refDesc": "Elements",
      "refProperty": "elements",
      "refValue": "[]",
      "tooltip": "Clean All Elements",
      "ztlFunction": "-clean",
      "ztlType": "boolean"
    },
    "type": "boolean",
    "value": false,
    "visible": false
  },
  "defaultImage": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Default Image Url",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Url For Default Image (must Be Set)",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "Url",
    "type": "Url",
    "value": "",
    "visible": true
  },
  "elements": {
    "opts": {
      "apsControl": "array",
      "arrayDefinition": {"element": {
        "key": {
          "desc": "Unique Key",
          "type": "String"
        },
        "sequence": "key,text,url",
        "text": {
          "desc": "Given Text",
          "type": "String"
        },
        "type": "Array",
        "url": {
          "desc": "Given Url",
          "type": "Url"
        }
      }},
      "arrayMode": "OneLevelArray",
      "cat": "Content",
      "desc": "Elements",
      "tooltip": "List of Elements",
      "ztlFunction": "",
      "ztlType": "SingleArray"
    },
    "type": "String",
    "value": "[]",
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
  "orientation": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Display",
      "choiceType": "OrientationType",
      "desc": "Orientation",
      "noAps": false,
      "noZtl": false,
      "options": [
        {
          "key": "HorizontalTop",
          "text": "Horizontal & Top"
        },
        {
          "key": "HorizontalBottom",
          "text": "Horizontal & Bottom"
        }
      ],
      "tooltip": "Orientation",
      "ztlFunction": "",
      "ztlType": "Choice"
    },
    "template": "Choice",
    "type": "String",
    "value": "HorizontalBottom",
    "visible": true
  },
  "selectedKey": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Technical Property For Selected Key",
      "noAps": true,
      "noZtl": false,
      "tooltip": "Technical Property For Selected Key",
      "ztlFunction": "-get",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": false
  }
};

	org_scn_community_require.knownComponents.basics.FishEye.specInclude = 
{};

	org_scn_community_require.knownComponents.basics.FishEye.specAbout = 
{
  "description": "Fish Eye",
  "icon": "FishEye.png",
  "title": "Fish Eye 2.0",
  "topics": [
    {
      "content": "Fish Eye",
      "title": "Fish Eye"
    },
    {
      "content": "This component is a visualization component. It requires specific space in the application canvas.",
      "title": "Visualization"
    }
  ]
};

	org_scn_community_require.knownComponents.basics.FishEye.specComp = 
{
  "databound": false,
  "extension": "Component",
  "group": "ScnCommunityBasics",
  "handlerType": "sapui5",
  "height": "100",
  "id": "FishEye",
  "package": "basics",
  "parentControl": "sap.ui.commons.layout.AbsoluteLayout",
  "require": [{
    "id": "common_basics",
    "space": "known"
  }],
  "title": "Fish Eye 2.0",
  "tooltip": "Fish Eye",
  "width": "300"
};

});// End of closure

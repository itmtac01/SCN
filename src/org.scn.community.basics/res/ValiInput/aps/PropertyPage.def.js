ApsContent = function () {
	var that = this; 
	
	that.componentData = {

"specComp" : 
{
  "databound": false,
  "extension": "Component",
  "group": "ScnCommunityBasics",
  "handlerType": "sapui5",
  "height": "22",
  "id": "ValiInput",
  "package": "basics",
  "parentControl": "sap.ui.commons.TextField",
  "require": [
    {
      "id": "common_basics",
      "space": "known"
    },
    {
      "id": "validate",
      "space": "known"
    }
  ],
  "title": "Validated Input Field 2.0",
  "tooltip": "Validated Input Field",
  "width": "300"
},

"spec" : 
{
  "DDefault": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Default Value",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Default Value (required For Default Validation)",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "DLength": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Display",
      "desc": "Length",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Length (required For Length Validation)",
      "ztlFunction": "",
      "ztlType": "int"
    },
    "template": "int",
    "type": "int",
    "value": 10,
    "visible": true
  },
  "DNumber": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Number",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Number (required For Than Validation)",
      "ztlFunction": "",
      "ztlType": "float"
    },
    "template": "float",
    "type": "float",
    "value": 10,
    "visible": true
  },
  "DTooltip": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Tooltip",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Tooltip",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "DValidState": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Display",
      "choiceType": "ValidationState",
      "desc": "Valid State (for Custom)",
      "noAps": false,
      "noZtl": false,
      "options": [
        {
          "key": "None",
          "text": "None"
        },
        {
          "key": "Error",
          "text": "Error"
        },
        {
          "key": "Success",
          "text": "Success"
        },
        {
          "key": "Warning",
          "text": "Warning"
        }
      ],
      "tooltip": "Valid State, Only For Custom Validation",
      "ztlFunction": "",
      "ztlType": "Choice"
    },
    "template": "Choice",
    "type": "String",
    "value": "None",
    "visible": true
  },
  "DValidation": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Display",
      "choiceType": "-",
      "desc": "Validation Type",
      "noAps": false,
      "noZtl": false,
      "options": [
        {
          "key": "none",
          "text": "none"
        },
        {
          "key": "default",
          "text": "default"
        },
        {
          "key": "custom",
          "text": "custom"
        },
        {
          "key": "numeric",
          "text": "numeric"
        },
        {
          "key": "integer",
          "text": "integer"
        },
        {
          "key": "decimal",
          "text": "decimal"
        },
        {
          "key": "maxlength",
          "text": "max_length"
        },
        {
          "key": "minlength",
          "text": "min_length"
        },
        {
          "key": "exactlength",
          "text": "exact_length"
        },
        {
          "key": "greaterthan",
          "text": "greater_than"
        },
        {
          "key": "lessthan",
          "text": "less_than"
        },
        {
          "key": "alpha",
          "text": "alpha"
        },
        {
          "key": "alphanumeric",
          "text": "alpha_numeric"
        },
        {
          "key": "alphadash",
          "text": "alpha_dash"
        },
        {
          "key": "isnatural",
          "text": "is_natural"
        },
        {
          "key": "isnaturalnozero",
          "text": "is_natural_no_zero"
        },
        {
          "key": "validip",
          "text": "valid_ip"
        },
        {
          "key": "validbase64",
          "text": "valid_base64"
        },
        {
          "key": "validurl",
          "text": "valid_url"
        }
      ],
      "tooltip": "Predefined Typs Of Input Validation",
      "ztlFunction": "",
      "ztlType": "Choice"
    },
    "template": "Choice",
    "type": "String",
    "value": "none",
    "visible": true
  },
  "DValue": {
    "opts": {
      "apsControl": "text",
      "cat": "Display",
      "desc": "Value",
      "noAps": false,
      "noZtl": false,
      "tooltip": "Value",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "template": "String",
    "type": "String",
    "value": "",
    "visible": true
  },
  "onChanged": {
    "opts": {
      "apsControl": "text",
      "cat": "Events",
      "desc": "Event For On Changed",
      "noAps": true,
      "noZtl": true,
      "tooltip": "Event For On Changed"
    },
    "template": "Event",
    "type": "ScriptText",
    "value": "",
    "visible": true
  }
}, 

"specInclude" : 
{}, 

"specAbout" : 
{
  "description": "Validated Input Field",
  "icon": "ValiInput.png",
  "title": "Validated Input Field 2.0",
  "topics": [
    {
      "content": "Validated Input Field",
      "title": "Validated Input Field"
    },
    {
      "content": "This component is a visualization component. It requires specific space in the application canvas.",
      "title": "Visualization"
    }
  ]
}

};

	org_scn_community_component_Core(that, that.componentData);
    
	return that;
};
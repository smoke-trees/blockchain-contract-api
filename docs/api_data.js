define({ "api": [
  {
    "type": "get",
    "url": "/getDeviceAtIndex",
    "title": "Returns the deviceID of the device at a particular index",
    "name": "GetDeviceAtIndex",
    "group": "Blockchain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "index",
            "description": "<p>The index of the device whose ID is to be returned</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>deviceID of the device at the specified index.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"result\": \"OK\", \"data\": \"0x7AAF1FD79329c3Ba3fEab3FBbfdA0eb9C01344Ae }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Blockchain"
  },
  {
    "type": "get",
    "url": "/getDeviceCount",
    "title": "Returns the number of devices on the Blockchain",
    "name": "GetDeviceCount",
    "group": "Blockchain",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>Number of devices present in the Smart Contract data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"result\": \"OK\", \"data\": 4 }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Blockchain"
  },
  {
    "type": "get",
    "url": "/getDeviceData",
    "title": "Returns access hash of event data associated with the saved device at the given timestamp.",
    "name": "GetDeviceData",
    "group": "Blockchain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>The ID of the device whose timestamps are to be fetched. MUST be an ethereum account hash.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "time",
            "description": "<p>The timestamp of the event, MUST be present in the list returned from GetDeviceTimeStamp.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Access hash of event data associated with the saved device at the given timestamp.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"result\":\"OK\",\"data\":\"1f0c7c1ea08a40dea7ebeb709c3a892363e850c961cd2588680a287b474f25d4\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Blockchain"
  },
  {
    "type": "get",
    "url": "/isDevicePresent",
    "title": "Whether a particular device is present in the Smart Contract data or not.",
    "name": "GetDevicePresent",
    "group": "Blockchain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>A unique identifier for the device. MUST be an ethereum account address.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>Whether the device is present or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"result\": \"OK\", \"data\": true}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Blockchain"
  },
  {
    "type": "get",
    "url": "/getDeviceTimeStamp",
    "title": "Returns all event timestamps for a particular device",
    "name": "GetDeviceTimeStamp",
    "group": "Blockchain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>The ID of the device whose timestamps are to be fetched. MUST be an ethereum account hash.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "data",
            "description": "<p>Timestamps associated with the device. (Array of Strings)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"result\":\"OK\",\"data\":[\"1553360429\",\"1553362664\",\"1553379044\",\"1553397089\",\"1553421704\"]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Blockchain"
  },
  {
    "type": "get",
    "url": "/getSavedEvent",
    "title": "Returns the data stored on Swarm",
    "name": "GetSavedEvent",
    "group": "Swarm",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessHash",
            "description": "<p>The access hash associated with uploaded data to Swarm.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "eventStatus",
            "description": "<p>Whether a human was detected or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "eventData",
            "description": "<p>Further information about the event.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"eventStatus\": true, \"eventData\": \"wauu terorist\", \"result\": \"OK\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Swarm"
  },
  {
    "type": "post",
    "url": "/sendEvent",
    "title": "Send an event to the smart proxy, where it gets uploaded to swarm, returns an access hash, and saves the access hash to a Smart Contract.",
    "name": "PostSendEvent",
    "group": "Swarm",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "eventStatus",
            "description": "<p>Whether a human was detected or not.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "eventData",
            "description": "<p>Further information about the event.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceId",
            "description": "<p>A unique identifier for the device. MUST be an ethereum account address.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"eventStatus\": true, \"eventData\": \"Suspicious individuals detected\", \"deviceId\": \"0x7AAF1FD79329c3Ba3fEab3FBbfdA0eb9C01344Ae\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>Request result.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Returned access hash to the saved data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"result\": \"OK\", \"data\": \"55df7gs7n9bv8ktg805bnm436v9gm74yld54\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "INTERNAL",
            "description": "<p>SERVER ERROR There was some or the other error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\"result\": \"INTERNAL SERVER ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/index.js",
    "groupTitle": "Swarm"
  }
] });

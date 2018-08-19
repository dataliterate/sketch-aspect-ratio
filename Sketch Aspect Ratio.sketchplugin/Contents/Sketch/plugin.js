var __globals = this;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAspectRatioRepeat = exports.setAspectRatioList = exports.setAspectRatioManual = undefined;

var _setAspectRatioManual = require('./setAspectRatioManual');

var _setAspectRatioManual2 = _interopRequireDefault(_setAspectRatioManual);

var _setAspectRatioList = require('./setAspectRatioList');

var _setAspectRatioList2 = _interopRequireDefault(_setAspectRatioList);

var _setAspectRatioRepeat = require('./setAspectRatioRepeat');

var _setAspectRatioRepeat2 = _interopRequireDefault(_setAspectRatioRepeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setAspectRatioManual = _setAspectRatioManual2.default;
exports.setAspectRatioList = _setAspectRatioList2.default;
exports.setAspectRatioRepeat = _setAspectRatioRepeat2.default;

},{"./setAspectRatioList":2,"./setAspectRatioManual":3,"./setAspectRatioRepeat":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAspectRatioList;

var _setAspectRatioForSelection = require('../utils/setAspectRatioForSelection');

var _sketchUi = require('../utils/sketch-ui');

var _ratios = require('../resources/ratios.js');

var ratios = _interopRequireWildcard(_ratios);

var _options = require('../utils/options');

var OPTIONS = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setAspectRatioList(context) {
  var selection = context.selection;

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers');
    return;
  }

  // Load Options
  var options = (0, OPTIONS.default)();

  var ratioSelection = options[OPTIONS.RATIO_SELECTION] || 0;
  var keepSelection = options[OPTIONS.KEEP_SELECTION] || 0;
  var renameSelection = options[OPTIONS.RENAME_SELECTION] || 0;

  var alert = (0, _sketchUi.createAlert)(context, 'Set Aspect Ratio', 'Change the aspect ratio of the selected layers', 'icon.png');
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120));

  var ratioValues = [];

  ratios.ratios.forEach(function (ratio) {
    ratioValues.push(ratio.x + ':' + ratio.y);
  });

  var uiSelectRatio = (0, _sketchUi.createSelect)(ratioValues, ratioSelection, NSMakeRect(0, 98, 250, 22), true);
  listView.addSubview(uiSelectRatio);

  var keepValues = ['Width', 'Height'];
  var uiSelectKeep = (0, _sketchUi.createSelect)(keepValues, keepSelection, NSMakeRect(150, 40, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('Keep', NSMakeRect(0, 40, 80, 22), 12, true));
  listView.addSubview(uiSelectKeep);

  var renameValues = ['Yes', 'No'];
  var uiSelectRename = (0, _sketchUi.createSelect)(renameValues, renameSelection, NSMakeRect(150, 10, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('Append Ratio to Name', NSMakeRect(0, 10, 140, 22), 12, true));
  listView.addSubview(uiSelectRename);

  alert.addAccessoryView(listView);
  alert.addButtonWithTitle('Change Aspect Ratio');
  alert.addButtonWithTitle('Cancel');

  var responseCode = alert.runModal();
  if (responseCode != '1000') {
    // eslint-disable-line eqeqeq
    return;
  }

  var ratioValueIndex = uiSelectRatio.indexOfSelectedItem();

  var keepValueIndex = uiSelectKeep.indexOfSelectedItem();
  var renameValueIndex = uiSelectRename.indexOfSelectedItem();

  var ratio1 = ratios.ratios[ratioValueIndex].x;
  var ratio2 = ratios.ratios[ratioValueIndex].y;

  var keep = 'width';
  if (keepValueIndex === 1) {
    keep = 'height';
  }

  var rename = true;
  if (renameValueIndex === 1) {
    rename = false;
  }

  options[OPTIONS.RATIO_SELECTION] = uiSelectRatio.indexOfSelectedItem();
  options[OPTIONS.RATIO_1] = ratio1;
  options[OPTIONS.RATIO_2] = ratio2;
  options[OPTIONS.KEEP_SELECTION] = uiSelectKeep.indexOfSelectedItem();
  options[OPTIONS.KEEP] = keep;
  options[OPTIONS.RENAME_SELECTION] = uiSelectRename.indexOfSelectedItem();
  options[OPTIONS.RENAME] = rename;

  // Save Options
  (0, OPTIONS.default)(options);

  (0, _setAspectRatioForSelection.setAspectRatioForSelection)(selection, [ratio1, ratio2], keep, rename);
}

},{"../resources/ratios.js":6,"../utils/options":7,"../utils/setAspectRatioForSelection":8,"../utils/sketch-ui":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAspectRatioManual;

var _setAspectRatioForSelection = require('../utils/setAspectRatioForSelection');

var _sketchUi = require('../utils/sketch-ui');

var _options = require('../utils/options');

var OPTIONS = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setAspectRatioManual(context) {
  var selection = context.selection;

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers');
    return;
  }

  // Load Options
  var options = (0, OPTIONS.default)();

  var ratio1Selection = options[OPTIONS.RATIO_MANUAL_1] - 1 || 0;
  var ratio2Selection = options[OPTIONS.RATIO_MANUAL_2] - 1 || 0;
  var keepSelection = options[OPTIONS.KEEP_SELECTION] || 0;
  var renameSelection = options[OPTIONS.RENAME_SELECTION] || 0;

  var alert = (0, _sketchUi.createAlert)(context, 'Set Aspect Ratio', 'Change the aspect ratio of the selected layers', 'icon.png');
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120));

  var ratioValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  var uiSelectRatio1 = (0, _sketchUi.createSelect)(ratioValues, ratio1Selection, NSMakeRect(0, 98, 100, 22), true);
  var uiSelectRatio2 = (0, _sketchUi.createSelect)(ratioValues, ratio2Selection, NSMakeRect(150, 98, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('to', NSMakeRect(115, 98, 20, 22), 12, true));
  listView.addSubview(uiSelectRatio1);
  listView.addSubview(uiSelectRatio2);

  var keepValues = ['Width', 'Height'];
  var uiSelectKeep = (0, _sketchUi.createSelect)(keepValues, keepSelection, NSMakeRect(150, 40, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('Keep', NSMakeRect(0, 40, 80, 22), 12, true));
  listView.addSubview(uiSelectKeep);

  var renameValues = ['Yes', 'No'];
  var uiSelectRename = (0, _sketchUi.createSelect)(renameValues, renameSelection, NSMakeRect(150, 10, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('Append Ratio to Name', NSMakeRect(0, 10, 140, 22), 12, true));
  listView.addSubview(uiSelectRename);

  alert.addAccessoryView(listView);
  alert.addButtonWithTitle('Change Aspect Ratio');
  alert.addButtonWithTitle('Cancel');

  var responseCode = alert.runModal();
  if (responseCode != '1000') {
    // eslint-disable-line eqeqeq
    return;
  }

  var ratioValue1Index = uiSelectRatio1.indexOfSelectedItem();
  var ratioValue2Index = uiSelectRatio2.indexOfSelectedItem();

  var keepValueIndex = uiSelectKeep.indexOfSelectedItem();
  var renameValueIndex = uiSelectRename.indexOfSelectedItem();

  var ratio1 = ratioValue1Index + 1;
  var ratio2 = ratioValue2Index + 1;

  var keep = 'width';
  if (keepValueIndex === 1) {
    keep = 'height';
  }

  var rename = true;
  if (renameValueIndex === 1) {
    rename = false;
  }

  options[OPTIONS.RATIO_MANUAL_1] = ratio1;
  options[OPTIONS.RATIO_MANUAL_2] = ratio2;
  options[OPTIONS.RATIO_1] = ratio1;
  options[OPTIONS.RATIO_2] = ratio2;
  options[OPTIONS.KEEP_SELECTION] = uiSelectKeep.indexOfSelectedItem();
  options[OPTIONS.KEEP] = keep;
  options[OPTIONS.RENAME_SELECTION] = uiSelectRename.indexOfSelectedItem();
  options[OPTIONS.RENAME] = rename;

  // Save Options
  (0, OPTIONS.default)(options);

  (0, _setAspectRatioForSelection.setAspectRatioForSelection)(selection, [ratio1, ratio2], keep, rename);
}

},{"../utils/options":7,"../utils/setAspectRatioForSelection":8,"../utils/sketch-ui":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAspectRatioRepeat;

var _setAspectRatioForSelection = require('../utils/setAspectRatioForSelection');

var _options = require('../utils/options');

var OPTIONS = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setAspectRatioRepeat(context) {
  var selection = context.selection;

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers');
    return;
  }

  // Load Options
  var options = (0, OPTIONS.default)();

  var ratio1 = options[OPTIONS.RATIO_1] || 1;
  var ratio2 = options[OPTIONS.RATIO_2] || 1;
  var keep = options[OPTIONS.KEEP] || 'width';
  var rename = options[OPTIONS.RENAME] || false;

  if (rename == 1) {
    rename = true;
  } else if (rename == 0) {
    rename = false;
  }

  log(rename);

  (0, _setAspectRatioForSelection.setAspectRatioForSelection)(selection, [ratio1, ratio2], keep, rename);
}

},{"../utils/options":7,"../utils/setAspectRatioForSelection":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HKSketchFusionExtension = undefined;

var _commands = require('./commands');

var commands = _interopRequireWildcard(_commands);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var HKSketchFusionExtension = exports.HKSketchFusionExtension = {
  name: 'Aspect Ratio',
  bundleName: 'Sketch Aspect Ratio',
  description: 'Set preset or custom aspect ratios for a selected layer.',
  author: 'CL/precious design studio',
  authorEmail: 'christoph.labacher@precious-forever.com',
  version: '1.0.1',
  identifier: 'com.precious-forever.sketch-aspect-ratio',
  menu: {
    'isRoot': false,
    'items': ['setAspectRatioList', 'setAspectRatioManual', 'setAspectRatioRepeat']
  },
  commands: {
    setAspectRatioRepeat: {
      name: 'Repeat with last options',
      shortcut: '',
      run: commands.setAspectRatioRepeat
    },
    setAspectRatioManual: {
      name: 'Set Aspect Ratio manually',
      shortcut: '',
      run: commands.setAspectRatioManual
    },
    setAspectRatioList: {
      name: 'Set Aspect Ratio',
      shortcut: '',
      run: commands.setAspectRatioList
    }
  }
};

__globals.___setAspectRatioRepeat_run_handler_ = function (context, params) {
  HKSketchFusionExtension.commands['setAspectRatioRepeat'].run(context, params);
};

__globals.___setAspectRatioManual_run_handler_ = function (context, params) {
  HKSketchFusionExtension.commands['setAspectRatioManual'].run(context, params);
};

__globals.___setAspectRatioList_run_handler_ = function (context, params) {
  HKSketchFusionExtension.commands['setAspectRatioList'].run(context, params);
};

/*__$begin_of_manifest_
{
    "name": "Aspect Ratio",
    "bundleName": "Sketch Aspect Ratio",
    "description": "Set preset or custom aspect ratios for a selected layer.",
    "author": "CL/precious design studio",
    "authorEmail": "christoph.labacher@precious-forever.com",
    "version": "1.0.1",
    "identifier": "com.precious-forever.sketch-aspect-ratio",
    "menu": {
        "isRoot": false,
        "items": [
            "setAspectRatioList",
            "setAspectRatioManual",
            "setAspectRatioRepeat"
        ]
    },
    "commands": [
        {
            "identifier": "setAspectRatioRepeat",
            "handler": "___setAspectRatioRepeat_run_handler_",
            "script": "plugin.js",
            "name": "Repeat with last options",
            "shortcut": ""
        },
        {
            "identifier": "setAspectRatioManual",
            "handler": "___setAspectRatioManual_run_handler_",
            "script": "plugin.js",
            "name": "Set Aspect Ratio manually",
            "shortcut": ""
        },
        {
            "identifier": "setAspectRatioList",
            "handler": "___setAspectRatioList_run_handler_",
            "script": "plugin.js",
            "name": "Set Aspect Ratio",
            "shortcut": ""
        }
    ],
    "disableCocoaScriptPreprocessor": true
}__$end_of_manifest_
*/

},{"./commands":1}],6:[function(require,module,exports){
"use strict";

module.exports = {
  ratios: [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 10, y: 16 }, { x: 16, y: 10 }, { x: 16, y: 9 }, { x: 2, y: 3 }, { x: 21, y: 9 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 9, y: 16 }, { x: 9, y: 2 }]
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (newOptions) {

  //set new options
  if (newOptions) {
    OPTIONS.forEach(function (key) {

      //save into user defaults
      if (newOptions.hasOwnProperty(key)) {
        NSUserDefaults.standardUserDefaults().setObject_forKey(newOptions[key], 'SketchAspectRatio_' + key);
      }
    });

    //sync defaults
    NSUserDefaults.standardUserDefaults().synchronize();
  }

  //get options
  var options = {};
  OPTIONS.map(function (key) {

    //get options from user defaults
    var option = NSUserDefaults.standardUserDefaults().objectForKey('SketchAspectRatio_' + key);

    //convert to correct type and set
    if (option) {
      options[key] = parsePrimitives(String(option));
    }
  });

  return options;
};

/**
 * Options library
 *
 * Provides functionality to get and set user options shared across the plugin.
 */

var RATIO_1 = exports.RATIO_1 = 'ratio1';
var RATIO_2 = exports.RATIO_2 = 'ratio2';

var RATIO_SELECTION = exports.RATIO_SELECTION = 'ratioSelection';

var RATIO_MANUAL_1 = exports.RATIO_MANUAL_1 = 'ratioManual1';
var RATIO_MANUAL_2 = exports.RATIO_MANUAL_2 = 'ratioManual2';

var KEEP_SELECTION = exports.KEEP_SELECTION = 'keepSelection';
var KEEP = exports.KEEP = 'keep';

var RENAME_SELECTION = exports.RENAME_SELECTION = 'renameSelection';
var RENAME = exports.RENAME = 'rename';

var OPTIONS = [RATIO_SELECTION, RATIO_1, RATIO_2, RATIO_MANUAL_1, RATIO_MANUAL_2, KEEP_SELECTION, KEEP, RENAME_SELECTION, RENAME];

/**
 * Gets or sets the stored options in user defaults.
 *
 * @returns {Object}
 */


function parsePrimitives(value) {

  if (value == '') {
    return value;
  } else if (value == 'true') {
    value = true;
  } else if (value == 'false') {
    value = false;
  } else if (value == 'null') {
    value = null;
  } else if (value == 'undefined') {
    value = undefined;
  } else if (!isNaN(value) && value != '') {
    value = parseFloat(value);
  }

  return value;
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAspectRatioForSelection = setAspectRatioForSelection;
function setAspectRatioForSelection(selection, ratio, keep, appendRatioToName) {
  selection.forEach(function (layer) {
    var frame = layer.frame();
    var width = frame.width();
    var height = frame.height();

    var ratioX = 1;
    var ratioY = 1;

    if (ratio) {
      ratioX = ratio[0];
      ratioY = ratio[1];
    }

    if (keep === 'height') {
      var newWidth = height * (ratioX / ratioY);
      layer.frame().setWidth(newWidth);
    } else {
      var newHeight = width / (ratioX / ratioY);
      layer.frame().setHeight(newHeight);
    }

    var name = layer.name();

    var nameSplit = name.split(' ');

    if (appendRatioToName === true) {
      if (nameSplit[nameSplit.length - 1].match('[1-9]+:[1-9]+')) {
        nameSplit[nameSplit.length - 1] = ratioX + ':' + ratioY;
      } else {
        nameSplit.push(ratioX + ':' + ratioY);
      }
    } else {
      if (nameSplit[nameSplit.length - 1].match('[1-9]+:[1-9]+')) {
        nameSplit[nameSplit.length - 1] = '';
      }
    }

    name = nameSplit.join(' ').trim();

    layer.setName(name);
  });
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelect = createSelect;
exports.createComboBox = createComboBox;
exports.createAlert = createAlert;
exports.createLabel = createLabel;
function createSelect(items, selectedIndex, frame) {
  var select = NSPopUpButton.alloc().initWithFrame_pullsDown(frame, false);
  select.addItemsWithTitles(items);
  select.selectItemAtIndex(selectedIndex);
  return select;
}

function createComboBox(items, selectedIndex, frame, pullsDown) {
  var select = NSComboBox.alloc().initWithFrame(frame);
  select.numberOfVisibleItems = 12;
  select.completes = true;

  select.addItemsWithObjectValues(items);
  select.selectItemAtIndex(selectedIndex);
  return select;
}

function createAlert(context, title, message, iconFilePath) {
  var alert = COSAlertWindow.new();
  alert.setMessageText(title);
  alert.setInformativeText(message);

  if (iconFilePath) {
    // get icon path
    var iconUrl = context.plugin.urlForResourceNamed(iconFilePath);

    // set icon
    var icon = NSImage.alloc().initByReferencingFile(iconUrl.path());
    alert.setIcon(icon);
  }

  return alert;
}

function createLabel(text, frame, fontSize) {
  var label = NSTextField.alloc().initWithFrame(frame);
  label.setStringValue(text);

  label.setFont(NSFont.boldSystemFontOfSize(fontSize));

  label.setBezeled(false);
  label.setDrawsBackground(false);
  label.setEditable(false);
  label.setSelectable(false);

  return label;
}

},{}]},{},[5]);

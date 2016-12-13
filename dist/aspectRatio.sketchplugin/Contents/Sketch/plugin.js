var __globals = this;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAspectRatioManual = exports.setAspectRatioTo16To9 = exports.setAspectRatioTo1To1 = undefined;

var _setAspectRatioTo1To = require('./setAspectRatioTo1To1');

var _setAspectRatioTo1To2 = _interopRequireDefault(_setAspectRatioTo1To);

var _setAspectRatioTo16To = require('./setAspectRatioTo16To9');

var _setAspectRatioTo16To2 = _interopRequireDefault(_setAspectRatioTo16To);

var _setAspectRatioManual = require('./setAspectRatioManual');

var _setAspectRatioManual2 = _interopRequireDefault(_setAspectRatioManual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setAspectRatioTo1To1 = _setAspectRatioTo1To2.default;
exports.setAspectRatioTo16To9 = _setAspectRatioTo16To2.default;
exports.setAspectRatioManual = _setAspectRatioManual2.default;

},{"./setAspectRatioManual":2,"./setAspectRatioTo16To9":3,"./setAspectRatioTo1To1":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAspectRatioManual;

var _setAspectRatioForSelection = require('../utils/setAspectRatioForSelection');

var _sketchUi = require('../utils/sketch-ui');

function setAspectRatioManual(context) {
  var selection = context.selection;

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers');
    return;
  }

  var alert = (0, _sketchUi.createAlert)('Set Aspect Ratio', 'Change the aspect ratio of the selected layers');
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120));

  var ratioValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  var uiSelectRatio1 = (0, _sketchUi.createSelect)(ratioValues, 0, NSMakeRect(0, 98, 100, 22), true);
  var uiSelectRatio2 = (0, _sketchUi.createSelect)(ratioValues, 0, NSMakeRect(150, 98, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('to', NSMakeRect(115, 98, 20, 22), 12, true));
  listView.addSubview(uiSelectRatio1);
  listView.addSubview(uiSelectRatio2);

  var keepValues = ['Width', 'Height'];
  var uiSelectKeep = (0, _sketchUi.createSelect)(keepValues, 0, NSMakeRect(150, 40, 100, 22), true);
  listView.addSubview((0, _sketchUi.createLabel)('Keep', NSMakeRect(0, 40, 80, 22), 12, true));
  listView.addSubview(uiSelectKeep);

  var renameValues = ['Yes', 'No'];
  var uiSelectRename = (0, _sketchUi.createSelect)(renameValues, 0, NSMakeRect(150, 10, 100, 22), true);
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

  var rename = 'true';
  if (renameValueIndex === 1) {
    rename = 'false';
  }

  (0, _setAspectRatioForSelection.setAspectRatioForSelection)(selection, [ratio1, ratio2], keep, rename);
}

},{"../utils/setAspectRatioForSelection":6,"../utils/sketch-ui":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAspectRatioTo16To9;

var _setAspectRatioForSelection = require('../utils/setAspectRatioForSelection');

function setAspectRatioTo16To9(context) {
  // var command = context.command
  var selection = context.selection;

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers');
    return;
  }

  (0, _setAspectRatioForSelection.setAspectRatioForSelection)(selection, [16, 9], 'width', true);
}

},{"../utils/setAspectRatioForSelection":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAspectRatioTo1_1;

var _setAspectRatioForSelection = require('../utils/setAspectRatioForSelection');

function setAspectRatioTo1_1(context) {
  // var command = context.command
  var selection = context.selection;

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers');
    return;
  }

  (0, _setAspectRatioForSelection.setAspectRatioForSelection)(selection, [1, 1], 'width', true);
}

},{"../utils/setAspectRatioForSelection":6}],5:[function(require,module,exports){
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
  bundleName: 'aspectRatio',
  description: '',
  author: 'CL/precious design studio',
  authorEmail: 'christoph.labacher@precious-forever.com',
  version: '0.0.1',
  identifier: 'com.precious-forever.sketch-aspectRatio',
  menu: {
    'isRoot': false,
    'items': [{
      title: 'Set Aspect Ratio to',
      items: ['setAspectRatioTo1To1', 'setAspectRatioTo16To9']
    }, 'setAspectRatioManual']
  },
  commands: {
    setAspectRatioTo1To1: {
      name: '1:1',
      shortcut: '',
      run: commands.setAspectRatioTo1To1
    },
    setAspectRatioTo16To9: {
      name: '16:9',
      shortcut: '',
      run: commands.setAspectRatioTo16To9
    },
    setAspectRatioManual: {
      name: 'Set Aspect Ratio manually',
      shortcut: '',
      run: commands.setAspectRatioManual
    }
  }
};

__globals.___setAspectRatioTo1To1_run_handler_ = function (context, params) {
  HKSketchFusionExtension.commands['setAspectRatioTo1To1'].run(context, params);
};

__globals.___setAspectRatioTo16To9_run_handler_ = function (context, params) {
  HKSketchFusionExtension.commands['setAspectRatioTo16To9'].run(context, params);
};

__globals.___setAspectRatioManual_run_handler_ = function (context, params) {
  HKSketchFusionExtension.commands['setAspectRatioManual'].run(context, params);
};

/*__$begin_of_manifest_
{
    "name": "Aspect Ratio",
    "bundleName": "aspectRatio",
    "description": "",
    "author": "CL/precious design studio",
    "authorEmail": "christoph.labacher@precious-forever.com",
    "version": "0.0.1",
    "identifier": "com.precious-forever.sketch-aspectRatio",
    "menu": {
        "isRoot": false,
        "items": [
            {
                "title": "Set Aspect Ratio to",
                "items": [
                    "setAspectRatioTo1To1",
                    "setAspectRatioTo16To9"
                ]
            },
            "setAspectRatioManual"
        ]
    },
    "commands": [
        {
            "identifier": "setAspectRatioTo1To1",
            "handler": "___setAspectRatioTo1To1_run_handler_",
            "script": "plugin.js",
            "name": "1:1",
            "shortcut": ""
        },
        {
            "identifier": "setAspectRatioTo16To9",
            "handler": "___setAspectRatioTo16To9_run_handler_",
            "script": "plugin.js",
            "name": "16:9",
            "shortcut": ""
        },
        {
            "identifier": "setAspectRatioManual",
            "handler": "___setAspectRatioManual_run_handler_",
            "script": "plugin.js",
            "name": "Set Aspect Ratio manually",
            "shortcut": ""
        }
    ],
    "disableCocoaScriptPreprocessor": true
}__$end_of_manifest_
*/

},{"./commands":1}],6:[function(require,module,exports){
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

    name = nameSplit.join(' ');

    layer.setName(name);
  });
}

},{}],7:[function(require,module,exports){
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

function createAlert(title, message, iconFilePath) {
  var alert = COSAlertWindow.new();
  alert.setMessageText(title);
  alert.setInformativeText(message);

  if (iconFilePath) {
    var icon = NSImage.alloc().initByReferencingFile(iconFilePath);
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

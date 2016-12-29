import { setAspectRatioForSelection } from '../utils/setAspectRatioForSelection'
import { createAlert, createLabel, createSelect } from '../utils/sketch-ui'

import Options, * as OPTIONS from '../utils/options'

export default function setAspectRatioManual (context) {
  let selection = context.selection

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers')
    return
  }

  // Load Options
  let options = Options()

  let ratio1Selection = options[OPTIONS.RATIO_MANUAL_1] - 1 || 0
  let ratio2Selection = options[OPTIONS.RATIO_MANUAL_2] - 1 || 0
  let keepSelection = options[OPTIONS.KEEP_SELECTION] || 0
  let renameSelection = options[OPTIONS.RENAME_SELECTION] || 0

  var alert = createAlert(context, 'Set Aspect Ratio', 'Change the aspect ratio of the selected layers', 'icon.png')
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120))

  var ratioValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
  var uiSelectRatio1 = createSelect(ratioValues, ratio1Selection, NSMakeRect(0, 98, 100, 22), true)
  var uiSelectRatio2 = createSelect(ratioValues, ratio2Selection, NSMakeRect(150, 98, 100, 22), true)
  listView.addSubview(createLabel('to', NSMakeRect(115, 98, 20, 22), 12, true))
  listView.addSubview(uiSelectRatio1)
  listView.addSubview(uiSelectRatio2)

  var keepValues = ['Width', 'Height']
  var uiSelectKeep = createSelect(keepValues, keepSelection, NSMakeRect(150, 40, 100, 22), true)
  listView.addSubview(createLabel('Keep', NSMakeRect(0, 40, 80, 22), 12, true))
  listView.addSubview(uiSelectKeep)

  var renameValues = ['Yes', 'No']
  var uiSelectRename = createSelect(renameValues, renameSelection, NSMakeRect(150, 10, 100, 22), true)
  listView.addSubview(createLabel('Append Ratio to Name', NSMakeRect(0, 10, 140, 22), 12, true))
  listView.addSubview(uiSelectRename)

  alert.addAccessoryView(listView)
  alert.addButtonWithTitle('Change Aspect Ratio')
  alert.addButtonWithTitle('Cancel')

  var responseCode = alert.runModal()
  if (responseCode != '1000') { // eslint-disable-line eqeqeq
    return
  }

  var ratioValue1Index = uiSelectRatio1.indexOfSelectedItem()
  var ratioValue2Index = uiSelectRatio2.indexOfSelectedItem()

  var keepValueIndex = uiSelectKeep.indexOfSelectedItem()
  var renameValueIndex = uiSelectRename.indexOfSelectedItem()

  var ratio1 = ratioValue1Index + 1
  var ratio2 = ratioValue2Index + 1

  var keep = 'width'
  if (keepValueIndex === 1) {
    keep = 'height'
  }

  var rename = true
  if (renameValueIndex === 1) {
    rename = false
  }

  options[OPTIONS.RATIO_MANUAL_1] = ratio1
  options[OPTIONS.RATIO_MANUAL_2] = ratio2
  options[OPTIONS.RATIO_1] = ratio1
  options[OPTIONS.RATIO_2] = ratio2
  options[OPTIONS.KEEP_SELECTION] = uiSelectKeep.indexOfSelectedItem()
  options[OPTIONS.KEEP] = keep
  options[OPTIONS.RENAME_SELECTION] = uiSelectRename.indexOfSelectedItem()
  options[OPTIONS.RENAME] = rename

  // Save Options
  Options(options)

  setAspectRatioForSelection(selection, [ratio1, ratio2], keep, rename)
}

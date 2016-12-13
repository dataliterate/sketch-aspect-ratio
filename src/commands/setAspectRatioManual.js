import { setAspectRatioForSelection } from '../utils/setAspectRatioForSelection'
import { createAlert, createLabel, createSelect } from '../utils/sketch-ui'

export default function setAspectRatioManual (context) {
  let selection = context.selection

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers')
    return
  }

  var alert = createAlert('Set Aspect Ratio', 'Change the aspect ratio of the selected layers')
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120))

  var ratioValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
  var uiSelectRatio1 = createSelect(ratioValues, 0, NSMakeRect(0, 98, 100, 22), true)
  var uiSelectRatio2 = createSelect(ratioValues, 0, NSMakeRect(150, 98, 100, 22), true)
  listView.addSubview(createLabel('to', NSMakeRect(115, 98, 20, 22), 12, true))
  listView.addSubview(uiSelectRatio1)
  listView.addSubview(uiSelectRatio2)

  var keepValues = ['Width', 'Height']
  var uiSelectKeep = createSelect(keepValues, 0, NSMakeRect(150, 40, 100, 22), true)
  listView.addSubview(createLabel('Keep', NSMakeRect(0, 40, 80, 22), 12, true))
  listView.addSubview(uiSelectKeep)

  var renameValues = ['Yes', 'No']
  var uiSelectRename = createSelect(renameValues, 0, NSMakeRect(150, 10, 100, 22), true)
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

  var rename = 'true'
  if (renameValueIndex === 1) {
    rename = 'false'
  }

  setAspectRatioForSelection(selection, [ratio1, ratio2], keep, rename)
}

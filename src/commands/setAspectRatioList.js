import { setAspectRatioForSelection } from '../utils/setAspectRatioForSelection'
import { createAlert, createLabel, createSelect } from '../utils/sketch-ui'
import * as ratios from '../resources/ratios.js'

export default function setAspectRatioList (context) {
  let selection = context.selection

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers')
    return
  }

  var alert = createAlert('Set Aspect Ratio', 'Change the aspect ratio of the selected layers')
  var listView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 120))

  var ratioValues = []

  ratios.ratios.forEach(function (ratio) {
    ratioValues.push(ratio.x + ':' + ratio.y)
  })

  var uiSelectRatio = createSelect(ratioValues, 0, NSMakeRect(0, 98, 250, 22), true)
  listView.addSubview(uiSelectRatio)

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

  var ratioValueIndex = uiSelectRatio.indexOfSelectedItem()

  var keepValueIndex = uiSelectKeep.indexOfSelectedItem()
  var renameValueIndex = uiSelectRename.indexOfSelectedItem()

  var ratio1 = ratios.ratios[ratioValueIndex].x
  var ratio2 = ratios.ratios[ratioValueIndex].y

  var keep = 'width'
  if (keepValueIndex === 1) {
    keep = 'height'
  }

  var rename = true
  if (renameValueIndex === 1) {
    rename = false
  }

  setAspectRatioForSelection(selection, [ratio1, ratio2], keep, rename)
}

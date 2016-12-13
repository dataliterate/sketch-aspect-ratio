import { setAspectRatioForSelection } from '../utils/setAspectRatioForSelection'

export default function setAspectRatioTo1_1 (context) {
  // var command = context.command
  let selection = context.selection

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers')
    return
  }

  setAspectRatioForSelection(selection, [1, 1], 'width', true)
}

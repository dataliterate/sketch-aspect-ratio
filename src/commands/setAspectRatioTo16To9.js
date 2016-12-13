import { setAspectRatioForSelection } from '../utils/setAspectRatioForSelection'

export default function setAspectRatioTo16To9 (context) {
  // var command = context.command
  let selection = context.selection

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers')
    return
  }

  setAspectRatioForSelection(selection, [16, 9], 'width', true)
}

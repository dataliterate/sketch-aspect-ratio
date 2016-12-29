import { setAspectRatioForSelection } from '../utils/setAspectRatioForSelection'
import Options, * as OPTIONS from '../utils/options'

export default function setAspectRatioRepeat (context) {
  let selection = context.selection

  if (!selection.firstObject()) {
    context.document.showMessage('Please select one or more layers')
    return
  }

  // Load Options
  let options = Options()

  let ratio1 = options[OPTIONS.RATIO_1] || 1
  let ratio2 = options[OPTIONS.RATIO_2] || 1
  let keep = options[OPTIONS.KEEP] || 'width'
  let rename = options[OPTIONS.RENAME] || false

  if (rename == 1) { rename = true} else if (rename == 0) { rename = false }

  log(rename)

  setAspectRatioForSelection(selection, [ratio1, ratio2], keep, rename)
}

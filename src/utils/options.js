/**
 * Options library
 *
 * Provides functionality to get and set user options shared across the plugin.
 */


export const RATIO_1 = 'ratio1'
export const RATIO_2 = 'ratio2'

export const RATIO_SELECTION = 'ratioSelection'

export const RATIO_MANUAL_1 = 'ratioManual1'
export const RATIO_MANUAL_2 = 'ratioManual2'

export const KEEP_SELECTION = 'keepSelection'
export const KEEP = 'keep'

export const RENAME_SELECTION = 'renameSelection'
export const RENAME = 'rename'

let OPTIONS = [
  RATIO_SELECTION, RATIO_1, RATIO_2, RATIO_MANUAL_1, RATIO_MANUAL_2, KEEP_SELECTION, KEEP, RENAME_SELECTION, RENAME
]


/**
 * Gets or sets the stored options in user defaults.
 *
 * @returns {Object}
 */
export default function(newOptions) {

  //set new options
  if(newOptions) {
    OPTIONS.forEach((key) => {

      //save into user defaults
      if(newOptions.hasOwnProperty(key)) {
        NSUserDefaults.standardUserDefaults().setObject_forKey(newOptions[key], 'SketchAspectRatio_' + key)
      }
    })

    //sync defaults
    NSUserDefaults.standardUserDefaults().synchronize()
  }

  //get options
  let options = {}
  OPTIONS.map((key) => {

    //get options from user defaults
    let option = NSUserDefaults.standardUserDefaults().objectForKey('SketchAspectRatio_' + key)

    //convert to correct type and set
    if(option) {
      options[key] = parsePrimitives(String(option))
    }
  })

  return options
}

function parsePrimitives(value) {

    if (value == '') {
      return value
    } else if (value == 'true') {
      value = true
    } else if (value == 'false') {
      value = false
    } else if (value == 'null') {
      value = null
    } else if (value == 'undefined') {
      value = undefined
    } else if (!isNaN(value) && value != '') {
      value = parseFloat(value)
    }

    return value
}

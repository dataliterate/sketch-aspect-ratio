import * as commands from './commands'

export const HKSketchFusionExtension = {
  name: 'Aspect Ratio',
  bundleName: 'aspectRatio',
  description: '',
  author: 'CL/precious design studio',
  authorEmail: 'christoph.labacher@precious-forever.com',
  version: '0.0.5',
  identifier: 'com.precious-forever.sketch-aspectRatio',
  menu: {
    'isRoot': false,
    'items': [
      'setAspectRatioList',
      'setAspectRatioManual',
      'setAspectRatioRepeat'
    ]
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
}

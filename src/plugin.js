import * as commands from './commands'

export const HKSketchFusionExtension = {
  name: 'Aspect Ratio',
  bundleName: 'Sketch Aspect Ratio',
  description: 'Set preset or custom aspect ratios for a selected layer.',
  author: 'CL/precious design studio',
  authorEmail: 'christoph.labacher@precious-forever.com',
  version: '1.0.1',
  identifier: 'com.precious-forever.sketch-aspect-ratio',
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

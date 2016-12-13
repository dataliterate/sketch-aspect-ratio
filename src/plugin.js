import * as commands from './commands'

export const HKSketchFusionExtension = {
  name: 'Aspect Ratio',
  bundleName: 'aspectRatio',
  description: '',
  author: 'CL/precious design studio',
  authorEmail: 'christoph.labacher@precious-forever.com',
  version: '0.0.1',
  identifier: 'com.precious-forever.sketch-aspectRatio',
  menu: {
    'isRoot': false,
    'items': [
      'setAspectRatioList',
      {
        title: 'Set Aspect Ratio to',
        items: [
          'setAspectRatioTo1To1',
          'setAspectRatioTo16To9'
        ]
      },
      'setAspectRatioManual'
    ]
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
    },
    setAspectRatioList: {
      name: 'Set Aspect Ratio',
      shortcut: '',
      run: commands.setAspectRatioList
    }
  }
}

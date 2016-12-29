export function setAspectRatioForSelection (selection, ratio, keep, appendRatioToName) {
  selection.forEach(function (layer) {
    let frame = layer.frame()
    let width = frame.width()
    let height = frame.height()

    let ratioX = 1
    let ratioY = 1

    if (ratio) {
      ratioX = ratio[0]
      ratioY = ratio[1]
    }

    if (keep === 'height') {
      let newWidth = height * (ratioX / ratioY)
      layer.frame().setWidth(newWidth)
    } else {
      let newHeight = width / (ratioX / ratioY)
      layer.frame().setHeight(newHeight)
    }

    let name = layer.name()

    let nameSplit = name.split(' ')

    if (appendRatioToName === true) {
      if (nameSplit[nameSplit.length - 1].match('[1-9]+:[1-9]+')) {
        nameSplit[nameSplit.length - 1] = ratioX + ':' + ratioY
      } else {
        nameSplit.push(ratioX + ':' + ratioY)
      }
    } else {
      if (nameSplit[nameSplit.length - 1].match('[1-9]+:[1-9]+')) {
        nameSplit[nameSplit.length - 1] = ''
      }
    }

    name = nameSplit.join(' ').trim()

    layer.setName(name)
  })
}

export const fixAlignImage = (blocks: string) => {
  const classStyles: any = {
    '__se__float-center': 'display:flex;justify-content:center',
    '__se__float-right': 'display:flex;justify-content:flex-end',
    '__se__float-left': 'display:flex;justify-content:flex-start',
  }

  var regex = new RegExp(
    '(class=["\'].*?\\b(' + Object.keys(classStyles).join('|') + ')\\b.*?["\'])',
    'gi',
  )
  let modifiedHtml = blocks.replace(regex, function (_match, group1, group2) {
    let addedStyle = classStyles[group2]
    return group1 + ' style="' + addedStyle + '"'
  })
  return modifiedHtml
}

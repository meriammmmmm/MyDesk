import { getDirections } from './getDirections'

export const generatePopupAsJson = (htmlArray: string[]) => {
  let components: any = []
  const textDirections = getDirections()
  let i = 0
  htmlArray.map((el) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(el, 'text/html')
    if (el?.includes('btn-234-custom')) {
      const buttonObject = generateJsonButton(doc)
      components.push(buttonObject)
    } else if (el?.includes('</iframe>')) {
      const videoObject = generateJsonVideo(doc)
      components.push(videoObject)
    } else if (el?.includes('<img')) {
      const ImgObject = generateJsonImg(doc)
      components.push(ImgObject)
    } else if (el !== '') {
      const content = convertHtmlToObjectArrayWithStyleHistory(el, textDirections[i])
      components.push({ type: 'text', value: content, direction: textDirections[i] })
      i = i + 1
    }
  })
  return components
}
export const generateInteraction = (emoji: string[], replaytype: string) => {
  const emojiAndInteraction: any = {}
  if (replaytype === 'text') {
    emojiAndInteraction['interaction'] = 'comment'
  } else if (replaytype === 'reaction') {
    emojiAndInteraction['interaction'] = 'reaction'
    emojiAndInteraction['emojiList'] = emoji
  } else {
    emojiAndInteraction['interaction'] = 'none'
  }
  return emojiAndInteraction
}
const generateJsonButton = (doc: Document) => {
  const divElement: any = doc.querySelector('.custom-button')
  const aElement: HTMLAnchorElement | null | undefined = divElement?.querySelector('a')
  const align = divElement?.style?.textAlign
  const value = aElement?.textContent?.trim()
  const backgroundColor = rgbToHex(aElement?.style?.backgroundColor)
  const color = rgbToHex(aElement?.style?.color)
  const fontSize = aElement?.style?.fontSize && parseInt(aElement?.style?.fontSize)
  const paddingY = aElement?.style?.padding && parseInt(aElement?.style?.padding.split(' ')[0])
  const paddingX = aElement?.style?.padding && parseInt(aElement?.style?.padding.split(' ')[1])
  const borderRaduis = aElement?.style?.borderRadius && parseInt(aElement?.style?.borderRadius)
  const url = aElement?.getAttribute('href')
  return {
    type: 'button',
    url,
    color,
    align,
    value,
    backgroundColor,
    fontSize,
    paddingX,
    paddingY,
    borderRaduis,
  }
}
const generateJsonVideo = (doc: Document) => {
  const iframeElement: HTMLIFrameElement | null = doc.querySelector('iframe')
  const url = iframeElement?.getAttribute('src')
  return { type: 'video', value: url }
}
const generateJsonImg = (doc: Document) => {
  const imgElement: HTMLImageElement | null = doc.querySelector('img')
  const base64 = imgElement?.getAttribute('src')
  return { type: 'image', value: base64 }
}

const rgbToHex = (rgb: string | undefined) => {
  const rgbValues: any = rgb?.match(/\d+/g)
  let hexValues = rgbValues.map((value: any) => {
    const hex = parseInt(value).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  })
  const hexColor = '#' + hexValues.join('')

  return hexColor
}

function convertHtmlToObjectArrayWithStyleHistory(html: string, direction: string) {
  let tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  let result: any = []
  let styleState: any = { ...tempDiv.style }
  let styleHistory: any = []
  function updateStyleState(style: any) {
    Object.assign(styleState, style)
  }
  function applyStyle(node: any) {
    let style = node.style
    for (let property in style) {
      if (Object.hasOwnProperty.call(style, property) && style[property] !== '') {
        updateStyleState({ [property]: style[property] })
      }
    }
    updateStyleState({
      bold: node.nodeName.toLowerCase() === 'strong',
      italique: node.nodeName.toLowerCase() === 'em',
    })
  }
  function removeStyleHistory(level: any) {
    styleHistory = styleHistory.filter((entry: any) => entry.level <= level)
  }

  function traverse(node: any, level: any) {
    if (node.nodeType === 3) {
      const content = node.textContent
      if (content !== '') {
        result.push({
          content: content,
          style: {
            ...(!styleState?.backgroundColor
              ? {}
              : { backgroundColor: rgbToHex(styleState?.backgroundColor) }),
            ...(!styleState?.color ? {} : { color: rgbToHex(styleState?.color) }),
            ...(!styleState?.bold ? {} : { bold: styleState?.bold }),
            ...(!styleState?.textAlign
              ? { textAlign: `${direction === 'rtl' ? 'right' : 'left'}` }
              : { textAlign: styleState?.textAlign }),
            ...(!styleState?.italique ? {} : { italique: styleState?.italique }),
            ...(!styleState?.fontSize
              ? { fontSize: 16 }
              : { fontSize: parseInt(styleState?.fontSize) }),
            ...(!styleState?.fontFamily
              ? { fontFamily: 'Poppins' }
              : { fontFamily: styleState?.fontFamily }),
          },
        })
        styleState = {}
        // styleHistory = []
      }
    } else if (node.nodeType === 1) {
      if (node.nodeName.toLowerCase() === 'div') {
        result.push({ content: '$br' })
      }
      applyStyle(node)
      styleHistory[level] = { ...styleState }
      removeStyleHistory(level)
      node.childNodes.forEach(function (childNode: any) {
        traverse(childNode, level + 1)
      })
    }
  }

  traverse(tempDiv, 0)
  return result.splice(2)
}

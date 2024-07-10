import { generatePopupAsJson } from '@src/utils/generatePopupAsJson'

const renderImage = (item: any, index: number) => (
  <img src={item.value} alt={`Image`} style={{ width: '100%', ...item.style }} key={index} />
)

const renderVideo = (item: any, index: number) => (
  <iframe
    src={item.value}
    style={{ width: '100%', ...item.style, userSelect: 'none', pointerEvents: 'none' }}
    key={index}
  />
)

const renderButton = (item: any, index: number) => {
  const {
    type,
    value,
    url,
    paddingX,
    paddingY,
    fontSize,
    borderRaduis,
    backgroundColor,
    color,
    align,
    ...data
  } = item

  return (
    <span key={index} style={{ display: 'flex', justifyContent: align }}>
      <a
        href={url}
        style={{
          height: 'fit-content',
          padding: `${paddingY}px ${paddingX}px`,
          fontSize: fontSize,
          borderRadius: borderRaduis,
          background: backgroundColor,
          color: color,
          ...data,
        }}
        target="_blank"
      >
        {value}
      </a>
    </span>
  )
}

const renderText = (item: any, index: number) => {
  let alignIndex: any = item?.value?.[0]?.style.textAlign
  let htmlContent = `<div style=text-align:${alignIndex}>`
  item?.value?.forEach((el: any, innerIndex: number) => {
    if (el.content === '$br') {
      htmlContent += `&nbsp;</div><div ${
        item?.value?.[innerIndex + 1] && item?.value?.[innerIndex + 1]?.style
          ? `style=text-align:${item?.value?.[innerIndex + 1]?.style.textAlign}`
          : ''
      }>`
    } else {
      htmlContent += `<span style=color:${el?.style?.color};background-color:${el?.style
        ?.backgroundColor};font-size:${el?.style?.fontSize}px;font-family:${el?.style
        ?.fontFamily};font-style:${el?.style?.italique ? 'italic' : 'normal'};font-weight:${
        el?.style?.bold ? 'bold' : 'normal'
      };>${el.content}</span>`
    }
  })
  const containerKey = `container-${index}`
  return (
    <div
      style={item?.direction && { direction: `${item?.direction}` }}
      key={containerKey}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

const DynamicPreview = ({ content }: any) => {
  const jsonMobilePreview = generatePopupAsJson(content)
  const renderContent = () => {
    return jsonMobilePreview.map((item: any, index: number) => {
      switch (item.type) {
        case 'image':
          return renderImage(item, index)
        case 'video':
          return renderVideo(item, index)
        case 'button':
          return renderButton(item, index)
        case 'text':
          return renderText(item, index)
        default:
          return null
      }
    })
  }

  return <>{renderContent()}</>
}

export default DynamicPreview

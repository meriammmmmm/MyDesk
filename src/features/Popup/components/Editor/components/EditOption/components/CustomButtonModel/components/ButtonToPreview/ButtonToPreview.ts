export const generateButtonToPreview = (
  label: string,
  paddingX: number,
  paddingY: number,
  borderRadius: number,
  alignment: string,
  color: string,
  backgroundColor: string,
  link: string,
  size: number,
): string => {
  const buttonStyle = `
    display: inline-block;
    padding: ${paddingY}px ${paddingX}px;
    border-radius: ${borderRadius}px;
    color: ${color};
    background-color: ${backgroundColor};
    margin-top: '20px';
    font-size:${size}px;
    text-decoration:none;
  `

  const htmlString = `
    <div  class="custom-button btn-234-custom"  style="pointer-events:none; text-align: ${alignment};height:fit-content">
      <a  href='${link}' target="_blank" style="${buttonStyle}">
        ${label}
      </a>
    </div>
  `

  return htmlString
}

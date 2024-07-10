export const generateVideoToPreview = (link: string, alignment: string, width: string) => {
  return `
    <div class='custom-button' style='display:flex; justify-content: ${alignment}; width: 100%;'>
    <div class='popup-iframe-parent' style='width: ${width}'>
    <iframe style='width: 100% !important;height:220px !important' src='${link}' allowfullscreen></iframe>
    </div>
    </div>
  `
}

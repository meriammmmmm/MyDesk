import { calculatePopupPosition } from './generatePopupPosition'
import { sendIcon, messageIcon } from './base64Image'
import { generatePopupStyle } from './popupStyle'

export const generatePopupHTML = (
  blocks: string[],
  parameters: any,
  emoji: string[],
  popupTime: any,
  titleOfPopup: string,
  status: any,
  popupWidth: any,
  isPreview: boolean,
) => {
  const position = calculatePopupPosition(parameters)
  const senderHTML = generateSenderHTML(titleOfPopup, status)
  const popupStyle = generatePopupStyle(position, popupWidth)
  let responseHTML
  if (parameters['replaytype'] === 'text') {
    responseHTML = isPreview ? generateRespnoseInputHTMLPreview() : generateRespnoseInputHTML()
  } else if (parameters['replaytype'] === 'reaction') {
    responseHTML = generateRespnoseEmojiHTML(emoji)
  }
  const swiperNavigation =
    blocks?.length > 1
      ? `<button class="taki-popups-prev-btn"><</button>
        <button class="taki-popups-next-btn">></button>`
      : `<p></p>`
  const swiperNavigationPoint =
    blocks?.length > 1
      ? `
    <div class="swiper-points-navigation-container">
    ${blocks
      .map(
        (_, index) => `<span key=${index} id=${index} class="taki-popups-navigation-point"></span>`,
      )
      .join('')}
    </div>
    `
      : `<p></p>`
  return `
    ${popupStyle}
    <div class='popup-taki'>
    <div
      popupTime=${popupTime}
      class="animated-div"
    >
      ${senderHTML}
      <div class="parent-blocks-default-style swiper-container">
        <div class="swiper-wrapper">
          ${blocks
            .map((block, index) => `<div key=${index} class="swiper-slide">${block}</div>`)
            .join('')}
        </div>
        ${swiperNavigation}
        </div>
        </div>
        ${swiperNavigationPoint}
    ${responseHTML ? responseHTML : ''}
  </div>
  <div class="overlay-popups"></div>
  `
}
const generateRespnoseInputHTML = () => {
  return `

  <form class='taki-popups-reply popup-comment-form' style="
      padding:0px 35px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap:20px;
      height: 60px;
      background-color: #ecf0f3;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-top: 20px;
    ">
    <div style="display:flex; align-items:center; width:100%;">
    <img style="
    width:25px;
    height:25px;"
    src=data:image/png;base64,${messageIcon} alt="dfqsdfqd" />
    <input class='comment-input' style="
    background-color: #ecf0f3;
    height: 50%;
    border:none;
    outline: none;
    width: 100%;
    font-size: 15px;
    padding-left:10px;
    " type='text' placeholder="Write a reply ...">
    </div>
    <button type='submit' style="dispaly:flex;border:none;background:none;">
    <img class="custom-btn btn-send-comment"  src=data:image/png;base64,${sendIcon} />
    </button>
  </form>
`
}
const generateRespnoseInputHTMLPreview = () => {
  return `
  <div class='taki-popups-reply popup-comment-form' style="
      padding:0px 35px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap:20px;
      height: 60px;
      background-color: #ecf0f3;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-top: 20px;
    ">
    <div style="display:flex; align-items:center; width:100%;">
    <img style="
    width:25px;
    height:25px;"
    src=data:image/png;base64,${messageIcon} alt="dfqsdfqd" />
    <input class='comment-input' style="
    background-color: #ecf0f3;
    height: 50%;
    border:none;
    outline: none;
    width: 100%;
    font-size: 15px;
    padding-left:10px;
    " type='text' placeholder="Write a reply ...">
    </div>
    <img class="custom-btn btn-send-comment"  src=data:image/png;base64,${sendIcon} />
  </div>
`
}
const generateSenderHTML = (titleOfPopup: string, status: any) => {
  return `
  <div style="
    display:flex;
    align-items: start;
    justify-content:space-between;
    gap:15px;
    padding: 12px 25px;
    font-family: Arial;
  ">
  <p style="
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin:0px !important;
  font-weight: 500;
  color: rgba(9, 11, 23, 0.83);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  word-break: break-word;
  ">${status === 'private' ? '' : titleOfPopup}</p>
    <button class='close-btn' >
    X
    </button>
  </div>
  `
}
const generateRespnoseEmojiHTML = (emoji: string[]) => {
  return `
  <style>
  .emoji-btn{
    font-size: 30px;
    min-width: 40px;
    cursor: pointer;
    border: none;
    outline:none;
    height: 42px;
    background-color:transparent;
    transition: transform 0.2s ease-in-out, margin-left 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
    .emoji-btn:hover {
      transform: scale(1.3) ; 
    }
  </style>
  <div class="taki-popups-reply" style="
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #ecf0f3;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: 20px;
  ">
    <div style="
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    ">
      ${emoji
        .map(
          (el: string) => `<button class='emoji-btn' 
      ">${el}</button>`,
        )
        .join('')}
    </div>
  </div>
  `
}

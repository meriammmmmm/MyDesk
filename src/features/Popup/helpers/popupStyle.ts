export const generatePopupStyle = (position: any, popupWidth: any) => {
  return `<style>
  .close-btn {
    border: none;
    outline: none;
    background: #fff;
    padding: 5px 9px;
    font-size: 19px;
    cursor: pointer;
    font-weight: 500;
  }
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(${position['animatfirst']});
    }
    100% {
      transform: translateX(${position['animateLast']});
    }
  }
  .popup-taki {
    animation: slideInFromLeft 0.8s ease-out;
  }
  .popup-taki {
    z-index: 999999;
    position: fixed;
    top: ${position['top']};
    right: ${position['right']};
    left: ${position['left']};
    bottom: ${position['bottom']};
    transform: translate${position['TransformTranslate']};
    display: flex;
    max-width: ${popupWidth};
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    width: 90%;
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    font-family: Arial;
  }
  
  .parent-blocks-default-style {
    max-height: 500px;
    overflow-y: auto;
    word-wrap: break-word;
    overflow-x:hidden;
  }
  
  .swiper-container {
    display: flex;
    transition: transform 0.3s ease-in-out;
  }
  
  .swiper-slide {
    box-sizing: border-box;
    padding: 0 40px 20px;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
    display: block;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
    box-sizing: content-box;
  }
  .taki-popups-prev-btn{
    font-family: "Poppins", sans-serif;
    transform: translate(0, -50%);
    position: absolute;
    top: 50%;
    left: 5px;
        font-size: 29px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    height: 31px;
    width: 31px;
    z-index: 55;
    cursor: pointer;
    border:none;
  }
  .taki-popups-next-btn{
    font-family: "Poppins", sans-serif;
    transform: translate(0, -50%);
    position: absolute;
    top: 50%;
    right: 5px;
    font-size: 29px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    height: 31px;
    width: 31px;
    z-index: 55;
    cursor: pointer;
    border:none;

  }
  
  .overlay-popups {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.623);
  }
  .custom-btn {
    outline: none;
    font-size: 15px;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 9px;
    color: #000;
    transition: background-color 0.3s, transform 0.2s;
  }
   .swiper-points-navigation-container{
    display:flex;
    align-items: center;
    justify-content: center;
      gap: 8px;


    z-index: 55;
  }
  .taki-popups-navigation-point{
    cursor: pointer;
    border: 1px solid #331;
    border-radius: 50%;
    width: 11px;
    height: 11px;
  }
  .custom-btn:hover {
    transform: scale(1.05);
  }
  </style>`
}

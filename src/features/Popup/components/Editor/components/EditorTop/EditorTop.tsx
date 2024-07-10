import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { TbReload } from 'react-icons/tb'
const EditorTop = () => {
  return (
    <div className="editor-top-container">
      <div className="circle-container">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="back-forward-refrech-container">
        <HiArrowLeft />
        <HiArrowRight />
        <TbReload className="refresh-icon" />
      </div>
      <div className="input-user-icon-container">
        <div className="search-input"></div>
        <div className="user-browser-icon"></div>
      </div>
    </div>
  )
}

export default EditorTop

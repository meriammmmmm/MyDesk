import { BsImage } from 'react-icons/bs'

const LoadingComponent = ({ isReverse }: any) => {
  const numParagraphs = 5
  const loadingParagraphs = Array.from({ length: numParagraphs }, (_, index) => (
    <div key={index} className="paragraph-loading"></div>
  ))

  return (
    <div className="first-layout" style={{ flexDirection: `${isReverse ? 'row-reverse' : 'row'}` }}>
      <div className="image-loading">
        <BsImage />
      </div>
      <div className="paragraph">
        {loadingParagraphs}
        <div className="paragraph-loading final"></div>
      </div>
    </div>
  )
}

export default LoadingComponent

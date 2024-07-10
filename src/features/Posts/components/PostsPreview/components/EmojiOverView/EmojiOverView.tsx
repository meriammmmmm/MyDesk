export const EmojiOverView = ({ emojis }: { emojis: string[] }) => {
  return (
    <div className="emoji-response-container">
      <div className="emoji-buttons-container">
        {emojis?.map((el: string, i: number) => {
          return (
            <button style={{ fontSize: '30px', minWidth: '40px' }} key={i}>
              {el}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EmojiOverView

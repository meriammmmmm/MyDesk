import { useState } from 'react'

const SlectImageGroupe = ({ label, options, value, setValue }: any) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOptions = options.filter((option: any) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleImageClick = (option: any) => {
    if (value.includes(option.value)) {
      setValue(value.filter((v: any) => v !== option.value))
    } else {
      setValue([...value, option.value])
    }
  }

  return (
    <div className="select-comp">
      <label>{label}</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="select-options">
        {filteredOptions.map((option: any) => (
          <div
            key={option.value}
            className={`select-option ${value.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleImageClick(option)}
          >
            <img src={option.image} alt={option.label} className="option-image" />
            {value.includes(option.value) && (
              <div className="tick-mark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  width="24px"
                  height="24px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16.2l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.1 2.1 4.6-4.6a1 1 0 0 1 1.4 1.4l-5.2 5.2a1 1 0 0 1-1.4 0z" />
                </svg>
              </div>
            )}
            <label style={{ textAlign: 'center' }}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlectImageGroupe

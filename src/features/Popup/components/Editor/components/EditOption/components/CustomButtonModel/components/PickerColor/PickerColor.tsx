interface ColorPickerProps {
  onChange?: (value: string) => void
  value: string
  label: string
}

const PickerColor = ({ label, value, onChange }: ColorPickerProps) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <div className="picker-color-container">
      <span className="picker-color-label">{label}</span>
      <input type="color" value={value} onChange={handleColorChange} />
    </div>
  )
}

export default PickerColor

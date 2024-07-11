import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

interface SliderComponentProps {
  icon: string
  title: string
  value: number
  onChange: (event: Event, newValue: number | number[]) => void
  marks: { value: number; label: string }[]
  min: number
  max: number
  disabled: boolean
}

const SliderComponent: FC<SliderComponentProps> = ({
  icon,
  title,
  value,
  onChange,
  marks,
  min,
  max,
  disabled,
}) => (
  <div className="personal-slider-container">
    <div className="personal-slider">
      <div className="title">
        <img src={icon} alt="" />
        <p>{title}</p>
      </div>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label={title}
          defaultValue={value}
          step={marks[1].value - marks[0].value}
          marks={marks}
          valueLabelDisplay="on"
          min={min}
          max={max}
          disabled={disabled}
          onChange={onChange}
        />
      </Box>
    </div>
    <p className="personal-configuartion">
      {value} {title.split(' ')[0]}
    </p>
  </div>
)

export default SliderComponent

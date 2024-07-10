import { useAppDispatch, useAppSelector } from '@src/store'
import { ReactComponent as Sun } from './Light.svg'
import { ReactComponent as Moon } from './Moon.svg'
import { useState } from 'react'

const ThemeButton = () => {
  const dispatch = useAppDispatch()

  const switchTheme = () => {}

  return (
    <div className="dark_mode">
      <input className="dark_mode_input" type="checkbox" id="darkmode-toggle" />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  )
}

export default ThemeButton

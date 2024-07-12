import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BusinessIcon from '@mui/icons-material/Business'
import SecurityIcon from '@mui/icons-material/Security'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#0188F7',
  },
  completed: {
    color: '#0188F7',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
})

type IconType = 'profile' | 'organization' | 'security'

const icons: Record<IconType, React.ComponentType> = {
  profile: AccountCircleIcon,
  organization: BusinessIcon,
  security: SecurityIcon,
}

interface QontoStepIconProps {
  active: boolean
  completed: boolean
  icon: IconType
}

function QontoStepIcon(props: QontoStepIconProps) {
  const classes = useQontoStepIconStyles()
  const { active, completed, icon } = props
  const IconComponent = icons[icon]

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <IconComponent />
    </div>
  )
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  icon: PropTypes.oneOf<IconType>(['profile', 'organization', 'security']).isRequired,
}

export default QontoStepIcon
